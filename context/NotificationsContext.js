import React, { createContext, useContext, useState } from "react";

const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  const incrementNotifications = () => setUnreadCount(prev => prev + 1);
  const clearNotifications = () => setUnreadCount(0);

  return (
    <NotificationsContext.Provider
      value={{ unreadCount, setUnreadCount, incrementNotifications, clearNotifications }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
 
export const useNotifications = () => useContext(NotificationsContext);
