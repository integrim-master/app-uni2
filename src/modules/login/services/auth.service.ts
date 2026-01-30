import api from "@/src/api/base";
import { MeApiResponse } from "@/src/modules/auth/types/auth.types";
import { AcceptTermsResponse, LoginResponse } from "../types/login.types";

export const AuthService = {
  getMeUser: async () => {
    const response = await api.get<MeApiResponse>("wp-json/careme/v1/me");
    return response.data;
  },

  Login: async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const response = await api.post<LoginResponse>(
      "wp-json/jwt-auth/v1/token",
      {
        username,
        password,
      },
    );
    return response.data;
  },

  AceptTerms: async () => {
    const response = await api.post<AcceptTermsResponse>(
      "/wp-json/careme/v1/me/terms",
    );
    return response.data;
  },
};
