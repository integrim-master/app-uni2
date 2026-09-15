import api from "@/src/api/base";
import {
  AcceptTermsResponse,
  ForgotPasswordBody,
  ForgotPasswordResponse,
  LoginResponse,
  ResetPasswordBody,
  ResetPasswordResponse,
  VerifyOtpBody,
  VerifyOtpResponse,
} from "@/src/modules/login/types/login.types";
import { MeApiResponse } from "@/src/modules/user/types/me.types";

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

  forgotPassword: async (body: ForgotPasswordBody) => {
    const response = await api.post<ForgotPasswordResponse>(
      "/wp-json/careme/v1/auth/forgot-password",
      body,
    );
    return response.data;
  },

  verifyOtp: async (body: VerifyOtpBody) => {
    const response = await api.post<VerifyOtpResponse>(
      "/wp-json/careme/v1/auth/verify-otp",
      body,
    );
    return response.data;
  },

  resetPassword: async (body: ResetPasswordBody) => {
    const response = await api.post<ResetPasswordResponse>(
      "/wp-json/careme/v1/auth/reset-password",
      body,
    );
    return response.data;
  },

  sendTokenNotifications: async ({
    expo_token,
    platform,
  }: {
    expo_token: string;
    platform: any;
  }) => {
    const response = await api.post("/wp-json/careme/v1/push-token", {
      expo_token: expo_token,
      platform: platform,
    });
    return response.data;
  },
};
