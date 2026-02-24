import { useMutation } from "@tanstack/react-query";
import {
  CreateDiagnosticParams,
  CreateDiagnosticResult,
  DiagnosticsServices,
  UploadImageParams,
  UploadImageResult,
} from "../services/diagnostic.service";

export const useUploadDiagnosticImage = () => {
  return useMutation<UploadImageResult, Error, UploadImageParams>({
    mutationFn: (params) => DiagnosticsServices.uploadImage(params),
  });
};

export const useCreateDiagnostic = () => {
  return useMutation<CreateDiagnosticResult, Error, CreateDiagnosticParams>({
    mutationFn: (params) => DiagnosticsServices.createDiagnostic(params),
  });
};
