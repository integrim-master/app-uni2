import { useMutation } from "@tanstack/react-query";
import { analyzeImage } from "../services/analyze.service";

export const useAnalyzeImage = () => {
  return useMutation({
    mutationFn: analyzeImage,
  });
};
