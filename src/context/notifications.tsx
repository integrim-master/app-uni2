import React, { createContext, useContext, useEffect, useState } from "react";
import { useMarkerReadNotifications } from "../modules/notifications/hooks/useMarkerNotifications";
import { useNotificationsApi } from "../modules/notifications/hooks/useNotifications";

export interface NotificationData {
  id: string;
  user_id?: string;
  type_notification?: string;
  id_notification?: string;
  title: string;
  body?: string;
  receivedAt?: Date;
  status?: string;
  sent_at?: string;
  read_at?: string | null;
}

interface NotificationsContextProps {
  notifications: NotificationData[];
  addNotification: (notification: Omit<NotificationData, "read">) => void;
  markAsRead: (id: string, user_id: number) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  unreadCount: number;
  pushToken: string | null;
  setPushToken: (token: string) => void;
  refetch: () => void;
  isFetching: boolean;
}

export const NotificationsContext = createContext<NotificationsContextProps>({
  notifications: [],
  addNotification: () => {},
  markAsRead: () => {},
  markAllAsRead: () => {},
  clearNotifications: () => {},
  unreadCount: 0,
  pushToken: null,
  setPushToken: () => {},
  refetch: () => {},
  isFetching: false,
});

export const useNotifications = () => useContext(NotificationsContext);

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [pushToken, setPushToken] = useState<string | null>(null);
  const { data, refetch, isFetching } = useNotificationsApi();
  const { mutate: markAsReadApi } = useMarkerReadNotifications();

  console.log("Fetched notifications from API:", data);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setNotifications(data);
    }
  }, [data]);

  const addNotification = (notification: NotificationData) => {
    setNotifications((prev) => {
      const exists = prev.some((notif) => notif.id === notification.id);
      if (exists) {
        console.log("Notification already exists, skipping:", notification.id);
        return prev;
      }
      return [notification, ...prev];
    });
  };

  const markAsRead = (id: string, user_id: number) => {
    const data = {
      id_notification: id,
      user_id: Number(user_id),
    };
    try {
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id
            ? { ...notif, read_at: new Date().toISOString() }
            : notif,
        ),
      );
      markAsReadApi(data, {
        onSuccess: () => {
          console.log("Notification marked as read successfully:", id);
        },
      });
    } catch (error) {
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, read_at: null } : notif,
        ),
      );
      throw new Error("Error marking notification as read: " + error);
    }
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read_at: new Date().toISOString() })),
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.read_at).length;

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
        unreadCount,
        pushToken,
        setPushToken,
        refetch,
        isFetching,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
