import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Notification } from "../types/notifications.types";

interface NotificationCardProps {
  notification: Notification;
  onPress?: () => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onPress,
}) => {
  const { colors } = useTheme();

  const getIconName = (type: string): keyof typeof MaterialIcons.glyphMap => {
    switch (type) {
      case "appointment":
        return "event";
      case "promotion":
        return "local-offer";
      case "success":
        return "check-circle";
      case "warning":
        return "warning";
      default:
        return "notifications";
    }
  };

  const getIconColor = (type: string): string => {
    switch (type) {
      case "appointment":
        return colors.primary;
      case "promotion":
        return colors.secondary;
      case "success":
        return colors.success;
      case "warning":
        return colors.warning;
      default:
        return colors.primaryLight;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: notification.read ? 0.7 : 1,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <MaterialIcons
          name={getIconName(notification.type)}
          size={28}
          color={getIconColor(notification.type)}
        />
        {!notification.read && (
          <View
            style={[styles.unreadBadge, { backgroundColor: colors.primary }]}
          />
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <ThemedText
            type="semiBold"
            style={styles.title}
            numberOfLines={1}
          >
            {notification.title}
          </ThemedText>
          <ThemedText type="caption" color={colors.textSecondary}>
            {notification.date}
          </ThemedText>
        </View>

        <ThemedText
          type="body"
          color={colors.textSecondary}
          numberOfLines={2}
          style={styles.message}
        >
          {notification.message}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    position: "relative",
  },
  unreadBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "white",
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    flex: 1,
    marginRight: 8,
  },
  message: {
    lineHeight: 20,
  },
});
