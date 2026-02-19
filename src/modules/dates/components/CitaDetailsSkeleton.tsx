import { useTheme } from "@/src/context/ThemeContext";
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
      <LinearGradient
        colors={[colors.gradientCardStart, colors.gradientCardEnd]}
        start={{ x: 0.1, y: 2.5 }}
        end={{ x: 0.9, y: 0.9 }}
        style={[styles.card, { borderColor: colors.border || "#e5e5e5" }]}
      >
        <View style={styles.content}>
          <Skeleton width={120} height={22} radius={12} />
          <View style={{ marginTop: 12 }}>
            <Skeleton width={180} height={18} radius={6} />
          </View>
          <View style={{ marginTop: 8 }}>
            <Skeleton width={120} height={14} radius={6} />
          </View>
          <View style={{ marginTop: 16 }}>
            <Skeleton width={100} height={16} radius={8} />
          </View>
          <View style={{ marginTop: 8 }}>
            <Skeleton width={80} height={14} radius={6} />
          </View>
        </View>
      </LinearGradient>
      <View style={styles.userCard}>
        <Skeleton width={44} height={44} radius={22} />
        <View style={{ marginLeft: 12 }}>
          <Skeleton width={80} height={14} radius={6} />
          <View style={{ marginTop: 6 }}>
            <Skeleton width={120} height={16} radius={6} />
          </View>
        </View>
      </View>
      <View style={styles.recommendations}>
        <Skeleton width={140} height={18} radius={8} />
        <View style={{ marginTop: 8 }}>
          <Skeleton width={220} height={14} radius={6} />
          <View style={{ marginTop: 4 }}>
            <Skeleton width={180} height={14} radius={6} />
          </View>
        </View>
      </View>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 8 },
  card: {
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    minHeight: 140,
  },
  content: {
    width: "100%",
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    marginLeft: 12,
  },
  recommendations: {
    marginTop: 32,
    marginLeft: 12,
  },
});
