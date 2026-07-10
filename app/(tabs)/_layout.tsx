import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeContext";
import { Redirect } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";
import { ActivityIndicator, Platform, View } from "react-native";

export default function TabsLayout() {
  const { token, loading } = useAuth();
  const { colors } = useTheme();
  const platform = Platform.OS;

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
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!token) {
    return <Redirect href="/login" />;
  }

  const inactiveTabColor = colors.textSecondary;
  const activeTabColor = colors.textStrong;

  return (
    <NativeTabs
      indicatorColor={colors.primary}
      tintColor={platform === "android" ? activeTabColor : colors.secondary}
      backgroundColor={colors.card}
    >
      <NativeTabs.Trigger name="home">
        <Label>Inicio</Label>
        <Icon
          sf="house.fill"
          selectedColor={
            platform === "android" ? activeTabColor : colors.secondary
          }
          drawable="home_24px"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="dates">
        <Label>Citas</Label>
        <Icon
          sf="calendar"
          selectedColor={
            platform === "android" ? activeTabColor : colors.secondary
          }
          drawable="ic_calendar_month"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="diagnostics">
        <Label>Análisis</Label>
        <Icon
          sf="camera.fill"
          selectedColor={
            platform === "android" ? activeTabColor : colors.secondary
          }
          drawable="ic_photo_camera"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="benefits">
        <Label>Beneficios</Label>
        <Icon
          sf="gift.fill"
          selectedColor={
            platform === "android" ? activeTabColor : colors.secondary
          }
          drawable="ic_gift"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <Label>Perfil</Label>
        <Icon
          sf="person.fill"
          selectedColor={
            platform === "android" ? activeTabColor : colors.secondary
          }
          drawable="ic_account_circle"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
