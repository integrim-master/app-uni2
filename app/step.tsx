import { useAuth } from "@/src/context/AuthContext";
import StepTwo from "@/src/modules/diagnostics/components/StepTwo";
import { useUploadDiagnosticImage } from "@/src/modules/diagnostics/hooks/useDiagnostic";
import { DiagnosticScreenProps } from "@/src/modules/diagnostics/types/diagnostics.types";
import { useAnalyzeImage } from "@/src/n8n/hooks/useAnalizeImage";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";

type PhotoAsset = {
  uri: string;
  type?: string;
  fileName?: string;
};

type DiagnosticView = "camera" | "loading" | "result";

export default function StepScreen(props: DiagnosticScreenProps) {
  const { user, token } = useAuth();
  const userId = user?.user_id;

  const [photoUri, setPhotoUri] = useState<PhotoAsset | null>(null);
  const [diagnosticReport, setDiagnosticReport] = useState<any>(null);

  const {
    mutateAsync: uploadImage,
    isPending: isUploading,
    isSuccess,
    reset: resetUpload,
  } = useUploadDiagnosticImage();

  const {
    mutateAsync: analyzeImage,
    isPending: isAnalyzing,
  } = useAnalyzeImage();

  const { setCurrentStep } = props;

  const view: DiagnosticView = isAnalyzing
    ? "loading"
    : isSuccess || diagnosticReport
    ? "result"
    : "camera";

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem("diagnosticReport");
        if (saved) {
          const parsed = JSON.parse(saved);
          setPhotoUri(parsed.photoUri);
          setDiagnosticReport(parsed);
        }
      } catch (e) {
        console.error("Error loading diagnostic report:", e);
      }
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setCurrentStep?.(diagnosticReport ? 1 : 0);
      return () => {};
    }, [diagnosticReport, setCurrentStep])
  );

  const handleSendPhoto = async () => {
    if (!photoUri || !userId) return;

    try {
      const [analysisResult, uploadResult] = await Promise.all([
        analyzeImage(photoUri),
        uploadImage({
          photo: photoUri,
          userId: String(userId),
          token,
        }),
      ]);

      const payload = {
        analysis: analysisResult,
        photoUri,
        mediaId: uploadResult.id,
      };

      setDiagnosticReport(payload);
      await AsyncStorage.setItem(
        "diagnosticReport",
        JSON.stringify(payload)
      );
    } catch (error) {
      console.error("Error procesando imagen:", error);
    }
  };

  const handleResetFlow = async () => {
    setPhotoUri(null);
    setDiagnosticReport(null);
    resetUpload();
    await AsyncStorage.removeItem("diagnosticReport");
  };

  return (
    <StepTwo
      view={view}
      photoUri={photoUri}
      setPhotoUri={setPhotoUri}
      diagnosticReport={diagnosticReport}
      onSendPhoto={handleSendPhoto}
      onReset={handleResetFlow}
    />
  );
}
