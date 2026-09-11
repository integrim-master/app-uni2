import { useTheme } from "@/src/context/ThemeContext";
import { ui } from "@/src/themes/ui";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function UpcomingAppointmentsSkeleton() {
  const { colors } = useTheme();

  return (
    <MotiView
      from={{ opacity: 0, translateY: 8 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 400 }}
      style={styles.wrapper}
    >
      <MotiView
        from={{ opacity: 0, translateY: 12 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 400 }}
      >
        <LinearGradient
          colors={[colors.gradientCard[0], colors.gradientCard[1]]}
          start={{ x: 0.1, y: 2.5 }}
          end={{ x: 0.9, y: 0.9 }}
          style={[styles.card, { borderColor: colors.border || "#e5e5e5" }]}
        >
          <View style={styles.cardContent}>
            <Skeleton width={56} height={56} radius={ui.radii.md} />
            <View style={styles.body}>
              <Skeleton width={160} height={16} radius={ui.radii.sm} />
              <Skeleton width={120} height={12} radius={ui.radii.sm} />
            </View>
          </View>
        </LinearGradient>
      </MotiView>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: ui.spacing.xl,
  },
  card: {
    borderRadius: ui.radii.lg,
    padding: ui.spacing.lg,
    borderWidth: ui.borders.width,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: ui.spacing.md,
  },
  body: {
    flex: 1,
    gap: ui.spacing.sm,
  },
});
