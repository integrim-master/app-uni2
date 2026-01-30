import { BackButton } from "@/src/components/shared/BackButton";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { MaterialIcons } from "@expo/vector-icons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import SendPhoto from "./loadingPhoto";
import ResultView from "./ResultView";

const { width, height } = Dimensions.get("window");

type PhotoAsset = {
  uri: string;
  type?: string;
  fileName?: string;
};

type DiagnosticView = "camera" | "loading" | "result";

type Props = {
  view: DiagnosticView;
  photoUri: PhotoAsset | null;
  setPhotoUri: (uri: PhotoAsset | null) => void;
  diagnosticReport?: any;
  onSendPhoto: () => void;
  onReset: () => void;
  onBack?: () => void;
};

export default function StepTwo({
  view,
  photoUri,
  setPhotoUri,
  diagnosticReport,
  onSendPhoto,
  onReset,
  onBack,
}: Props) {
  const { colors } = useTheme();
  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>("front");
  const [capturing, setCapturing] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <MaterialIcons name="camera-alt" size={70} color={colors.primary} />
        <ThemedText type="subtitle">Necesitamos tu permiso</ThemedText>
        <ThemedText>Para capturar tu foto</ThemedText>

        <Pressable
          style={[styles.permissionButton, { backgroundColor: colors.primary }]}
          onPress={requestPermission}
        >
          <Text style={styles.permissionText}>Conceder permiso</Text>
        </Pressable>
      </View>
    );
  }

  if (view === "loading") return <SendPhoto />;

  if (view === "result" && diagnosticReport) {
    return (
      <ResultView
        photoUri={photoUri || undefined}
        diagnostic={diagnosticReport}
        onReset={onReset}
      />
    );
  }

  const takePicture = async () => {
    try {
      setCapturing(true);
      const photo = await cameraRef.current?.takePictureAsync();
      if (!photo?.uri) return;

      setPhotoUri({
        uri: photo.uri,
        fileName: `photo_${Date.now()}.jpg`,
        type: "image/jpeg",
      });
    } finally {
      setCapturing(false);
    }
  };

  return (
    <Screen style={styles.container}>
      <View className="w-full p-1">
        <BackButton />
      </View>

      <View style={[styles.cameraContainer, { borderColor: colors.primary }]}>
        {photoUri ? (
          <Image source={{ uri: photoUri.uri }} style={styles.camera} />
        ) : (
          <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
        )}

        {capturing && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Capturando...</Text>
          </View>
        )}
      </View>

      <View style={styles.controls}>
        {!photoUri && (
          <Pressable
            style={[styles.smallBtn, { borderColor: colors.primary }]}
            onPress={() => setFacing((f) => (f === "front" ? "back" : "front"))}
          >
            <MaterialIcons
              name="flip-camera-ios"
              size={24}
              color={colors.primary}
            />
          </Pressable>
        )}

        <Pressable
          style={[
            styles.captureBtn,
            { backgroundColor: photoUri ? "#eee" : colors.primary },
          ]}
          onPress={photoUri ? () => setPhotoUri(null) : takePicture}
        >
          {photoUri ? (
            <MaterialIcons name="refresh" size={26} color={colors.primary} />
          ) : (
            <View style={styles.innerCapture} />
          )}
        </Pressable>

        {photoUri && (
          <Pressable
            style={[styles.smallBtn, { backgroundColor: colors.primary }]}
            onPress={onSendPhoto}
          >
            <MaterialIcons name="check" size={24} color="#fff" />
          </Pressable>
        )}
      </View>
    </Screen>
  );
}

const CAMERA_HEIGHT = height * 0.48;
const CAMERA_WIDTH = width * 0.9;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  permissionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  permissionButton: {
    marginTop: 20,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  permissionText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  cameraContainer: {
    width: CAMERA_WIDTH,
    height: CAMERA_HEIGHT,
    borderRadius: 22,
    borderWidth: 2,
    overflow: "hidden",
    backgroundColor: "#000",
    marginBottom: 16,
  },
  camera: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "#fff",
    marginTop: 8,
    fontWeight: "600",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  smallBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  captureBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  innerCapture: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
  },
});


 