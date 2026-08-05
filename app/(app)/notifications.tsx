import { useNotifications } from "@/src/context/notifications";
import NotificationsScreen from "@/src/modules/notifications/screens/NotificationsScreen";
import type { NotificationsResponse } from "@/src/modules/notifications/types/notifications.types";
import { useUser } from "@/src/modules/user/hooks/useUser";
import React, { useState } from "react";

export default function Notifications() {
  const { notifications, markAsRead, refetch, isLoading } = useNotifications();
  const [activeTab, setActiveTab] = useState<string>("all");
  const { data: user } = useUser();

  const filteredNotifications =
    activeTab === "unread"
      ? notifications.filter((n) => !n.read_at)
      : notifications;

  const handleNotificationPress = (notification: NotificationsResponse) => {
    markAsRead(notification.id_notification!, Number(user?.user_id));
  };

  return (
    <NotificationsScreen
      notifications={filteredNotifications}
      onNotificationPress={handleNotificationPress}
      onRefresh={refetch}
      isLoading={isLoading}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    />
  );
}
