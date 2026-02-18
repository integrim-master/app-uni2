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

const OVAL_WIDTH = width * 0.55;
const OVAL_HEIGHT = height * 0.35;

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
    if (capturing) return;
    
    try {
      setCapturing(true);
      const photo = await cameraRef.current?.takePictureAsync({
        quality: 1,
        base64: false,
      });
      
      if (!photo?.uri) {
        console.warn("No se capturó ninguna foto");
        return;
      }

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

  const resetPhoto = () => {
    setPhotoUri(null);
  };

  const toggleCamera = () => {
    setFacing((prev) => (prev === "front" ? "back" : "front"));
  };

  return (
    <Screen safeArea style={styles.container}>
    
      <View style={styles.header}>
        <BackButton />
      </View>


      {!photoUri && (
        <View style={styles.instructionsContainer}>
          <ThemedText type="subtitle" style={styles.instructionTitle}>
            Posiciona tu rostro
          </ThemedText>
          <ThemedText style={styles.instructionSubtitle}>
            Centra tu cara dentro del marco ovalado
          </ThemedText>
        </View>
      )}

      {photoUri && (
        <View style={styles.instructionsContainer}>
          <ThemedText type="subtitle" style={styles.instructionTitle}>
            ¿Te gusta la foto?
          </ThemedText>
          <ThemedText style={styles.instructionSubtitle}>
            Confirma o toma otra
          </ThemedText>
        </View>
      )}

 
      <View style={[styles.cameraContainer, { borderColor: colors.primary }]}>
        {photoUri ? (
          <Image source={{ uri: photoUri.uri }} style={styles.camera} resizeMode="cover" />
        ) : (
          <CameraView 
            ref={cameraRef} 
            style={styles.camera} 
            facing={facing}
          />
        )}

        {!photoUri && (
          <View style={styles.overlayContainer}>
            <View style={styles.ovalWrapper}>
              <View style={[styles.oval, { borderColor: colors.primary }]} />

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
            onPress={toggleCamera}
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
          onPress={photoUri ? resetPhoto : takePicture}
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
            onPress={onSendPhoto}
          >
            <MaterialIcons name="check" size={28} color="#fff" />
          </Pressable>
        ) : (
          <View style={styles.smallBtnPlaceholder} />
        )}
      </View>

      <View style={styles.bottomSpacer} />
    </Screen>
  );
}

const CAMERA_HEIGHT = height * 0.55;
const CAMERA_WIDTH = width * 0.9;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  
  header: {
    width: "100%",
    paddingHorizontal: 4,
    paddingTop: 4,
    marginBottom: 8,
  },
  
  instructionsContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  
  instructionTitle: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },
  
  instructionSubtitle: {
    fontSize: 14,
    textAlign: "center",
    opacity: 0.7,
  },

  permissionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
  
  permissionTitle: {
    fontSize: 22,
    marginTop: 16,
  },
  
  permissionSubtitle: {
    fontSize: 15,
    opacity: 0.7,
    textAlign: "center",
  },
  
  permissionButton: {
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  
  permissionText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  
  cameraContainer: {
    width: CAMERA_WIDTH,
    height: CAMERA_HEIGHT,
    borderRadius: 24,
    borderWidth: 3,
    overflow: "hidden",
    backgroundColor: "#000",
    marginBottom: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  
  camera: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  
  darkMask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
  },
  
  ovalWrapper: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  
  oval: {
    width: OVAL_WIDTH,
    height: OVAL_HEIGHT,
    borderWidth: 3,
    borderRadius: OVAL_WIDTH / 2,
    borderStyle: "solid",
    backgroundColor: "transparent",
  },
  
  corner: {
    position: "absolute",
    width: 35,
    height: 35,
    borderWidth: 4,
  },
  
  cornerTopLeft: {
    top: 10,
    left: 30,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderTopLeftRadius: 8,
  },
  
  cornerTopRight: {
    top: 10,
    right: 30,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopRightRadius: 8,
  },
  
  cornerBottomLeft: {
    bottom: 10,
    left: 30,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomLeftRadius: 8,
  },
  
  cornerBottomRight: {
    bottom: 10,
    right: 30,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
  },
  
  guideTextContainer: {
    position: "absolute",
    alignItems: "center",
    gap: 8,
  },
  
  guideText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  
  loadingText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  
  smallBtnPlaceholder: {
    width: 52,
    height: 52,
  },
  
  captureBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  
  innerCapture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
  },
  
  bottomSpacer: {
    height: 20,
  },
});