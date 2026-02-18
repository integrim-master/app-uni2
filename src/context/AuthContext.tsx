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
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Promotion } from "../modules/home/types/home.promotions.types";
import { useLoading } from "./LoadingContext";

const STORAGE_KEY = "auth_data";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [membership, setMembership] = useState<MembershipData | null>(null);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [treatmentsCareme, setTreatmentsCareme] = useState<TratamientoCareme[]>(
    [],
  );
  const [dates, setDatesState] = useState<UltimasCitas>([]);

  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    restoreSession();
  }, []);

  const restoreSession = async () => {
    try {
      const saved = await SecureStore.getItemAsync(STORAGE_KEY);
      if (!saved) return;

      const parsed = JSON.parse(saved);
      setToken(parsed.token);
      setTreatmentsCareme(parsed.tratamientos_careme);
      setUser(parsed.user);
      setPromotions(parsed.promotions || []);
      setMembership(parsed.membership);
      if (parsed.dates) setDatesState(parsed.dates);
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
      const payload = {
        token,
        user: userData,
        membership: membershipData,
        tratamientos_careme: treatments,
        treatments_suggest: treatments_suggest,
        promotions: promotions,
        dates: datesArg,
      };
      setToken(token);
      setUser(userData);
      setMembership(membershipData);
      setTreatmentsCareme(treatments);
      setPromotions(promotions);
      await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(payload));
    } finally {
      hideLoading();
    }
  };

  const logout = async () => {
    showLoading("Cerrando sesión...");
    try {
      setToken(null);
      setUser(null);
      setMembership(null);

      await AsyncStorage.clear();
      await SecureStore.deleteItemAsync(STORAGE_KEY);
    } finally {
      hideLoading();
    }
  };

  const updateUserInStorage = async (updatedUser: UserData) => {
    try {
      const saved = await SecureStore.getItemAsync(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        parsed.user = updatedUser;
        await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(parsed));
      }
    } catch (e) {
      console.error("Error actualizando SecureStore:", e);
    }
  };

  const value: AuthContextType = {
    token: token || undefined,
    user,
    membership,
    treatmentsCareme,
    dates,
    loading,
    login,
    logout,
    setUser,
    updateUserInStorage,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
