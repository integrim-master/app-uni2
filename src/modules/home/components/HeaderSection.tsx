import Badge from "@/src/components/shared/Badge";
import ThemedText from "@/src/components/shared/themed-text";
import { ui } from "@/src/themes/ui";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";

type HeaderSectionProps = {
  fullName: string;
};

const HeaderSection: React.FC<HeaderSectionProps> = ({ fullName }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.header}>
      <View style={styles.greeting}>
        <ThemedText type="title">
          Hola,{" "}
          <ThemedText type="title" color={colors.primaryLight}>
            {fullName}
          </ThemedText>
        </ThemedText>
        <ThemedText type="body" tone="secondary">
          Tu bienestar es nuestra prioridad
        </ThemedText>
      </View>
      <Link href="/blog">
        <Badge
          variant="white"
          text="Blog"
          size="small"
          icon="book"
          style={styles.badge}
        />
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: ui.spacing.lg,
    marginBottom: ui.spacing.md,
    gap: ui.spacing.md,
  },
  greeting: {
    gap: ui.spacing.sm,
  },
  badge: {
    borderRadius: ui.radii.pill,
    paddingHorizontal: ui.spacing.sm,
  },
});

export default HeaderSection;
