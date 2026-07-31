import { AuthService } from "@/src/modules/auth/services/auth.service";
import { useMutation } from "@tanstack/react-query";

import { LoginResponse } from "../types/login.types";

export const useLogin = () => {
  return useMutation<
    LoginResponse,
    Error,
    { username: string; password: string }
  >({
    mutationFn: AuthService.Login,
  });
};
