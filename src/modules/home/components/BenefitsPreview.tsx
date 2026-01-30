import PrimaryButton from "@/src/components/shared/PrimaryButton";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import BenefitsListSkeleton from "@/src/modules/benefits/components/BenefitsListSkeleton";
import type { Benefits } from "@/src/types/shared/Benefits.type";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import React from "react";
import { View } from "react-native";

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
      className="w-full mt-10 mb-4 rounded-2xl overflow-hidden"
    >
      <LinearGradient
        colors={colors.gradientCard as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          padding: 16,
          gap: 10,
        }}
      >
        <View className="flex-row items-center justify-between">
          <ThemedText
            type="subtitle"
            color={colors.textDark}
            className="font-bold mb-4"
          >
            Tus beneficios
          </ThemedText>
          <ThemedText type="caption" color={colors.textSecondary}>
            {totalRemaining} disponibles
          </ThemedText>
        </View>

        {isEmpty ? (
          <View
            className="rounded-xl p-3"
            style={{
              backgroundColor: colors.backgroundSecondary,
              borderWidth: 1,
              borderColor: "rgba(226, 177, 85, 0.18)",
            }}
          >
            <ThemedText type="body" color={colors.text}>
              No tienes beneficios disponibles ahora mismo.
            </ThemedText>
          </View>
        ) : (
          <View style={{ gap: 10 }}>
            {items.map((b) => (
              <View
                key={String(b.id)}
                className="rounded-xl p-3"
                style={{
                  backgroundColor: colors.backgroundSecondary,
                  borderWidth: 1,
                  borderColor: "rgba(226, 177, 85, 0.18)",
                }}
              >
                <ThemedText
                  type="semiBold"
                  numberOfLines={1}
                  style={{ color: colors.text }}
                >
                  {b.title}
                </ThemedText>
                <ThemedText type="caption" color={colors.textSecondary}>
                  Te quedan {b.remaining}
                </ThemedText>
              </View>
            ))}
          </View>
        )}

        <PrimaryButton
          variant="secondary"
          title="Ver todos mis beneficios"
          onPress={onPressAll}
          size="md"
          style={{ marginTop: 6 }}
        />
      </LinearGradient>
    </MotiView>
  );
}
