import { AuthService } from "@/src/modules/auth/services/auth.service";
import { useMutation } from "@tanstack/react-query";

import { VerifyOtpBody, VerifyOtpResponse } from "../types/login.types";

export const useVerifyOtp = () => {
  return useMutation<VerifyOtpResponse, Error, VerifyOtpBody>({
    mutationFn: AuthService.verifyOtp,
  });
};
