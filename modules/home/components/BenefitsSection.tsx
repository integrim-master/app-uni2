import TitleText from "@/components/shared/TitleText";
import { useTheme } from "@/context/ThemeContext";
import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Beneficios } from "./benefits";

interface BenefitsSectionProps {
  dark: string;
  light: string;
  colorFondo: string;
  benefits: any[];
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({
  dark,
  light,
  colorFondo,
  benefits,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.benefitsContent}>
      <View style={styles.sectionHeader}>
        <TitleText style={[styles.sectionTitleMain, { color: colors.text }]}>
          Tus Beneficios
        </TitleText>
        <Link asChild href={`/(tabs)/beneficios`}>
          <Pressable>
            {({ pressed }) => (
              <Text
                style={[
                  styles.seeAllLink,
                  {
                    color: colors.textSecondary,
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
                Ver todas
              </Text>
            )}
          </Pressable>
        </Link>
      </View>
      <Beneficios
        dark={dark}
        light={light}
        transparent={colorFondo}
        benefits={benefits}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  benefitsContent: {
    marginBottom: 24,
  },
  sectionHeader: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitleMain: {
    fontWeight: "600",
    fontSize: 18,
  },
  seeAllLink: {
    fontSize: 14,
    fontWeight: "500",
  },
});
