import { Skeleton } from "moti/skeleton";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";

export function ProfileSkeleton() {
  const { colors } = useTheme();

  const skeletonColors = ["rgba(0,0,0,0.06)", "rgba(0,0,0,0.12)"];

  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 18 }}>
      <View style={styles.headerContainer}>
        <Skeleton
          width={120}
          height={120}
          radius={999}
          colors={skeletonColors}
        />

        <View style={{ height: 12 }} />

        <Skeleton width={180} height={24} radius={8} colors={skeletonColors} />
        <View style={{ height: 8 }} />
        <Skeleton width={140} height={14} radius={6} colors={skeletonColors} />

        <View style={{ height: 12 }} />
        <Skeleton width={140} height={40} radius={10} colors={skeletonColors} />
      </View>

      <View style={{ marginTop: 18 }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <View key={i} style={styles.section}>
            <Skeleton
              width={160}
              height={18}
              radius={8}
              colors={skeletonColors}
            />

            <View style={{ height: 12 }} />

            {Array.from({ length: 3 }).map((__, j) => (
              <View key={j} style={styles.row}>
                <Skeleton
                  width={40}
                  height={40}
                  radius={8}
                  colors={skeletonColors}
                />
                <View style={{ width: 12 }} />
                <View style={{ flex: 1 }}>
                  <Skeleton
                    width="70%"
                    height={14}
                    radius={6}
                    colors={skeletonColors}
                  />
                  <View style={{ height: 8 }} />
                  <Skeleton
                    width="40%"
                    height={12}
                    radius={6}
                    colors={skeletonColors}
                  />
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    marginBottom: 8,
  },

  section: {
    marginBottom: 18,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
});
