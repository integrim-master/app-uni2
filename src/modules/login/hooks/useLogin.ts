import { useMutation } from "@tanstack/react-query";

import { AuthService } from "../services/auth.service";
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
