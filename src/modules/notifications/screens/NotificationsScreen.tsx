import { BackButton } from "@/src/components/shared/BackButton";
import { Screen } from "@/src/components/shared/Screen";
import { ui } from "@/src/themes/ui";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NotificationsList } from "../components/NotificationsList";
import type { NotificationsResponse } from "../types/notifications.types";

interface NotificationsScreenProps {
  notifications: NotificationsResponse[];
  onNotificationPress: (notification: NotificationsResponse) => void;
  onRefresh: () => void;
  isLoading: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  notifications,
  onNotificationPress,
  onRefresh,
  isLoading,
  activeTab,
  onTabChange,
}) => {
  return (
    <Screen>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <BackButton />
        </View>

        <View style={styles.content}>
          <NotificationsList
            notifications={notifications}
            onNotificationPress={onNotificationPress}
            onRefresh={onRefresh}
            isLoading={isLoading}
          />
        </View>
      </SafeAreaView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    paddingVertical: ui.spacing.sm,
    minHeight: ui.tapTarget,
  },
  tabContainer: {
    paddingHorizontal: ui.spacing.lg,
    paddingVertical: ui.spacing.md,
  },
  content: {
    flex: 1,
  },
});

export default NotificationsScreen;
