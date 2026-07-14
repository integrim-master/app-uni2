import { useTheme } from "@/src/context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function UpcomingAppointmentsSkeleton() {
  const { colors } = useTheme();
  const placeholders = [0, 1, 2];

  return (
    <MotiView
      from={{ opacity: 0, translateY: 8 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 400 }}
      style={styles.wrapper}
    >
      {placeholders.map((i) => (
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
            <View style={styles.cardContent}>
              <Skeleton width={84} height={28} radius={16} />
              <View style={{ marginTop: 8 }}>
                <Skeleton width={160} height={16} radius={8} />
              </View>
              <View style={{ marginTop: 8 }}>
                <Skeleton width={120} height={12} radius={8} />
              </View>
            </View>
          </LinearGradient>
        </MotiView>
      ))}
    </MotiView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 8,
    paddingTop: 20,
    paddingLeft: 16,
    flexDirection: "row",
  },
  card: {
    marginRight: 12,
    borderRadius: 16,
    padding: 12,

    borderWidth: 1,
    width: 260,
    height: 130,
  },
  cardContent: { width: "100%" },
});
