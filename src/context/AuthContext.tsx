import { setMemoryToken } from "@/src/api/base";
import {
  AuthContextType,
  AuthProviderProps,
} from "@/src/modules/auth/types/auth.types";
import { UltimasCitas } from "@/src/modules/home/types/home.dates.types";
import { UserData } from "@/src/types/shared/Auth.types";
import {
  MembershipData,
  TratamientoCareme,
} from "@/src/types/shared/Benefits.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Promotion } from "../modules/home/types/home.promotions.types";
import { useLoading } from "./LoadingContext";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    restoreSession();
  }, []);

  const restoreSession = async () => {
    try {
      const saved = await SecureStore.getItemAsync("TOKEN");
      if (!saved) return;
      const parsed = JSON.parse(saved);
      setToken(parsed.token);
      setMemoryToken(parsed.token);
    } catch (error) {
      console.error("Error restoring session:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (
    token: string,
    userData: UserData,
    membershipData: MembershipData,
    treatments: TratamientoCareme[],
    treatments_suggest: TratamientoCareme[],
    promotions: Promotion[],
    datesArg?: UltimasCitas,
  ) => {
    showLoading("Iniciando sesión...");
    try {
      setToken(token);
      setMemoryToken(token);
      await SecureStore.setItemAsync("TOKEN", JSON.stringify({ token }));

      queryClient.setQueryData(["full-profile"], {
        user_data: userData,
        membership_data: membershipData,
        treatments_suggest: treatments_suggest,
        treatments_careme: treatments,
        promotions: promotions,
        ultimas_citas: datesArg,
      });
    } finally {
      hideLoading();
    }
  };

  const logout = async () => {
    showLoading("Cerrando sesión...");
    try {
      setToken(null);
      setMemoryToken(null);
      queryClient.clear();
      await SecureStore.deleteItemAsync("TOKEN");
      await AsyncStorage.clear();
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
