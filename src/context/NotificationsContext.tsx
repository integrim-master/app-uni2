import React, { createContext, ReactNode, useContext, useState } from 'react';

interface NotificationsContextType {
  unreadCount: number;
  notifications: Notification[];
  markAsRead: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  timestamp: Date;
}

interface NotificationsProviderProps {
  children: ReactNode;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export function NotificationsProvider({ children }: NotificationsProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const addNotification = (notificationData: Omit<Notification, 'id'>) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  return (
    <NotificationsContext.Provider
      value={{
        unreadCount,
        notifications,
        markAsRead,
        addNotification,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications(): NotificationsContextType {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    return {
      unreadCount: 0,
      notifications: [],
      markAsRead: () => {},
      addNotification: () => {},
    };
  }
  return context;
}

export type { Notification, NotificationsContextType };

