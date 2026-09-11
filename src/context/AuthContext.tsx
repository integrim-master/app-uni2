import {
  setMemoryToken,
  setOnUnauthorized,
  setSessionRestoring,
} from "@/src/api/base";
import { AuthService } from "@/src/modules/auth/services/auth.service";
import {
  AuthContextType,
  AuthProviderProps,
  SignInResult,
} from "@/src/modules/auth/types/auth.types";
import { isUnauthorizedError } from "@/src/modules/auth/utils/apiError";
import {
  getStoredToken,
  removeStoredToken,
  saveStoredToken,
} from "@/src/modules/auth/utils/tokenStorage";
import { FULL_PROFILE_KEY } from "@/src/modules/user/types/me.types";
import { useQueryClient } from "@tanstack/react-query";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";
import { useLoading } from "./LoadingContext";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthTransitioning, setIsAuthTransitioning] = useState(false);
  const queryClient = useQueryClient();
  const { showLoading, hideLoading } = useLoading();

  const clearSession = useCallback(async () => {
    setToken(null);
    setMemoryToken(null);
    queryClient.clear();
    await removeStoredToken();
  }, [queryClient]);

  useEffect(() => {
    setMemoryToken(token);
  }, [token]);

  useEffect(() => {
    setOnUnauthorized(() => {
      void clearSession().then(() => {
        Toast.show({
          type: "info",
          text1: "Sesión expirada",
          text2: "Por seguridad, inicia sesión nuevamente.",
        });
      });
    });
    return () => setOnUnauthorized(null);
  }, [clearSession]);

  const restoreSession = useCallback(async () => {
    setSessionRestoring(true);

    try {
      const stored = await getStoredToken();
      if (!stored) return;

      setMemoryToken(stored);

      try {
        const me = await AuthService.getMeUser();
        queryClient.setQueryData(FULL_PROFILE_KEY, me);
      } catch (error) {
        setMemoryToken(null);

        if (isUnauthorizedError(error)) {
          await removeStoredToken();
          return;
        }
      }

      setToken(stored);
    } finally {
      setSessionRestoring(false);
      setLoading(false);
    }
  }, [queryClient]);

  useEffect(() => {
    void restoreSession();
  }, [restoreSession]);

  const signIn = async (
    credentials: { username: string; password: string },
    options?: { pushToken?: string | null },
  ): Promise<SignInResult> => {
    showLoading("");

    try {
      const data = await AuthService.Login(credentials);

      queryClient.setQueryData(FULL_PROFILE_KEY, {
        user_data: data.user_data,
        membership_data: data.membership_data,
        treatments_careme: data.tratamientos_careme,
        treatments_suggest: data.treatments_suggest,
        promotions: data.promotions,
        ultimas_citas: data.ultimas_citas,
      });

      // Primero el JWT en memoria/storage; si no, push-token va sin auth → 401
      await saveStoredToken(data.token);
      setMemoryToken(data.token);

      if (options?.pushToken) {
        const platform = Platform.OS === "ios" ? "ios" : "android";
        void AuthService.sendTokenNotifications({
          expo_token: options.pushToken,
          platform,
        }).catch((error) => {
          console.error("Error enviando push token:", error);
        });
      }

      // Términos pendientes: no abrir (app) aún
      if (data.user_data.user_terms !== "Aceptado") {
        return { needsTerms: true };
      }

      setIsAuthTransitioning(true);
      setToken(data.token);
      return { needsTerms: false };
    } finally {
      setIsAuthTransitioning(false);
      hideLoading();
    }
  };

  const activateSession = async () => {
    showLoading();
    setIsAuthTransitioning(true);

    try {
      const stored = await getStoredToken();
      if (!stored) {
        throw new Error("No hay sesión pendiente");
      }
      setMemoryToken(stored);
      setToken(stored);
    } finally {
      setIsAuthTransitioning(false);
      hideLoading();
    }
  };

  const logout = async () => {
    // showLoading("Cerrando sesión...");
    setIsAuthTransitioning(true);

    try {
      await clearSession();
    } finally {
      setIsAuthTransitioning(false);
      // hideLoading();
    }
  };

  const value: AuthContextType = {
    token: token ?? undefined,
    loading,
    isAuthTransitioning,
    isAuthenticated: !!token && !loading,
    signIn,
    activateSession,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
