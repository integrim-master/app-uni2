import { setMemoryToken, setOnUnauthorized } from "@/src/api/base";
import { AuthService } from "@/src/modules/login/services/auth.service";
import {
  AuthContextType,
  AuthProviderProps,
} from "@/src/modules/auth/types/auth.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
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
    await SecureStore.deleteItemAsync("TOKEN");
    await AsyncStorage.clear();
  }, [queryClient]);

  useEffect(() => {
    setOnUnauthorized(() => {
      void clearSession().then(() => router.replace("/login"));
    });
    return () => setOnUnauthorized(null);
  }, [clearSession]);

  useEffect(() => {
    restoreSession();
  }, []);

  const restoreSession = async () => {
    try {
      const saved = await SecureStore.getItemAsync("TOKEN");
      if (!saved) return;

      const parsed = JSON.parse(saved);
      setMemoryToken(parsed.token);

      await AuthService.getMeUser();
      setToken(parsed.token);
    } catch (error) {
      console.error("Error restoring session:", error);
      await clearSession();
    } finally {
      setLoading(false);
    }
  };

  const login = async (tokenValue: string) => {
    showLoading("Iniciando sesión...");
    try {
      setToken(tokenValue);
      setMemoryToken(tokenValue);
      await SecureStore.setItemAsync(
        "TOKEN",
        JSON.stringify({ token: tokenValue }),
      );
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
    token: token || undefined,
    loading,
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
