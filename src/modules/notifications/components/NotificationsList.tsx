import EmptySvgPush from "@/assets/svg/Push.svg";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Notification } from "../types/notifications.types";
import { NotificationCard } from "./NotificationCard";

interface NotificationsListProps {
  notifications: Notification[];
  onNotificationPress?: (notification: Notification) => void;
}

export const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
  onNotificationPress,
}) => {
  const { colors } = useTheme();

  if (notifications.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <EmptySvgPush width={280} height={280} style={styles.emptyImage} />
        <ThemedText
          type="subtitle"
          color={colors.primaryLight}
          style={styles.emptyTitle}
        >
          Sin notificaciones aún
        </ThemedText>
        <ThemedText color={colors.textSecondary} style={styles.emptyText}>
          Cuando recibas novedades, las verás en este espacio.
        </ThemedText>
      </View>
    );
  }

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <NotificationCard
          notification={item}
          onPress={() => onNotificationPress?.(item)}
        />
      )}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  emptyImage: {
    marginBottom: 24,
  },
  emptyTitle: {
    textAlign: "center",
    marginBottom: 8,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
  },
});
