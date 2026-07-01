import { useTheme } from "@/src/context/ThemeContext";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function TabsLayout() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const baseTabBarHeight = Platform.OS === "ios" ? 88 : 64;
  const bottomInset = Platform.OS === "android" ? insets.bottom : 0;

  const tabBarStyle = {
    backgroundColor: colors.card,
    borderTopColor: "transparent",
    height: baseTabBarHeight + bottomInset,
    paddingBottom: bottomInset
      ? bottomInset + (Platform.OS === "ios" ? 12 : 8)
      : Platform.OS === "ios"
        ? 28
        : 12,
    paddingTop: 8,
    borderTopWidth: 0.5,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  };

  return (
    // <Tabs
    //   screenOptions={{
    //     headerShown: true,
    //     tabBarActiveTintColor: colors.primary,
    //     tabBarInactiveTintColor: colors.textSecondary,
    //     headerTitleAlign: "center",
    //     headerTintColor: "white",
    //     headerShadowVisible: false,
    //     headerTransparent: false,
    //     tabBarStyle,
    //     sceneStyle: { backgroundColor: "#302D34" },
    //     headerBackground: () => (
    //       <LinearGradient
    //         colors={colors.gradientBackground}
    //         start={{ x: 0, y: 0.5 }}
    //         end={{ x: 1, y: 0.25 }}
    //         style={StyleSheet.absoluteFillObject}
    //       />
    //     ),
    //   }}
    // >
    //   <Tabs.Screen
    //     name="home"
    //     options={{
    //       title: "Inicio",
    //       tabBarIcon: ({ color }) => <HomeIcon color={color} />,
    //       headerShown: false,
    //     }}
    //   />

    //   <Tabs.Screen
    //     name="dates"
    //     options={{
    //       title: "Mis citas",
    //       tabBarIcon: ({ color }) => <CalendarIcon color={color} />,
    //       headerShown: false,
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="diagnostics"
    //     options={{
    //       title: "Análisis",
    //       tabBarLabel: () => null,
    //       tabBarIcon: ({ focused }) => (
    //         <View style={[styles.centerWrapper, { marginTop: -30 }]}>
    //           <View style={[styles.centerButton, { borderColor: colors.card }]}>
    //             <LinearGradient
    //               colors={
    //                 focused
    //                   ? [
    //                       colors.primaryLight,
    //                       colors.primary,
    //                       colors.primaryDark ?? colors.primary,
    //                     ]
    //                   : [colors.primary, colors.primaryDark ?? "white"]
    //               }
    //               start={{ x: 0, y: 0 }}
    //               end={{ x: 1, y: 1 }}
    //               style={[StyleSheet.absoluteFillObject, { borderRadius: 14 }]}
    //             />

    //             <View style={styles.centerContent}>
    //               <CameraIcon color={colors.cardTextDark} />
    //               <Text
    //                 style={[
    //                   styles.tabLabel,
    //                   {
    //                     color: focused ? colors.text : colors.cardTextDark,
    //                   },
    //                 ]}
    //               >
    //                 Análisis
    //               </Text>
    //             </View>
    //           </View>
    //         </View>
    //       ),
    //       headerShown: false,
    //     }}
    //   />

    //   <Tabs.Screen
    //     name="benefits"
    //     options={{
    //       title: "Beneficios",
    //       tabBarIcon: ({ color }) => <GiftIcon color={color} />,
    //       headerShown: false,
    //     }}
    //   />

    //   <Tabs.Screen
    //     name="profile"
    //     options={{
    //       title: "Perfil",
    //       tabBarIcon: ({ color }) => <UserICon color={color} />,
    //       headerShown: false,
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="profile/support"
    //     options={{
    //       title: "Perfil",
    //       tabBarIcon: ({ color }) => <UserICon color={color} />,
    //       headerShown: false,
    //       tabBarStyle: { display: "none" },
    //     }}
    //   />
    // </Tabs>
    <NativeTabs
      iconColor="white"
      tintColor="white"
      backgroundColor={colors.card}
    >
      <NativeTabs.Trigger name="home">
        <Label>Inicio</Label>
        <Icon sf="house.fill" selectedColor="white" drawable="home_24px" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="dates">
        <Label>Citas</Label>
        <Icon
          sf="calendar"
          selectedColor="white"
          drawable="ic_calendar_month"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="diagnostics">
        <Label>Análisis</Label>
        <Icon
          sf="camera.fill"
          selectedColor="white"
          drawable="ic_photo_camera"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="benefits">
        <Label>Beneficios</Label>
        <Icon sf="gift.fill" selectedColor="white" drawable="ic_gift" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <Label>Perfil</Label>
        <Icon
          sf="person.fill"
          selectedColor="white"
          drawable="ic_account_circle"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

const styles = StyleSheet.create({
  centerWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 90,
  },

  centerButton: {
    width: "100%",
    height: 72,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 8,

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
      },
    }),
  },

  tabLabel: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.2,
    textAlign: "center",
  },

  centerContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    gap: 2,
  },
});
