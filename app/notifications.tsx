import { useAuth } from "@/src/context/AuthContext";
import type { NotificationData } from "@/src/context/notifications";
import { useNotifications } from "@/src/context/notifications";
import NotificationsScreen from "@/src/modules/notifications/screens/NotificationsScreen";
import React, { useState } from "react";

export default function Notifications() {
  const { notifications, markAsRead, refetch, isFetching } = useNotifications();
  const [activeTab, setActiveTab] = useState<string>("all");
  const { user } = useAuth();

  const filteredNotifications =
    activeTab === "unread"
      ? notifications.filter((n) => !n.read_at)
      : notifications;

  const handleNotificationPress = (notification: NotificationData) => {
    markAsRead(notification.id_notification!, Number(user?.user_id));
  };

  return (
    <NotificationsScreen
      notifications={filteredNotifications}
      onNotificationPress={handleNotificationPress}
      onRefresh={refetch}
      isLoading={isFetching}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    />
  );
}
