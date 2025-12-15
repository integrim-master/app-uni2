import api from "@/api/base";
import { LoginResponse } from "../types/login.types";



export const AuthService = {

  Login: async ({ username, password }: { username: string; password: string }) => {
  const response = await api.post<LoginResponse>('wp-json/jwt-auth/v1/token', {
    username,
    password,
  });
  console.log({response}, 'esta es la response del servicio de login');
  return response.data;
}

};