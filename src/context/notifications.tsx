import React, { createContext, useContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
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
  addNotification: (notification: NotificationData) => void;
  markAsRead: (id_notification: string, user_id: number) => void;
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
  const queryClient = useQueryClient();
  const [pushToken, setPushToken] = useState<string | null>(null);
  
  const { data: notifications = [], refetch, isFetching } = useNotificationsApi();
  const { mutate: markAsReadApi } = useMarkerReadNotifications();

  const queryKey = ["notifications"]; 

  const addNotification = (notification: NotificationData) => {
    queryClient.setQueryData(queryKey, (oldData: NotificationData[] | undefined) => {
      const exists = oldData?.some((notif) => notif.id === notification.id);
      if (exists) return oldData;
      return [notification, ...(oldData || [])];
    });
  };

  const markAsRead = (id_notification: string, user_id: number) => {
    const previousNotifications = queryClient.getQueryData<NotificationData[]>(queryKey);

    queryClient.setQueryData(queryKey, (oldData: NotificationData[] | undefined) => {
      return oldData?.map((notif) =>
        notif.id_notification === id_notification
          ? { ...notif, read_at: new Date().toISOString() }
          : notif
      );
    });

    markAsReadApi(
      { id_notification, user_id },
      {
        onError: (error) => {
          console.error("Error al marcar como leída:", error);
          queryClient.setQueryData(queryKey, previousNotifications);
        },
      }
    );
  };

  const markAllAsRead = () => {
    queryClient.setQueryData(queryKey, (oldData: NotificationData[] | undefined) => {
      return oldData?.map((notif) => ({
        ...notif,
        read_at: new Date().toISOString(),
      }));
    });
  };

  const clearNotifications = () => {
    queryClient.setQueryData(queryKey, []);
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