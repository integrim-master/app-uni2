import { Screen } from "@/src/components/shared/Screen";
import { useAuth } from "@/src/context/AuthContext";
import { AnalyzeImage } from "@/src/n8n/n8n.service";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import StepOne from "../components/StepOne";
import StepTwo from "../components/StepTwo";
import { DiagnosticsServices } from "../services/diagnostic.service";
import { DiagnosticScreenProps } from "../types/diagnostics.types";

type DiagnosticStatus = "idle" | "sending" | "success" | "results";

type PhotoAsset = {
  uri: string;
  type?: string;
  fileName?: string;
};

export default function DiagnosticScreen(props: DiagnosticScreenProps) {
  const { colors } = useTheme();

  const [photoUri, setPhotoUri] = useState<PhotoAsset | null>(null);
  const [status, setStatus] = useState<DiagnosticStatus>("idle");

  const {user,token} = useAuth();

  const userId:any = user?.user_id;
  console.log("User ID in DiagnosticScreen:", user);
  const { currentStep, steps, setCurrentStep, nextStep } = props;

  useFocusEffect(
    useCallback(() => {
      return () => {
        setCurrentStep(0);
        setPhotoUri(null);
        setStatus("idle");
      };
    }, [])
  );
const handleSendPhoto = async () => {
  if (!photoUri) return;
  setStatus("sending");
  try {
    const [analysisResult, uploadResult] = await Promise.all([
      AnalyzeImage(photoUri),
      DiagnosticsServices.uploadImage({
      photo: photoUri,
      userId,
      token,
  
      }),
    ]);

    await AsyncStorage.setItem(
      "diagnosticReport",
      JSON.stringify({
        analysis: analysisResult,
        imageId: uploadResult.id,
      })
    );

    setStatus("success");
  } catch (error: any) {
    console.error("Error procesando imagen:", error);
    setStatus("idle");
  }
};

  const handleAnalysisComplete = () => {
    setStatus("success");

    setTimeout(() => {
      setStatus("results");
    }, 1800);
  };

  const handleResetFlow = () => {
    setPhotoUri(null);
    setStatus("idle");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <StepOne />;

      case 1:
        return (
          <StepTwo
            photoUri={photoUri}
            setPhotoUri={setPhotoUri}
            status={status}
            onSendPhoto={handleSendPhoto}
            onAnalysisComplete={handleAnalysisComplete}
            onReset={handleResetFlow}
          />
        );

      default:
        return <StepOne />;
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.stepContent}>{renderStepContent()}</View>
        </View>

        {currentStep < steps.length - 1 && (
          <Pressable
            style={[
              styles.fabNav,
              { backgroundColor: colors.primary, right: 24 },
            ]}
            onPress={nextStep}
          >
            <MaterialIcons name="arrow-forward-ios" size={28} color="#fff" />
          </Pressable>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  stepContent: {
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
