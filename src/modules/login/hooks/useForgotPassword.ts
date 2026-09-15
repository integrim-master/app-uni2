import { AuthService } from "@/src/modules/auth/services/auth.service";
import { useMutation } from "@tanstack/react-query";

import {
  ForgotPasswordBody,
  ForgotPasswordResponse,
} from "../types/login.types";

export const useForgotPassword = () => {
  return useMutation<ForgotPasswordResponse, Error, ForgotPasswordBody>({
    mutationFn: AuthService.forgotPassword,
  });
};
