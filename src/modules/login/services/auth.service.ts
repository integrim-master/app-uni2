import api from "@/src/api/base";
import { LoginResponse } from "../types/login.types";



export const AuthService = {

  Login: async ({ username, password }: { username: string; password: string }) => {
  const response = await api.post<LoginResponse>('wp-json/jwt-auth/v1/token', {
    username,
    password,
  });
  return response.data;
}

};