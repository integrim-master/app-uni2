import ThemedText from "@/src/components/shared/themed-text";
import { Benefits } from "@/src/types/shared/Benefits.type";
import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { Beneficios } from "./benefits";

interface BenefitsSectionProps {
  benefits: Benefits[];
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({
  benefits,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.benefitsContent}>
      <View style={styles.sectionHeader}>
        <ThemedText style={[styles.sectionTitleMain, { color: colors.text }]}>
          Tratamientos sugeridos
        </ThemedText>
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
