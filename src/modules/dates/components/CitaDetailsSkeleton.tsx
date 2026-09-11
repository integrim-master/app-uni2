import { useTheme } from "@/src/context/ThemeContext";
import { ui } from "@/src/themes/ui";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function CitaDetailsSkeleton() {
  const { colors } = useTheme();

  return (
    <MotiView
      from={{ opacity: 0, translateY: 8 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 400 }}
      style={styles.container}
    >
      <View style={styles.hero}>
        <View style={styles.heroText}>
          <Skeleton width={120} height={14} radius={ui.radii.sm} />
          <Skeleton width="80%" height={22} radius={ui.radii.sm} />
        </View>
        <View
          style={[
            styles.datePill,
            {
              backgroundColor: colors.primaryLight + "22",
              borderColor: colors.primaryLight + "55",
            },
          ]}
        >
          <Skeleton width={100} height={16} radius={ui.radii.sm} />
          <Skeleton width={72} height={16} radius={ui.radii.sm} />
        </View>
      </View>

      <LinearGradient
        colors={[colors.gradientCard[0], colors.gradientCard[1]]}
        start={{ x: 0.1, y: 2.5 }}
        end={{ x: 0.9, y: 0.9 }}
        style={[styles.card, { borderColor: colors.border || "#e5e5e5" }]}
      >
        {[1, 2, 3].map((i) => (
          <View key={i} style={styles.infoRow}>
            <Skeleton
              width={ui.tapTarget}
              height={ui.tapTarget}
              radius={ui.radii.md}
            />
            <View style={styles.infoCopy}>
              <Skeleton width={80} height={12} radius={ui.radii.sm} />
              <Skeleton width={140} height={16} radius={ui.radii.sm} />
            </View>
          </View>
        ))}
      </LinearGradient>

      <View style={styles.recommendations}>
        <Skeleton width={160} height={18} radius={ui.radii.sm} />
        <LinearGradient
          colors={[colors.gradientCard[0], colors.gradientCard[1]]}
          start={{ x: 0.1, y: 2.5 }}
          end={{ x: 0.9, y: 0.9 }}
          style={[styles.card, { borderColor: colors.border || "#e5e5e5" }]}
        >
          {[1, 2, 3].map((i) => (
            <View key={i} style={styles.recoRow}>
              <Skeleton width={22} height={22} radius={ui.radii.pill} />
              <View style={styles.recoCopy}>
                <Skeleton width="100%" height={14} radius={ui.radii.sm} />
                <Skeleton width="75%" height={14} radius={ui.radii.sm} />
              </View>
            </View>
          ))}
        </LinearGradient>
      </View>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: ui.spacing.xxl,
  },
  hero: {
    gap: ui.spacing.xl,
  },
  heroText: {
    gap: ui.spacing.sm,
  },
  datePill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: ui.radii.lg,
    borderWidth: ui.borders.width,
    paddingHorizontal: ui.spacing.lg,
    paddingVertical: ui.spacing.md,
    minHeight: ui.tapTarget,
  },
  card: {
    borderRadius: ui.radii.xl,
    padding: ui.spacing.lg,
    borderWidth: ui.borders.width,
    gap: ui.spacing.md,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: ui.spacing.md,
    paddingVertical: ui.spacing.md,
  },
  infoCopy: {
    flex: 1,
    gap: ui.spacing.xs,
  },
  recommendations: {
    gap: ui.spacing.lg,
  },
  recoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: ui.spacing.md,
    paddingVertical: ui.spacing.md,
  },
  recoCopy: {
    flex: 1,
    gap: ui.spacing.sm,
  },
});
