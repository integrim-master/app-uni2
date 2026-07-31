import {
  setMemoryToken,
  setOnUnauthorized,
  setSessionRestoring,
} from "@/src/api/base";
import { AuthService } from "@/src/modules/auth/services/auth.service";
import {
  AuthContextType,
  AuthProviderProps,
} from "@/src/modules/auth/types/auth.types";
import { isUnauthorizedError } from "@/src/modules/auth/utils/apiError";
import {
  getStoredToken,
  removeStoredToken,
  saveStoredToken,
} from "@/src/modules/auth/utils/tokenStorage";
import { FULL_PROFILE_KEY } from "@/src/modules/user/types/me.types";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Toast from "react-native-toast-message";
import { useLoading } from "./LoadingContext";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
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
        router.replace("/login");
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
        // Red / otro error: permitir entrar; Home hará el fetch.
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

  const login = async (tokenValue: string) => {
    showLoading("Iniciando sesión...");
    try {
      await saveStoredToken(tokenValue);
      setToken(tokenValue);
    } finally {
      hideLoading();
    }
  };

  const logout = async () => {
    showLoading("Cerrando sesión...");
    try {
      await clearSession();
      router.replace("/login");
    } finally {
      hideLoading();
    }
  };

  const value: AuthContextType = {
    token: token ?? undefined,
    loading,
    isAuthenticated: !!token && !loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
