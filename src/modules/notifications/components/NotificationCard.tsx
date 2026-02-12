import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { formatRelativeDate } from "@/src/utils/dateUtils";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { NotificationsResponse } from "../types/notifications.types";

interface NotificationCardProps {
  notification: NotificationsResponse;
  onPress?: () => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onPress,
}) => {
  const { colors } = useTheme();

  const getIconName = (type?: string): keyof typeof MaterialIcons.glyphMap => {
    switch (type) {
      case "sadpe":
        return "lock-clock";
      case "message":
        return "message";
      case "success":
        return "check-circle";
      case "warning":
        return "warning";
      default:
        return "notifications";
    }
  };

  const getIconColor = (type?: string): string => {
    switch (type) {
      case "sadpe":
        return colors.primaryLight;
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
          opacity: notification.read_at ? 0.7 : 1,
          borderBottomColor: colors.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={styles.iconContainer}
        className="rounded-md bg-gray-300/10 p-1"
      >
        <MaterialIcons
          name={getIconName(notification.type_notification)}
          size={28}
          color={getIconColor(notification.type_notification)}
        />
        {!notification.read_at && (
          <View
            style={[styles.unreadBadge, { backgroundColor: colors.primary }]}
          />
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <ThemedText type="semiBold" style={styles.title} numberOfLines={1}>
            {notification.title}
          </ThemedText>
          <ThemedText type="caption" color={colors.textSecondary}>
            {formatRelativeDate(
              notification.sent_at
                ? new Date(notification.sent_at.replace(" ", "T"))
                : new Date(),
            )}
          </ThemedText>
        </View>

        <ThemedText
          type="body"
          color={colors.textSecondary}
          numberOfLines={2}
          style={styles.message}
        >
          {notification.body}
        </ThemedText>
      </View>
    </TouchableOpacity>
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
