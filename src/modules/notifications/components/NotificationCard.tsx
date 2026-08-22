import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { ui } from "@/src/themes/ui";
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
        style={[
          styles.iconContainer,
          { backgroundColor: "rgba(209,213,219,0.1)" },
        ]}
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
          <ThemedText type="caption" tone="secondary">
            {formatRelativeDate(
              notification.sent_at
                ? new Date(notification.sent_at.replace(" ", "T"))
                : new Date(),
            )}
          </ThemedText>
        </View>

        <ThemedText type="body" tone="secondary" numberOfLines={2}>
          {notification.body}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: ui.spacing.lg,
    borderBottomWidth: ui.borders.width,
    minHeight: ui.tapTarget,
  },
  iconContainer: {
    width: ui.tapTarget,
    height: ui.tapTarget,
    borderRadius: ui.radii.md,
    justifyContent: "center",
    alignItems: "center",
    marginRight: ui.spacing.md,
    position: "relative",
    padding: ui.spacing.xs,
  },
  unreadBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: ui.spacing.md,
    height: ui.spacing.md,
    borderRadius: ui.radii.pill,
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
    marginBottom: ui.spacing.xs,
  },
  title: {
    flex: 1,
    marginRight: ui.spacing.sm,
  },
});
