import EmptySvgPush from "@/assets/svg/Push.svg";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import React, { useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { NotificationsResponse } from "../types/notifications.types";
import { NotificationCard } from "./NotificationCard";
import { NotificationsSkeletonList } from "./NotificationSkeleton";

interface NotificationsListProps {
  notifications: NotificationsResponse[];
  onNotificationPress?: (notification: NotificationsResponse) => void;
  onRefresh?: () => void;
  isLoading?: boolean;
}

export const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
  onNotificationPress,
  onRefresh,
  isLoading = false,
}) => {
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (onRefresh) {
      setRefreshing(true);
      await onRefresh();
      setRefreshing(false);
    }
  };

  if (isLoading && notifications.length === 0) {
    return (
      <View style={styles.skeletonContainer}>
        <NotificationsSkeletonList />
      </View>
    );
  }

  const renderEmptyState = () => (
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
      ListEmptyComponent={renderEmptyState}
      contentContainerStyle={[styles.listContainer, true && { flex: 1 }]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={[colors.primary, colors.primaryLight]}
          tintColor={colors.primary}
          progressBackgroundColor={colors.background}
          titleColor={colors.text}
          title="Actualizando..."
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 8,
  },
  skeletonContainer: {
    flex: 1,
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
