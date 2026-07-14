import { useTheme } from "@/src/context/ThemeContext";
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
              <Skeleton width={80} height={18} radius={12} />
              <View style={{ marginTop: 8 }}>
                <Skeleton width="90%" height={20} radius={6} />
              </View>
              <View style={{ marginTop: 6 }}>
                <Skeleton width="60%" height={14} radius={6} />
              </View>

              <View style={styles.row}>
                <Skeleton width={80} height={14} radius={6} />
                <Skeleton width={60} height={16} radius={6} />
              </View>
            </View>
          </LinearGradient>
        </MotiView>
      ))}
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 8 },
  card: {
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    minHeight: 110,
  },
  content: {
    width: "100%",
  },
  row: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
