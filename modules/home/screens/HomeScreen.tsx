import SubtitleText from "@/components/shared/SubtitleText";
import { useTheme } from "@/context/ThemeContext";

import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BenefitsSection } from "../components/BenefitsSection";
import HeaderSection from "../components/HeaderSection";
import { PromotionsCarousel } from "../components/PromotionsCarousel";
import TabBar from "../components/TabBar";
import { TabContent } from "../components/TabContent";
import type { HomeScreenProps } from "../types/home.types";

const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  fullName,
  dark,
  light,
  colorFondo,
  dataButtons,
  citas,
  benefits,
}) => {
  const { colors } = useTheme();

  const TAB_OPTIONS = [
    { key: "first", label: "Accesos" },
    { key: "second", label: "Citas" },
  ];
  const [activeTab, setActiveTab] = React.useState<string>(TAB_OPTIONS[0].key);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.backgroundSecondary }]}
    >
      <HeaderSection fullName={fullName} />

      <View
        style={[styles.tabSection, { paddingHorizontal: 16, marginTop: 16 }]}
      >
        <SubtitleText style={[styles.sectionTitle, { color: colors.text }]}>
          ¿Qué deseas hacer hoy?
        </SubtitleText>

        <TabBar
          options={TAB_OPTIONS}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </View>

      <TabContent activeTab={activeTab} dataButtons={dataButtons} />

      <View
        style={[
          styles.benefitsSection,
          { },
        ]}
      >
        <Stack.Screen options={{ headerShown: false }} />

        <BenefitsSection
          dark={dark}
          light={light}
          colorFondo={colorFondo}
          benefits={benefits}
        />

        <PromotionsCarousel />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },

  tabSection: {
    display: "flex",
    alignItems: "center",
  },

  sectionTitle: {
    marginBottom: 20,
    marginTop: 10,
    alignSelf: "flex-start",
    fontWeight: "600",
  },

  benefitsSection: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 16,
  },
});

export default HomeScreen;
