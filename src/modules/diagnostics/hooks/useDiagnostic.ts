
import { useMutation } from "@tanstack/react-query";
import { DiagnosticsServices } from "../services/diagnostic.service";
export interface UploadImageParams {
  photo: {
    uri: string;
    type?: string;
    fileName?: string;
  };
  userId: string;
  token?: string;
}

export interface UploadImageResult {
  id: number;
}

export const useUploadDiagnosticImage = () => {
  return useMutation<UploadImageResult, Error, UploadImageParams>({
    mutationFn: (params) =>
      DiagnosticsServices.uploadImage(params),
  });
};
