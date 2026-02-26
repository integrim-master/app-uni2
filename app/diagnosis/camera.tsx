import { BackButton } from "@/src/components/shared/BackButton";
import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeContext";
import { useUser } from "@/src/modules/banner/hooks/userHome";
import SendPhoto from "@/src/modules/diagnostics/components/loadingPhoto";
import {
  useCreateDiagnostic,
  useUploadDiagnosticImage,
} from "@/src/modules/diagnostics/hooks/useDiagnostic";
import { useSetDiagnosticSession } from "@/src/modules/diagnostics/hooks/useDiagnosticSession";
import ErrorScreen from "@/src/modules/diagnostics/screens/ErrorScreen";
import { useAnalyzeImage } from "@/src/n8n/hooks/useAnalizeImage";
import { MaterialIcons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import * as ImageManipulator from "expo-image-manipulator";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import {
  Camera,
  runAsync,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from "react-native-vision-camera";
import {
  Face,
  useFaceDetector,
} from "react-native-vision-camera-face-detector";
import { Worklets } from "react-native-worklets-core";

export default function CameraScreen() {
  const { colors } = useTheme();
  const { token } = useAuth();
  const { data: userInfo } = useUser();
  const userId = userInfo?.user_id;
  const queryClient = useQueryClient();
  const setDiagnosticSession = useSetDiagnosticSession();

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  const CAMERA_WIDTH = SCREEN_WIDTH * 0.92;
  const CAMERA_HEIGHT = SCREEN_HEIGHT * 0.58;
  const OVAL_WIDTH = CAMERA_WIDTH * 0.62;
  const OVAL_HEIGHT = CAMERA_HEIGHT * 0.65;

  const cameraRef = useRef<Camera>(null);
  const [facing, setFacing] = useState<"front" | "back">("front");
  const [capturing, setCapturing] = useState(false);
  const [status, setStatus] = useState<"none" | "far" | "uncentered" | "ok">(
    "none",
  );
  const isFaceAligned = status === "ok";

  const [photoUri, setPhotoUri] = useState<{ uri: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationError, setValidationError] = useState<{
    message: string;
    reason?: string;
  } | null>(null);

  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice(facing);
  const { detectFaces, stopListeners } = useFaceDetector({
    performanceMode: "fast",
  });

  const { mutateAsync: uploadImage, reset: resetUpload } =
    useUploadDiagnosticImage();
  const { mutateAsync: analyzeImage, isPending: isAnalyzing } =
    useAnalyzeImage();
  const { mutateAsync: createDiagnostic } = useCreateDiagnostic();

  useEffect(() => {
    return () => stopListeners();
  }, []);

  const handleDetectedFaces = Worklets.createRunOnJS(
    (faces: Face[], fWidth: number, fHeight: number) => {
      if (faces.length === 0) {
        if (status !== "none") setStatus("none");
        return;
      }
      const { bounds } = faces[0];
      const sX = CAMERA_WIDTH / fHeight;
      const sY = CAMERA_HEIGHT / fWidth;
      const fCX = (bounds.x + bounds.width / 2) * sX;
      const fCY = (bounds.y + bounds.height / 2) * sY;

      const isCentered =
        Math.sqrt(
          Math.pow(fCX - CAMERA_WIDTH / 2, 2) +
            Math.pow(fCY - CAMERA_HEIGHT / 2, 2),
        ) < 60;
      const isCloseEnough = bounds.width * sX > OVAL_WIDTH * 0.8;

      let newStatus: typeof status = isCentered
        ? isCloseEnough
          ? "ok"
          : "far"
        : "uncentered";
      if (status !== newStatus) setStatus(newStatus);
    },
  );

  const frameProcessor = useFrameProcessor(
    (frame) => {
      "worklet";
      runAsync(frame, () => {
        "worklet";
        const faces = detectFaces(frame);
        handleDetectedFaces(faces, frame.width, frame.height);
      });
    },
    [handleDetectedFaces],
  );

  const takePicture = async () => {
    if (capturing || !cameraRef.current || !isFaceAligned) return;
    try {
      setCapturing(true);
      const photo = await cameraRef.current.takePhoto({ flash: "off" });
      const scale = photo.height / CAMERA_HEIGHT;
      const cropped = await ImageManipulator.manipulateAsync(
        `file://${photo.path}`,
        [
          {
            crop: {
              originX: (photo.width - OVAL_WIDTH * scale) / 2,
              originY: (photo.height - OVAL_HEIGHT * scale) / 2,
              width: OVAL_WIDTH * scale,
              height: OVAL_HEIGHT * scale,
            },
          },
        ],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG },
      );
      setPhotoUri({ uri: cropped.uri });
    } catch (e) {
      console.error(e);
    } finally {
      setCapturing(false);
    }
  };

  const handleSendPhoto = async () => {
    if (!photoUri || !userId) return;
    setIsProcessing(true);
    try {
      const res = await analyzeImage(photoUri as any);
      const data = Array.isArray(res) ? res[0] : res;
      if (data.valido === false || data.valido === "false") {
        setValidationError({ message: data.error, reason: data.motivo });
        return;
      }
      const upload = await uploadImage({
        photo: photoUri as any,
        userId: String(userId),
        token,
      });
      await createDiagnostic({
        diagnostico: data.diagnostico,
        procedimientos: data.procedimientos || [],
        imageId: upload.id,
        userId: String(userId),
      });
      try {
        const session = {
          analysis: {
            diagnostico: data.diagnostico,
            procedimientos: data.procedimientos || [],
          },
          photoUri: photoUri,
          mediaId: upload.id,
        } as any;
        setDiagnosticSession(session);
      } catch (e) {
        console.warn("setDiagnosticSession failed", e);
      }
      queryClient.invalidateQueries({
        queryKey: ["last-diagnostic", String(userId)],
      });
      router.back();
    } catch (error: any) {
      setValidationError({ message: error.message || "Error de red" });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!hasPermission)
    return (
      <Screen
        safeArea
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <View className="h-full flex justify-center w-full p-2">
          <PrimaryButton title="Permitir Cámara" onPress={requestPermission} />
        </View>
        {/* <Pressable
          onPress={requestPermission}
          style={[
            styles.primaryBtn,
            { backgroundColor: colors.primary, paddingHorizontal: 20 },
          ]}
        >
          <Text style={{ color: colors.background }}>Permitir Cámara</Text>
        </Pressable> */}
      </Screen>
    );

  if (isAnalyzing || isProcessing) return <SendPhoto />;

  if (validationError)
    return (
      <ErrorScreen
        photoUri={photoUri?.uri}
        message={validationError.message}
        onRetry={() => {
          setValidationError(null);
          setPhotoUri(null);
          resetUpload();
        }}
      />
    );

  return (
    <Screen
      safeArea
      leftButton={<BackButton />}
      style={{ backgroundColor: colors.background }}
    >
      <View style={styles.header}>
        <ThemedText
          type="title"
          color={isFaceAligned ? colors.success : colors.primaryLight}
        >
          {photoUri
            ? "Revisa tu foto"
            : status === "far"
              ? "Acércate más"
              : status === "uncentered"
                ? "Centra tu rostro en ovalo "
                : isFaceAligned
                  ? "¡Perfecto!"
                  : "Encuadra tu rostro"}
        </ThemedText>
        <Text style={[styles.subText, { color: colors.textSecondary }]}>
          Escaneo facial
        </Text>
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor: colors.card, shadowColor: colors.shadow },
          isFaceAligned && { borderColor: colors.success, borderWidth: 2 },
        ]}
      >
        <View
          style={[
            styles.camContainer,
            { width: CAMERA_WIDTH, height: CAMERA_HEIGHT },
          ]}
        >
          {photoUri ? (
            <Image source={{ uri: photoUri.uri }} style={styles.cameraImg} />
          ) : (
            <>
              <Camera
                ref={cameraRef}
                style={StyleSheet.absoluteFill}
                device={device!}
                isActive={true}
                photo={true}
                frameProcessor={frameProcessor}
                pixelFormat="yuv"
              />
              <View style={styles.overlay}>
                <View
                  style={[
                    styles.oval,
                    {
                      width: OVAL_WIDTH,
                      height: OVAL_HEIGHT,
                      borderColor: isFaceAligned
                        ? colors.success
                        : colors.borderLight,
                    },
                  ]}
                >
                  {!isFaceAligned && (
                    <View
                      style={[
                        styles.glassLabel,
                        { backgroundColor: colors.backgroundDark + "99" },
                      ]}
                    >
                      <MaterialIcons
                        name="face"
                        size={18}
                        color={colors.primaryLight}
                      />
                      <Text style={{ color: colors.text, fontWeight: "700" }}>
                        {status === "far" ? "Más cerca" : "Alinear"}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        {!photoUri ? (
          <View style={styles.shutterRow}>
            <Pressable
              onPress={() =>
                setFacing((f) => (f === "front" ? "back" : "front"))
              }
              style={[
                styles.iconBtn,
                { backgroundColor: colors.backgroundDark },
              ]}
            >
              <MaterialIcons
                name="flip-camera-android"
                size={26}
                color={colors.primaryLight}
              />
            </Pressable>

            <Pressable
              onPress={takePicture}
              disabled={!isFaceAligned || capturing}
              style={[
                styles.shutterOuter,
                { borderColor: isFaceAligned ? colors.success : colors.border },
              ]}
            >
              <View
                style={[
                  styles.shutterInner,
                  {
                    backgroundColor: isFaceAligned
                      ? colors.success
                      : colors.borderLight,
                  },
                ]}
              />
            </Pressable>

            <View style={{ width: 50 }} />
          </View>
        ) : (
          <View style={styles.btnGroup}>
            <PrimaryButton
              title="Repetir"
              onPress={() => setPhotoUri(null)}
              style={{ flex: 1, backgroundColor: colors.backgroundDark }}
              textStyle={{ color: colors.textSecondary }}
            />
            {/* <Pressable
              onPress={() => setPhotoUri(null)}
              style={[
                styles.secondaryBtn,
                { backgroundColor: colors.backgroundDark },
              ]}
            >
              <Text style={{ color: colors.textSecondary, fontWeight: "700" }}>
                Repetir
              </Text>
            </Pressable> */}
            {/* <Pressable
              onPress={handleSendPhoto}
              style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
            >
              <Text
                style={{
                  color: colors.background,
                  fontWeight: "700",
                  fontSize: 16,
                }}
              >
                Analizar ahora
              </Text>
              <MaterialIcons name="check" size={20} color={colors.background} />
            </Pressable> */}
            <PrimaryButton
              title="Analizar ahora"
              onPress={handleSendPhoto}
              textStyle={{ color: colors.background }}
            />
          </View>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { alignItems: "center", marginVertical: 20 },
  statusText: { fontSize: 22, fontWeight: "800", textAlign: "center" },
  subText: {
    fontSize: 13,
    marginTop: 4,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  card: {
    alignSelf: "center",
    borderRadius: 42,
    padding: 6,
    borderWidth: 2,
    borderColor: "transparent",
    elevation: 4,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  camContainer: { borderRadius: 36, overflow: "hidden" },
  cameraImg: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  oval: {
    borderRadius: 180,
    borderWidth: 2,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  glassLabel: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  footer: { flex: 1, justifyContent: "center", paddingHorizontal: 35 },
  shutterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shutterOuter: {
    width: 78,
    height: 78,
    borderRadius: 39,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  shutterInner: { width: 60, height: 60, borderRadius: 30 },
  iconBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  btnGroup: { flexDirection: "row", gap: 12 },
  secondaryBtn: {
    flex: 1,
    height: 56,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryBtn: {
    flex: 2,
    height: 56,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});
