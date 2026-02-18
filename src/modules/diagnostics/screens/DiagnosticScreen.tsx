import { Screen } from "@/src/components/shared/Screen";
import { useAuth } from "@/src/context/AuthContext";
import { useAnalyzeImage } from "@/src/n8n/hooks/useAnalizeImage";
import { useLastDiagnostic } from "@/src/n8n/hooks/useLastDiagnostic";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import StepOne from "../components/StepOne";
import StepTwo from "../components/StepTwo";
import {
  useCreateDiagnostic,
  useUploadDiagnosticImage,
} from "../hooks/useDiagnostic";

type PhotoAsset = { uri: string; type?: string; fileName?: string };
type DiagnosticView = "camera" | "loading" | "result" | "error";

export default function DiagnosticScreen() {
  const { colors } = useTheme();
  const { user, token } = useAuth();
  const userId = user?.user_id;

  const [currentStep, setCurrentStep] = useState(0);
  const [photoUri, setPhotoUri] = useState<PhotoAsset | null>(null);
  const [localReport, setLocalReport] = useState<any>(null);
  const [validationError, setValidationError] = useState<{
    message: string;
    reason?: string;
  } | null>(null);
  // Cuando es true, ignora el último diagnóstico del servidor para mostrar la cámara
  const [newDiagnosticMode, setNewDiagnosticMode] = useState(false);

  const { data: diagnosticLast } = useLastDiagnostic({
    userId: String(userId),
    token: String(token),
  });

  const {
    mutateAsync: uploadImage,
    isSuccess,
    reset: resetUpload,
  } = useUploadDiagnosticImage();
  const { mutateAsync: analyzeImage, isPending: isAnalyzing } =
    useAnalyzeImage();
  const { mutateAsync: createDiagnostic } = useCreateDiagnostic();

  const currentDiagnostic = newDiagnosticMode
    ? localReport?.analysis || null
    : diagnosticLast?.data || localReport?.analysis || null;

  const view: DiagnosticView = isAnalyzing
    ? "loading"
    : validationError
      ? "error"
      : isSuccess || currentDiagnostic
        ? "result"
        : "camera";

  const handleSendPhoto = async () => {
    if (!photoUri || !userId) return;
    setValidationError(null);
    try {
      const analysisResult = await analyzeImage(photoUri);
      const data = Array.isArray(analysisResult)
        ? analysisResult[0]
        : analysisResult;

      if (data.valido === false || data.valido === "false") {
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

      await createDiagnostic({
        diagnostico: data.diagnostico || data,
        procedimientos: data.procedimientos || [],
        imageId: uploadResult.id,
        userId: String(userId),
      });

      setLocalReport({ analysis: data, photoUri, mediaId: uploadResult.id });
    } catch (error: any) {
      setValidationError({
        message:
          error.message || "Ocurrió un error inesperado al procesar la imagen",
      });
    }
  };

  // Volver al paso 1 (StepOne)
  const handleResetFlow = () => {
    setPhotoUri(null);
    setLocalReport(null);
    setValidationError(null);
    resetUpload();
    setNewDiagnosticMode(false);
    setCurrentStep(0);
  };

  // Nuevo diagnóstico: limpia estado y muestra cámara sin salir del paso 2
  const handleNewDiagnostic = () => {
    setPhotoUri(null);
    setLocalReport(null);
    setValidationError(null);
    resetUpload();
    setNewDiagnosticMode(true);
  };

  if (currentStep === 1) {
    return (
      <StepTwo
        view={view}
        photoUri={photoUri}
        setPhotoUri={setPhotoUri}
        diagnosticReport={currentDiagnostic}
        validationError={validationError}
        onSendPhoto={handleSendPhoto}
        onReset={handleResetFlow}
        onNewDiagnostic={handleNewDiagnostic}
        onBack={() => setCurrentStep(0)}
      />
    );
  }

  return (
    <Screen>
      <View style={styles.container}>
        <StepOne />
        <Pressable
          style={[styles.fabNav, { backgroundColor: colors.primary }]}
          onPress={() => setCurrentStep(1)}
        >
          <MaterialIcons name="arrow-forward-ios" size={28} color="#fff" />
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  fabNav: {
    position: "absolute",
    bottom: 32,
    zIndex: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
});
