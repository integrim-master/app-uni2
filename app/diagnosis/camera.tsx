import { BackButton } from "@/src/components/shared/BackButton";
import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeContext";
import SendPhoto from "@/src/modules/diagnostics/components/loadingPhoto";
import { useCaptureAndCrop } from "@/src/modules/diagnostics/hooks/useCaptureAndCrop";
import { useFaceAlignment } from "@/src/modules/diagnostics/hooks/useFaceAlignment";
import { useSendDiagnosticPhoto } from "@/src/modules/diagnostics/hooks/useSendDiagnosticPhoto";
import ErrorScreen from "@/src/modules/diagnostics/screens/ErrorScreen";
import { useUser } from "@/src/modules/user/hooks/useUser";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Camera, useCameraPermission } from "react-native-vision-camera";

export default function CameraScreen() {
  const { colors } = useTheme();
  const { token } = useAuth();
  const { data: userInfo } = useUser();
  const userId = userInfo?.user_id;

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const CAMERA_WIDTH = SCREEN_WIDTH * 0.92;
  const CAMERA_HEIGHT = SCREEN_HEIGHT * 0.58;
  const OVAL_WIDTH = CAMERA_WIDTH * 0.62;
  const OVAL_HEIGHT = CAMERA_HEIGHT * 0.65;

  const cameraRef = useRef<Camera>(null);
  const [facing, setFacing] = useState<"front" | "back">("front");

  const { hasPermission, requestPermission } = useCameraPermission();
  const { device, status, isFaceAligned, frameProcessor } = useFaceAlignment(
    facing,
    {
      cameraWidth: CAMERA_WIDTH,
      cameraHeight: CAMERA_HEIGHT,
      ovalWidth: OVAL_WIDTH,
    },
  );
  const { capturing, photoUri, setPhotoUri, takePicture } = useCaptureAndCrop(
    cameraRef,
    {
      cameraHeight: CAMERA_HEIGHT,
      ovalWidth: OVAL_WIDTH,
      ovalHeight: OVAL_HEIGHT,
    },
    isFaceAligned,
  );
  const {
    sendPhoto,
    isProcessing,
    isAnalyzing,
    validationError,
    clearValidationError,
  } = useSendDiagnosticPhoto(userId, token);

  if (!hasPermission) {
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
      </Screen>
    );
  }

  if (isAnalyzing || isProcessing) return <SendPhoto />;

  if (validationError) {
    return (
      <ErrorScreen
        photoUri={photoUri?.uri}
        message={validationError.message}
        onRetry={() => {
          clearValidationError();
          setPhotoUri(null);
        }}
      />
    );
  }

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
                        { backgroundColor: colors.backgroundSurface + "99" },
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
                { backgroundColor: colors.backgroundSurface },
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
          <View className="flex gap-4 w-full p-2 ">
            <PrimaryButton
              variant="secondary"
              title="Repetir"
              onPress={() => setPhotoUri(null)}
            />
            <PrimaryButton
              title="Analizar ahora"
              onPress={() => sendPhoto(photoUri)}
            />
          </View>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: "center", marginVertical: 20 },
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
});
