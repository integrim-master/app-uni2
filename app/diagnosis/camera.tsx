import { BackButton } from "@/src/components/shared/BackButton";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useAuth } from "@/src/context/AuthContext";
import { useUser } from "@/src/modules/banner/hooks/userHome";
import SendPhoto from "@/src/modules/diagnostics/components/loadingPhoto";
import {
  useCreateDiagnostic,
  useUploadDiagnosticImage,
} from "@/src/modules/diagnostics/hooks/useDiagnostic";
import { DIAGNOSTIC_SESSION_KEY } from "@/src/modules/diagnostics/hooks/useDiagnosticSession";
import ErrorScreen from "@/src/modules/diagnostics/screens/ErrorScreen";
import { useAnalyzeImage } from "@/src/n8n/hooks/useAnalizeImage";
import { MaterialIcons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useTheme } from "../../src/context/ThemeContext";

type PhotoAsset = { uri: string; type?: string; fileName?: string };

export default function CameraScreen() {
  const { colors } = useTheme();
  const { token } = useAuth();
  const { data: userInfo } = useUser();
  const userId = userInfo?.user_id;
  const queryClient = useQueryClient();
  const { width, height } = useWindowDimensions();

  const OVAL_WIDTH = width * 0.55;
  const OVAL_HEIGHT = height * 0.35;
  const CAMERA_HEIGHT = height * 0.55;
  const CAMERA_WIDTH = width * 0.9;

  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>("front");
  const [capturing, setCapturing] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const [photoUri, setPhotoUri] = useState<PhotoAsset | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationError, setValidationError] = useState<{
    message: string;
    reason?: string;
  } | null>(null);

  const { mutateAsync: uploadImage, reset: resetUpload } =
    useUploadDiagnosticImage();
  const { mutateAsync: analyzeImage, isPending: isAnalyzing } =
    useAnalyzeImage();
  const { mutateAsync: createDiagnostic } = useCreateDiagnostic();

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <MaterialIcons name="camera-alt" size={70} color={colors.primary} />
        <ThemedText type="subtitle" style={styles.permissionTitle}>
          Necesitamos tu permiso
        </ThemedText>
        <ThemedText style={styles.permissionSubtitle}>
          Para capturar tu foto de diagnóstico
        </ThemedText>
        <Pressable
          style={[styles.permissionButton, { backgroundColor: colors.primary }]}
          onPress={requestPermission}
        >
          <Text style={styles.permissionText}>Conceder permiso</Text>
        </Pressable>
      </View>
    );
  }

  if (isAnalyzing || isProcessing) return <SendPhoto />;

  if (validationError) {
    return (
      <ErrorScreen
        message={validationError.message}
        reason={validationError.reason}
        photoUri={photoUri?.uri}
        onRetry={() => {
          setValidationError(null);
          setPhotoUri(null);
          resetUpload();
        }}
      />
    );
  }

  const takePicture = async () => {
    if (capturing) return;
    try {
      setCapturing(true);
      const photo = await cameraRef.current?.takePictureAsync({
        quality: 1,
        base64: false,
      });
      if (!photo?.uri) return;
      setPhotoUri({
        uri: photo.uri,
        fileName: `diagnostic_${Date.now()}.jpg`,
        type: "image/jpeg",
      });
    } catch (error) {
      console.error("Error al capturar foto:", error);
    } finally {
      setCapturing(false);
    }
  };

  const handleSendPhoto = async () => {
    if (!photoUri || !userId) return;
    setValidationError(null);
    setIsProcessing(true);
    try {
      const analysisResult = await analyzeImage(photoUri);
      const data = Array.isArray(analysisResult)
        ? analysisResult[0]
        : analysisResult;

      if (data.valido === false || data.valido === "false") {
        setIsProcessing(false);
        setValidationError({
          message: data.error || "La imagen no cumple con los requisitos",
          reason: data.motivo || "invalid_image",
        });
        return;
      }

      const uploadResult = await uploadImage({
        photo: photoUri,
        userId: String(userId),
        token,
      });

      const dat = await createDiagnostic({
        diagnostico: data.diagnostico || data,
        procedimientos: data.procedimientos || [],
        imageId: uploadResult.id,
        userId: String(userId),
      });

      queryClient.setQueryData(DIAGNOSTIC_SESSION_KEY, {
        analysis: data,
        photoUri,
        mediaId: uploadResult.id,
      });

      queryClient.setQueryData(["last-diagnostic", String(userId)], {
        success: true,
        data: {
          diagnostico: data.diagnostico || data,
          procedimientos: data.procedimientos || [],
          imagen_url: photoUri.uri,
          photoUri,
          analysis: data,
        },
      });

      queryClient.invalidateQueries({
        queryKey: ["last-diagnostic", String(userId)],
      });

      setIsProcessing(false);
      router.back();
    } catch (error: any) {
      setIsProcessing(false);
      setValidationError({
        message:
          error.message || "Ocurrió un error inesperado al procesar la imagen",
      });
    }
  };

  return (
    <Screen safeArea leftButton={<BackButton />} style={styles.container}>
      <View style={styles.instructionsContainer}>
        {photoUri ? (
          <>
            <ThemedText type="subtitle" style={styles.instructionTitle}>
              ¿Te gusta la foto?
            </ThemedText>
            <ThemedText style={styles.instructionSubtitle}>
              Confirma o toma otra
            </ThemedText>
          </>
        ) : (
          <>
            <ThemedText type="subtitle" style={styles.instructionTitle}>
              Posiciona tu rostro
            </ThemedText>
            <ThemedText style={styles.instructionSubtitle}>
              Centra tu cara dentro del marco ovalado
            </ThemedText>
          </>
        )}
      </View>

      <View
        style={[
          styles.cameraContainer,
          {
            borderColor: colors.primary,
            width: CAMERA_WIDTH,
            height: CAMERA_HEIGHT,
          },
        ]}
      >
        {photoUri ? (
          <Image
            source={{ uri: photoUri.uri }}
            style={[
              styles.camera,
              facing === "front" && { transform: [{ scaleX: -1 }] },
            ]}
            resizeMode="cover"
          />
        ) : (
          <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
        )}

        {!photoUri && (
          <View style={styles.overlayContainer}>
            <View style={styles.ovalWrapper}>
              <View
                style={[
                  styles.oval,
                  {
                    borderColor: colors.primary,
                    width: OVAL_WIDTH,
                    height: OVAL_HEIGHT,
                    borderRadius: OVAL_WIDTH / 2,
                  },
                ]}
              />
              <View style={styles.guideTextContainer}>
                <MaterialIcons name="face" size={28} color="white" />
                <Text style={styles.guideText}>Alinea tu rostro aquí</Text>
              </View>
            </View>
          </View>
        )}

        {capturing && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Capturando...</Text>
          </View>
        )}
      </View>

      <View style={styles.controls}>
        {!photoUri ? (
          <Pressable
            style={[styles.smallBtn, { borderColor: colors.primary }]}
            onPress={() => setFacing((p) => (p === "front" ? "back" : "front"))}
            disabled={capturing}
          >
            <MaterialIcons
              name="flip-camera-ios"
              size={24}
              color={colors.primary}
            />
          </Pressable>
        ) : (
          <View style={styles.smallBtnPlaceholder} />
        )}

        <Pressable
          style={[
            styles.captureBtn,
            {
              backgroundColor: photoUri ? "#eee" : colors.primary,
              borderWidth: photoUri ? 2 : 0,
              borderColor: photoUri ? colors.primary : "transparent",
            },
          ]}
          onPress={photoUri ? () => setPhotoUri(null) : takePicture}
          disabled={capturing}
        >
          {photoUri ? (
            <MaterialIcons name="refresh" size={30} color={colors.primary} />
          ) : (
            <View style={styles.innerCapture} />
          )}
        </Pressable>

        {photoUri ? (
          <Pressable
            style={[styles.smallBtn, { backgroundColor: colors.primary }]}
            onPress={handleSendPhoto}
          >
            <MaterialIcons name="check" size={28} color="#fff" />
          </Pressable>
        ) : (
          <View style={styles.smallBtnPlaceholder} />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  permissionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
  permissionTitle: { fontSize: 22, marginTop: 16 },
  permissionSubtitle: { fontSize: 15, opacity: 0.7, textAlign: "center" },
  permissionButton: {
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    elevation: 3,
  },
  permissionText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  instructionsContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
    marginTop: 8,
  },
  instructionTitle: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },
  instructionSubtitle: { fontSize: 14, textAlign: "center", opacity: 0.7 },
  cameraContainer: {
    borderRadius: 24,
    borderWidth: 3,
    overflow: "hidden",
    backgroundColor: "#000",
    marginBottom: 20,
    elevation: 8,
  },
  camera: { flex: 1, width: "100%", height: "100%" },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  ovalWrapper: { justifyContent: "center", alignItems: "center", zIndex: 2 },
  oval: {
    borderWidth: 3,
    backgroundColor: "transparent",
  },
  guideTextContainer: { position: "absolute", alignItems: "center", gap: 8 },
  guideText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    textShadowColor: "rgba(0,0,0,0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  loadingText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    paddingHorizontal: 20,
  },
  smallBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    elevation: 4,
  },
  smallBtnPlaceholder: { width: 52, height: 52 },
  captureBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
  innerCapture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
  },
});
