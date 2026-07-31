import BrandSpinner from "@/src/components/shared/BrandSpinner";
import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeContext";
import { Redirect } from "expo-router";
import React, { ReactNode } from "react";
import { View } from "react-native";

type Props = {
  children: ReactNode;
};

/**
 * Bloquea pantallas fuera de `(tabs)` si no hay sesión.
 * Muestra spinner mientras restaura el token desde SecureStore.
 */
export function RequireAuth({ children }: Props) {
  const { token, loading } = useAuth();
  const { colors } = useTheme();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <BrandSpinner />
      </View>
    );
  }

  if (!token) {
    return <Redirect href="/login" />;
  }

  return <>{children}</>;
}
