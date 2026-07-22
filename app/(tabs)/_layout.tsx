import BrandSpinner from "@/src/components/shared/BrandSpinner";
import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeContext";
import { Redirect } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";
import { Platform, View } from "react-native";

export default function TabsLayout() {
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

  return (
    <NativeTabs
      labelVisibilityMode="labeled"
      tintColor={Platform.OS === "ios" ? colors.primary : "white"}
      backgroundColor={Platform.OS === "ios" ? colors.card : colors.card}
      indicatorColor={colors.primary}
    >
      <NativeTabs.Trigger name="home">
        <NativeTabs.Trigger.Label>Inicio</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="dates">
        <NativeTabs.Trigger.Label>Citas</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="calendar" md="calendar_month" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="diagnostics">
        <NativeTabs.Trigger.Label>Análisis</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="camera.fill" md="photo_camera" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="benefits">
        <NativeTabs.Trigger.Label>Beneficios</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="gift.fill" md="redeem" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>Perfil</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="person.fill" md="account_circle" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
