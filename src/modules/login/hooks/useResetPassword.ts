import { AuthService } from "@/src/modules/auth/services/auth.service";
import { useMutation } from "@tanstack/react-query";

import {
  ResetPasswordBody,
  ResetPasswordResponse,
} from "../types/login.types";

export const useResetPassword = () => {
  return useMutation<ResetPasswordResponse, Error, ResetPasswordBody>({
    mutationFn: AuthService.resetPassword,
  });
};
