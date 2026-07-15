import {
  useCreateDiagnostic,
  useUploadDiagnosticImage,
} from "@/src/modules/diagnostics/hooks/useDiagnostic";
import { useSetDiagnosticSession } from "@/src/modules/diagnostics/hooks/useDiagnosticSession";
import { useAnalyzeImage } from "@/src/n8n/hooks/useAnalizeImage";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";

type PhotoUri = { uri: string } | null;

export function useSendDiagnosticPhoto(
  userId: string | number | undefined,
  token: string | undefined,
) {
  const queryClient = useQueryClient();
  const setDiagnosticSession = useSetDiagnosticSession();
  const { mutateAsync: uploadImage, reset: resetUpload } =
    useUploadDiagnosticImage();
  const { mutateAsync: analyzeImage, isPending: isAnalyzing } =
    useAnalyzeImage();
  const { mutateAsync: createDiagnostic } = useCreateDiagnostic();

  const [isProcessing, setIsProcessing] = useState(false);
  const [validationError, setValidationError] = useState<{
    message: string;
    reason?: string;
  } | null>(null);

  const sendPhoto = async (photoUri: PhotoUri) => {
    if (!photoUri || !userId) return;
    setIsProcessing(true);
    try {
      const res = await analyzeImage(photoUri as any);
      const data = Array.isArray(res) ? res[0] : res;
      if (data.valido === false || data.valido === "false") {
        setValidationError({ message: data.error, reason: data.motivo });
        return;
      }
      const upload = await uploadImage({
        photo: photoUri as any,
        userId: String(userId),
        token,
      });
      await createDiagnostic({
        diagnostico: data.diagnostico,
        procedimientos: data.procedimientos || [],
        imageId: upload.id,
        userId: String(userId),
      });
      try {
        setDiagnosticSession({
          analysis: {
            diagnostico: data.diagnostico,
            procedimientos: data.procedimientos || [],
          },
          photoUri,
          mediaId: upload.id,
        } as any);
      } catch (e) {
        console.warn("setDiagnosticSession failed", e);
      }
      queryClient.invalidateQueries({
        queryKey: ["last-diagnostic", String(userId)],
      });
      router.replace("/(tabs)/diagnostics");
    } catch (error: any) {
      setValidationError({ message: error.message || "Error de red" });
    } finally {
      setIsProcessing(false);
    }
  };

  const clearValidationError = () => {
    setValidationError(null);
    resetUpload();
  };

  return {
    sendPhoto,
    isProcessing,
    isAnalyzing,
    validationError,
    clearValidationError,
  };
}
