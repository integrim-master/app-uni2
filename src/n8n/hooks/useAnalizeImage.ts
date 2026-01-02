import { useMutation } from "@tanstack/react-query";
import { AnalyzeImage } from "../n8n.service";

export const useAnalyzeImage = () => {
  return useMutation({
    mutationFn: AnalyzeImage,
  });
};
