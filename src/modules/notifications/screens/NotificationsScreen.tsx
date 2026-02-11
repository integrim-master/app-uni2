import { BackButton } from "@/src/components/shared/BackButton";
import { Screen } from "@/src/components/shared/Screen";
import type { NotificationData } from "@/src/context/notifications";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NotificationsList } from "../components/NotificationsList";

interface NotificationsScreenProps {
  notifications: NotificationData[];
  onNotificationPress: (notification: NotificationData) => void;
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
          {/* <ThemedText type="title">Notificaciones</ThemedText>
          <View /> */}
        </View>

        {/* <View style={styles.tabContainer}>
          <TabBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            options={[
              { key: "all", label: "Todas" },
              { key: "unread", label: "No leídas" },
            ]}
          />
        </View> */}

        <View style={styles.content}>
          <NotificationsList
            notifications={notifications as any}
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",

    paddingVertical: 8,
  },
  tabContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  content: {
    flex: 1,
  },
});

export default NotificationsScreen;
