import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "../../../context/ThemeContext";
import { BenefitsSection } from "../components/BenefitsSection";
import { CardHome } from "../components/CardHome";
import HeaderSection from "../components/HeaderSection";
import { PromotionsCarousel } from "../components/PromotionsCarousel";
import type { HomeScreenProps } from "../types/home.types";

const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  mebershipName,
  benefits,
}) => {
  const { colors } = useTheme();


  return (
    <ScrollView style={styles.safeArea}>
      <HeaderSection fullName={user?.user_name  || 'Usuario' } />

      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        <CardHome name={mebershipName} benefits={benefits} />
      </View>
      <PromotionsCarousel />

      <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
        <BenefitsSection benefits={benefits} />
      </View>
    </ScrollView>
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
