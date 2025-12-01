import * as Notifications from "expo-notifications";
import { useNotifications } from "../context/NotificationsContext";
import { useEffect } from "react";

export function useNotificationListener() {
  const { incrementNotifications } = useNotifications();

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(() => {
      incrementNotifications();
    });

    return () => subscription.remove();
  }, []);
}
