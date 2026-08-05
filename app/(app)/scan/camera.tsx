import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeContext";
import FaceCaptureRing from "@/src/modules/diagnostics/components/FaceCaptureRing";
import SendPhoto from "@/src/modules/diagnostics/components/loadingPhoto";
import { useCapturePhoto } from "@/src/modules/diagnostics/hooks/useCapturePhoto";
import { useFaceAlignment } from "@/src/modules/diagnostics/hooks/useFaceAlignment";
import { useSendDiagnosticPhoto } from "@/src/modules/diagnostics/hooks/useSendDiagnosticPhoto";
import ErrorScreen from "@/src/modules/diagnostics/screens/ErrorScreen";
import { useUser } from "@/src/modules/user/hooks/useUser";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import { Camera, useCameraPermission } from "react-native-vision-camera";

export default function CameraScreen() {
  const { colors } = useTheme();
  const { token } = useAuth();
  const { data: userInfo } = useUser();
  const userId = userInfo?.user_id;

  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const OVAL_W = SCREEN_WIDTH * 0.66;
  const OVAL_H = OVAL_W * 1.32;

  const cameraRef = useRef<Camera>(null);
  const [facing, setFacing] = useState<"front" | "back">("front");

  const { hasPermission, requestPermission } = useCameraPermission();
  const { device, status, isFaceAligned, frameProcessor } = useFaceAlignment(
    facing,
    {
      cameraWidth: OVAL_W,
      cameraHeight: OVAL_H,
      ovalWidth: OVAL_W,
    },
  );
  const { capturing, photoUri, setPhotoUri, takePicture } = useCapturePhoto(
    cameraRef,
    isFaceAligned,
  );
  const {
    sendPhoto,
    isProcessing,
    isAnalyzing,
    validationError,
    clearValidationError,
  } = useSendDiagnosticPhoto(userId, token);

  useEffect(() => {
    if (!hasPermission || photoUri || !isFaceAligned || capturing) return;

    const timer = setTimeout(() => {
      takePicture();
    }, 1000);

    return () => clearTimeout(timer);
  }, [hasPermission, photoUri, isFaceAligned, capturing, takePicture]);

  if (!hasPermission) {
    return (
      <Screen safeArea={true}>
        <View style={styles.permissionWrap}>
          <View style={styles.permissionIcon}>
            <MaterialIcons name="face" size={44} color="#FFFFFF" />
          </View>
          <ThemedText type="display" tone="inverse" align="center">
            Activa tu cámara
          </ThemedText>
          <ThemedText type="body" tone="secondary" align="center">
            Necesitamos acceso a la cámara para realizar tu escaneo facial de
            forma segura.
          </ThemedText>
          <View style={styles.permissionBtn}>
            <PrimaryButton
              title="Permitir Cámara"
              onPress={requestPermission}
            />
          </View>
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

  const ringColor = isFaceAligned ? colors.success : "#FFFFFF";
  const title = photoUri
    ? "Revisa tu foto"
    : status === "far"
      ? "Acércate más"
      : status === "uncentered"
        ? "Centra tu rostro"
        : isFaceAligned
          ? "Rostro reconocido"
          : "Escaneo facial";
  const subtitle = photoUri
    ? "Confirma que la imagen se ve bien antes de analizar"
    : isFaceAligned
      ? "Mantente quieto y captura"
      : "Coloca tu rostro dentro del óvalo";

  return (
    <Screen fullWidth safeArea={true}>
      <View style={styles.headings}>
        <ThemedText
          type="display"
          align="center"
          tone={isFaceAligned ? "primary" : "inverse"}
        >
          {title}
        </ThemedText>
        <ThemedText type="body" tone="secondary" align="center">
          {subtitle}
        </ThemedText>
      </View>

      <FaceCaptureRing
        ovalW={OVAL_W}
        ovalH={OVAL_H}
        ringColor={ringColor}
        aligned={isFaceAligned}
        photoUri={photoUri?.uri}
        cameraRef={cameraRef}
        device={device!}
        frameProcessor={frameProcessor}
      />

      <View style={styles.bottom}>
        {!photoUri ? (
          <View style={styles.shutterRow}>
            <View style={styles.sideSlot} />

            <Pressable
              onPress={takePicture}
              disabled={!isFaceAligned || capturing}
              style={({ pressed }) => [
                styles.shutterOuter,
                {
                  borderColor: isFaceAligned ? colors.success : "#FFFFFF",
                  opacity: !isFaceAligned || capturing ? 0.4 : 1,
                },
                pressed && isFaceAligned && { transform: [{ scale: 0.92 }] },
              ]}
            >
              <View
                style={[
                  styles.shutterInner,
                  {
                    backgroundColor: isFaceAligned ? colors.success : "#FFFFFF",
                  },
                ]}
              />
            </Pressable>

            <View style={styles.sideSlot}>
              <Pressable
                onPress={() =>
                  setFacing((f) => (f === "front" ? "back" : "front"))
                }
                style={({ pressed }) => [
                  styles.flipBtn,
                  pressed && { opacity: 0.5 },
                ]}
              >
                <MaterialIcons
                  name="flip-camera-android"
                  size={26}
                  color="#FFFFFF"
                />
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.actions}>
            <Pressable
              onPress={() => setPhotoUri(null)}
              style={({ pressed }) => [
                styles.retryText,
                pressed && { opacity: 0.5 },
              ]}
            >
              <ThemedText type="semiBold" tone="accent" align="center">
                Repetir
              </ThemedText>
            </Pressable>
            <View style={styles.analyzeBtn}>
              <PrimaryButton
                title="Analizar ahora"
                onPress={() => sendPhoto(photoUri)}
              />
            </View>
          </View>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  headings: {
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  bottom: {
    paddingBottom: 48,
    paddingHorizontal: 32,
    minHeight: 140,
    justifyContent: "center",
  },
  shutterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sideSlot: {
    width: 52,
    alignItems: "center",
  },
  shutterOuter: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  shutterInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },
  flipBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(255,255,255,0.12)",
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    alignItems: "center",
    gap: 16,
  },
  retryText: {
    paddingVertical: 6,
  },
  analyzeBtn: {
    width: "100%",
  },
  permissionWrap: {
    alignItems: "center",
    gap: 12,
  },
  permissionBtn: {
    width: "100%",
    marginTop: 12,
  },
  permissionIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
});
