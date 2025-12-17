import BodyText from "@/src/components/shared/BodyText";
import { Screen } from "@/src/components/shared/Screen";
import SubtitleText from "@/src/components/shared/SubtitleText";
import { MaterialIcons } from "@expo/vector-icons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import LottieView from "lottie-react-native";
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

type Status = "idle" | "sending" | "success" | "results";

type PhotoAsset = {
  uri: string;
  type?: string;
  fileName?: string;
};

type Props = {
  photoUri: PhotoAsset | null;
  setPhotoUri: (uri: PhotoAsset | null) => void;
  status: Status;
  onSendPhoto: () => void;
  onAnalysisComplete: () => void;
  onReset: () => void;
};

export default function StepTwo({
  photoUri,
  setPhotoUri,
  status,
  onSendPhoto,
  onAnalysisComplete,
  onReset,
}: Props) {
  const { colors } = useTheme();
  const cameraRef = useRef<CameraView>(null);

  const [facing, setFacing] = useState<CameraType>("front");
  const [loading, setLoading] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <MaterialIcons
          name="camera-alt"
          size={70}
          color={colors.primary}
          style={{ marginBottom: 20 }}
        />

        <SubtitleText style={{ color: colors.text }}>
          Necesitamos tu permiso para usar la cámara
        </SubtitleText>

        <BodyText style={{ color: colors.textSecondary }}>
          Esto nos permitirá capturar tu foto para el diagnóstico
        </BodyText>

        <Pressable
          style={[styles.permissionButton, { backgroundColor: colors.primary }]}
          onPress={requestPermission}
        >
          <Text style={styles.permissionText}>Conceder Permiso</Text>
        </Pressable>
      </View>
    );
  }

  const takePicture = async () => {
    try {
      setLoading(true);
      const photo = await cameraRef.current?.takePictureAsync();
      if (photo && photo.uri) {
        const uri = photo.uri as string;
        const ext = uri.split(".").pop()?.split("?")[0]?.toLowerCase() || "jpg";
        const fileName = `photo_${Date.now()}.${ext}`;
        const type = ext === "png" ? "image/png" : "image/jpeg";

        setPhotoUri({ uri, fileName, type });
      }
    } finally {
      setLoading(false);
    }
  };

  if (status === "success") {
    return (
      <View style={styles.center}>
        <LottieView
          source={require("../../../../assets/animations/Success.json")}
          autoPlay
          loop
          style={{ width: 180, height: 180 }}
        />
      </View>
    );
  }

  if (status === "results" && photoUri) {
    return <ResultView photoUri={photoUri.uri} onReset={onReset} />;
  }

  if (status === "sending") {
    return <SendPhoto onComplete={onAnalysisComplete} />;
  }

  return (
    <Screen style={styles.container}>
      <View
        style={[
          styles.cameraContainer,
          { borderColor: colors.primary },
        ]}
      >
        {photoUri ? (
          <Image source={{ uri: photoUri.uri }} style={styles.camera} />
        ) : (
          <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
        )}

        {loading && (
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
            onPress={() =>
              setFacing((prev) => (prev === "front" ? "back" : "front"))
            }
          >
            <MaterialIcons name="flip-camera-ios" size={24} color={colors.primary} />
          </Pressable>
        )}

        <Pressable
          style={[
            styles.captureBtn,
            { backgroundColor: photoUri ? colors.backgroundLight : colors.primary },
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

const CAMERA_WIDTH = width * 0.85;
const CAMERA_HEIGHT = height * 0.48;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    flex: 1,
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
