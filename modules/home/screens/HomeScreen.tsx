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
    { key: "second", label: "Informacion" },
  ];
  const [activeTab, setActiveTab] = React.useState<string>(TAB_OPTIONS[0].key);

  const cardHomeData = {
    membresia: 'Gold',
    dark: dark,
    light: light,
    amountBenefits: 10,
    countBenefits: 4,
    nombre: fullName,
  };

  return (
      <ScrollView style={styles.safeArea}>
        <HeaderSection fullName={fullName} />

        <View style={{ paddingHorizontal: 16 , marginBottom:16 }}>
          <CardHome {...cardHomeData} />
        </View>
         <PromotionsCarousel />

        <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
          <BenefitsSection
            dark={dark}
            light={light}
            colorFondo={colorFondo}
            benefits={benefits}
          />

         
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
