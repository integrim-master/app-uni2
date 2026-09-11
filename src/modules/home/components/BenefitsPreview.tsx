import PrimaryButton from "@/src/components/shared/PrimaryButton";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import BenefitsListSkeleton from "@/src/modules/benefits/components/BenefitsListSkeleton";
import { ui } from "@/src/themes/ui";
import type { Benefits } from "@/src/types/shared/Benefits.type";
import { MotiView } from "moti";
import React from "react";
import { StyleSheet, View } from "react-native";

interface BenefitsPreviewProps {
  benefits: Benefits[];
  onPressAll: () => void;
  maxItems?: number;
  isLoading?: boolean;
}

export default function BenefitsPreview({
  benefits,
  onPressAll,
  maxItems = 2,
  isLoading = false,
}: BenefitsPreviewProps) {
  const { colors } = useTheme();

  if (isLoading) {
    return <BenefitsListSkeleton />;
  }

  const safeBenefits = Array.isArray(benefits) ? benefits : [];
  const totalRemaining = safeBenefits.reduce(
    (acc, b) => acc + (Number(b.remaining) || 0),
    0,
  );
  const items = safeBenefits
    .filter((b) => (Number(b.remaining) || 0) > 0)
    .slice(0, maxItems);

  const isEmpty = totalRemaining <= 0;

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "timing", duration: 600 }}
      style={styles.section}
    >
      {isEmpty ? (
        <View
          style={[
            styles.emptyCard,
            {
              backgroundColor: colors.backgroundSecondary,
              borderColor: "rgba(226, 177, 85, 0.18)",
            },
          ]}
        >
          <ThemedText type="body">
            No tienes beneficios disponibles ahora mismo.
          </ThemedText>
        </View>
      ) : (
        <View className="flex-col gap-4">
          <ThemedText type="subtitle" tone="accent">
            Beneficios disponibles
          </ThemedText>
          {items.map((b) => (
            <View
              key={String(b.id)}
              style={[
                styles.itemCard,
                { backgroundColor: colors.backgroundSurface },
              ]}
            >
              <ThemedText type="semiBold" numberOfLines={1}>
                {b.title}
              </ThemedText>
              <ThemedText type="caption" tone="secondary">
                Te quedan {b.remaining}
              </ThemedText>
            </View>
          ))}
        </View>
      )}

      <PrimaryButton
        variant="primary"
        title="Ver todos mis beneficios"
        onPress={onPressAll}
        size="sm"
      />
    </MotiView>
  );
}

const styles = StyleSheet.create({
  section: {
    width: "100%",
    marginTop: ui.spacing.xl,
    gap: ui.spacing.lg,
  },
  list: {
    width: "100%",
    gap: ui.spacing.sm,
  },
  itemCard: {
    borderRadius: ui.radii.md,
    padding: ui.spacing.md,
    gap: ui.spacing.sm,
  },
  emptyCard: {
    borderRadius: ui.radii.md,
    padding: ui.spacing.md,
    borderWidth: ui.borders.width,
  },
});
