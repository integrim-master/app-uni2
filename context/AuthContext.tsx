import { AuthContextType, AuthProviderProps } from "@/modules/auth/types/auth.types";
import { UserData } from "@/types/shared/Auth.types";
import { MembershipData } from "@/types/shared/Benefits.type";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLoading } from "./LoadingContext";

const STORAGE_KEY = "auth_data";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [membership, setMembership] = useState<MembershipData | null>(null);
  const [loading, setLoading] = useState(true);

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
      setUser(parsed.user);
      setMembership(parsed.membership);
    } catch (error) {
      console.error("Error restoring session:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (token: string, userData: UserData, membershipData: MembershipData) => {
    showLoading("Iniciando sesión...");
    try {
      const payload = {
        token,
        user: userData,
        membership: membershipData,
      };

      setToken(token);
      setUser(userData);
      setMembership(membershipData);

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
      await SecureStore.deleteItemAsync(STORAGE_KEY);
    } finally {
      hideLoading();
    }
  };

  const value: AuthContextType = {
    token,
    user,
    membership,
    loading,
    login,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
