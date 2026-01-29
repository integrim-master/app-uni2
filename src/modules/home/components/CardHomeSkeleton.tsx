import { LinearGradient } from "expo-linear-gradient";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";

interface CardHomeSkeletonProps {
  isBlack: boolean;
}

export function CardHomeSkeleton({ isBlack }: CardHomeSkeletonProps) {
  const { colors } = useTheme();

  const skeletonColors = isBlack
    ? ["rgba(255,255,255,0.06)", "rgba(255,255,255,0.12)"]
    : ["rgba(0,0,0,0.08)", "rgba(0,0,0,0.14)"];

  return (
    <View style={{ shadowColor: colors.primaryLight, borderRadius: 24 }}>
      <View className="rounded-2xl overflow-hidden">
        <LinearGradient
          colors={colors.membershipGoldGradient as any}
          style={{ padding: 20, gap: 16 }}
        >
          <View className="flex-row justify-between items-center">
            <Skeleton
              width={80}
              height={22}
              radius={8}
              colors={skeletonColors}
            />
            <Skeleton
              width={140}
              height={28}
              radius={8}
              colors={skeletonColors}
            />
          </View>

          <Skeleton
            width={140}
            height={14}
            radius={6}
            colors={skeletonColors}
          />

          <View className="gap-2">
            <View className="flex-row justify-between">
              <Skeleton
                width={160}
                height={14}
                radius={6}
                colors={skeletonColors}
              />
              <Skeleton
                width={50}
                height={14}
                radius={6}
                colors={skeletonColors}
              />
            </View>

            <Skeleton
              width="100%"
              height={6}
              radius={999}
              colors={skeletonColors}
            />
          </View>
        </LinearGradient>

        <View
          style={{
            backgroundColor: colors.primaryLight,
            padding: 12,
            alignItems: "center",
          }}
        >
          <Skeleton
            width={220}
            height={14}
            radius={6}
            colors={skeletonColors}
          />
        </View>
      </View>
    </View>
  );
}
