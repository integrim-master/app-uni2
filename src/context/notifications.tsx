import React, { createContext, useContext, useEffect } from "react";
import { registerForPushNotificationsAsync } from "../utils/registerForPushNotifications";

// Tipos de notificación
export interface NotificationData {
  id: string;
  title: string;
  body: string;
  data?: any;
  receivedAt: Date;
}

// Contexto
interface NotificationsContextProps {
  notifications: NotificationData[];
}

export const NotificationsContext = createContext<NotificationsContextProps>({
  notifications: [],
});

export const useNotifications = () => useContext(NotificationsContext);

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    const register = async () => {
      await registerForPushNotificationsAsync();
    };
    const res = register();
    console.log(res);
  }, []);
  return (
    <NotificationsContext.Provider value={{ notifications: [] }}>
      {children}
    </NotificationsContext.Provider>
  );
};
