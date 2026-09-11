import { ui } from "@/src/themes/ui";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";

export default function BenefitsListSkeleton() {
  const { colors } = useTheme();

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 90 }}
      style={styles.container}
    >
      {[1, 2, 3, 4].map((item, index) => (
        <MotiView
          key={item}
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: "timing",
            duration: 400,
            delay: index * 100,
          }}
        >
          <LinearGradient
            colors={[colors.gradientCard[0], colors.gradientCard[1]]}
            start={{ x: 0.1, y: 2.5 }}
            end={{ x: 0.9, y: 0.9 }}
            style={[
              styles.card,
              {
                shadowColor: colors.shadow || "#000",
                borderColor: colors.gradientCard[0] || "#ddd",
              },
            ]}
          >
            <View style={styles.topSection}>
              <View style={styles.titleColumn}>
                <Skeleton width="85%" height={22} radius={ui.radii.sm} />
                <Skeleton width="95%" height={16} radius={ui.radii.sm} />
                <Skeleton width="70%" height={16} radius={ui.radii.sm} />
              </View>
            </View>

            <View style={styles.infoPills}>
              <Skeleton width={85} height={32} radius={ui.radii.lg} />
              <Skeleton width={110} height={32} radius={ui.radii.lg} />
            </View>

            <View
              style={[
                styles.divider,
                { borderColor: colors.border || "#E5E5E5" },
              ]}
            />

            <View style={styles.ctaColumn}>
              <Skeleton width="100%" height={40} radius={ui.radii.md} />
              <Skeleton width="100%" height={40} radius={ui.radii.md} />
            </View>
          </LinearGradient>
        </MotiView>
      ))}
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: ui.spacing.lg,
    gap: ui.spacing.lg,
  },
  card: {
    borderRadius: ui.radii.xl,
    padding: ui.spacing.xl,
    borderWidth: ui.borders.width,
  },
  topSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: ui.spacing.md,
    gap: ui.spacing.md,
  },
  titleColumn: {
    flex: 1,
    justifyContent: "center",
    gap: ui.spacing.sm,
  },
  infoPills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: ui.spacing.sm,
  },
  divider: {
    marginVertical: ui.spacing.lg,
    borderTopWidth: ui.borders.width,
    borderStyle: "dashed",
    opacity: 0.35,
  },
  ctaColumn: {
    gap: ui.spacing.md,
  },
});
