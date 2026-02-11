import { useTheme } from "@/src/context/ThemeContext";
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
    padding: 16,
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  titleSkeleton: {
    height: 16,
    width: "60%",
    borderRadius: 4,
  },
  dateSkeleton: {
    height: 12,
    width: 60,
    borderRadius: 4,
  },
  messageSkeleton: {
    height: 14,
    width: "90%",
    borderRadius: 4,
    marginBottom: 6,
  },
  messageSkeletonShort: {
    height: 14,
    width: "70%",
    borderRadius: 4,
  },
});
