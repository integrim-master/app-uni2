import { useTheme } from "@/src/context/ThemeContext";
import { ui } from "@/src/themes/ui";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export const NotificationSkeleton: React.FC = () => {
  const { colors } = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={[styles.card, { borderBottomColor: colors.border }]}>
      <Animated.View
        style={[
          styles.iconContainer,
          { backgroundColor: colors.border, opacity },
        ]}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Animated.View
            style={[
              styles.titleSkeleton,
              { backgroundColor: colors.border, opacity },
            ]}
          />
          <Animated.View
            style={[
              styles.dateSkeleton,
              { backgroundColor: colors.border, opacity },
            ]}
          />
        </View>
        <Animated.View
          style={[
            styles.messageSkeleton,
            { backgroundColor: colors.border, opacity },
          ]}
        />
        <Animated.View
          style={[
            styles.messageSkeletonShort,
            { backgroundColor: colors.border, opacity },
          ]}
        />
      </View>
    </View>
  );
};

export const NotificationsSkeletonList: React.FC = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((key) => (
        <NotificationSkeleton key={key} />
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: ui.spacing.lg,
    borderBottomWidth: ui.borders.width,
  },
  iconContainer: {
    width: ui.tapTarget,
    height: ui.tapTarget,
    borderRadius: ui.radii.pill,
    marginRight: ui.spacing.md,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: ui.spacing.sm,
  },
  titleSkeleton: {
    height: ui.spacing.lg,
    width: "60%",
    borderRadius: ui.radii.sm,
  },
  dateSkeleton: {
    height: ui.spacing.md,
    width: 60,
    borderRadius: ui.radii.sm,
  },
  messageSkeleton: {
    height: ui.spacing.md,
    width: "90%",
    borderRadius: ui.radii.sm,
    marginBottom: ui.spacing.sm,
  },
  messageSkeletonShort: {
    height: ui.spacing.md,
    width: "70%",
    borderRadius: ui.radii.sm,
  },
});
