import { useAuth } from "@/src/context/AuthContext";
import { useDiagnostic } from "@/src/context/DiagnosticContext";
import StepTwo from "@/src/modules/diagnostics/components/StepTwo";
import {
  useCreateDiagnostic,
  useUploadDiagnosticImage,
} from "@/src/modules/diagnostics/hooks/useDiagnostic";
import { DiagnosticScreenProps } from "@/src/modules/diagnostics/types/diagnostics.types";
import { useAnalyzeImage } from "@/src/n8n/hooks/useAnalizeImage";

import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";

type PhotoAsset = {
  uri: string;
  type?: string;
  fileName?: string;
};

type DiagnosticView = "camera" | "loading" | "result";

export default function StepScreen(props: DiagnosticScreenProps) {
  const { diagnosticReport, clearDiagnostic, refreshDiagnostic } =
    useDiagnostic();
  const { user, token } = useAuth();
  const userId = user?.user_id;

  const [photoUri, setPhotoUri] = useState<PhotoAsset | null>(null);
  const [localReport, setLocalReport] = useState<any>(null);

  const {
    mutateAsync: uploadImage,
    isPending: isUploading,
    isSuccess,
    reset: resetUpload,
  } = useUploadDiagnosticImage();

  const { mutateAsync: analyzeImage, isPending: isAnalyzing } =
    useAnalyzeImage();

  const { mutateAsync: createDiagnostic } = useCreateDiagnostic();

  const { setCurrentStep } = props;

  const currentDiagnostic = localReport || diagnosticReport;

  const view: DiagnosticView = isAnalyzing
    ? "loading"
    : isSuccess || currentDiagnostic
      ? "result"
      : "camera";

  useFocusEffect(
    useCallback(() => {
      if (diagnosticReport) {
        setCurrentStep?.(1);
      } else {
        setCurrentStep?.(0);
      }
      return () => {};
    }, [diagnosticReport, setCurrentStep]),
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

      const diagnosticoData = Array.isArray(analysisResult)
        ? analysisResult[0]?.diagnostico || {}
        : analysisResult.diagnostico || analysisResult;
      const procedimientosData = Array.isArray(analysisResult)
        ? analysisResult[0]?.procedimientos || []
        : analysisResult.procedimientos || [];

      await createDiagnostic({
        diagnostico: diagnosticoData,
        procedimientos: procedimientosData,
        imageId: uploadResult.id,
        userId: String(userId),
      });

      setLocalReport(payload);
      await refreshDiagnostic();
    } catch (error) {
      console.error("Error procesando imagen:", error);
    }
  };

  const handleResetFlow = async () => {
    setPhotoUri(null);
    setLocalReport(null);
    resetUpload();
    await clearDiagnostic();
  };

  return (
    <StepTwo
      view={view}
      photoUri={photoUri}
      setPhotoUri={setPhotoUri}
      diagnosticReport={currentDiagnostic}
      onSendPhoto={handleSendPhoto}
      onReset={handleResetFlow}
      onBack={() => setCurrentStep?.(0)}
    />
  );
}
