import { useTheme } from "@/src/context/ThemeContext";
import { ui } from "@/src/themes/ui";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function CitaCardSkeleton() {
  const { colors } = useTheme();

  return (
    <MotiView
      from={{ opacity: 0, translateY: 8 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 400 }}
      style={styles.container}
    >
      {[1, 2, 3].map((i) => (
        <MotiView
          key={i}
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400, delay: i * 80 }}
        >
          <LinearGradient
            colors={[colors.gradientCard[0], colors.gradientCard[1]]}
            start={{ x: 0.1, y: 2.5 }}
            end={{ x: 0.9, y: 0.9 }}
            style={[styles.card, { borderColor: colors.border || "#e5e5e5" }]}
          >
            <View style={styles.content}>
              <View style={styles.header}>
                <View style={styles.titleColumn}>
                  <Skeleton width="90%" height={20} radius={ui.radii.sm} />
                  <Skeleton width="60%" height={14} radius={ui.radii.sm} />
                </View>
                <Skeleton width={80} height={18} radius={ui.radii.md} />
              </View>

              <View style={styles.footer}>
                <Skeleton width={80} height={14} radius={ui.radii.sm} />
                <Skeleton width={60} height={14} radius={ui.radii.sm} />
              </View>
            </View>
          </LinearGradient>
        </MotiView>
      ))}
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: ui.spacing.md,
  },
  card: {
    borderRadius: ui.radii.xl,
    padding: ui.spacing.xl,
    borderWidth: ui.borders.width,
  },
  content: {
    width: "100%",
    gap: ui.spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: ui.spacing.md,
  },
  titleColumn: {
    flex: 1,
    gap: ui.spacing.sm,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: ui.spacing.md,
  },
});
