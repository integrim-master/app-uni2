import { TabBarContext } from "@/src/context/TabBarContext";
import { useTheme } from "@/src/context/ThemeContext";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import React, { useState } from "react";
import { Platform } from "react-native";

export default function TabsLayout() {
  const { colors } = useTheme();
  const [showTabBar, setShowTabBar] = useState(false);

  return (
    <TabBarContext.Provider value={{ setShowTabBar }}>
      <NativeTabs
        hidden={showTabBar}
        labelVisibilityMode="labeled"
        tintColor={Platform.OS === "ios" ? colors.primary : "white"}
        backgroundColor={colors.background}
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
    </TabBarContext.Provider>
  );
}
