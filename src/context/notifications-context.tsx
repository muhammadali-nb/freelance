"use client";

import { createContext, useContext, useState } from "react";

interface NotificationsContextType {
  unreadCount: number;
  markAsRead: () => void;
}

const NotificationsContext = createContext<NotificationsContextType>({
  unreadCount: 0,
  markAsRead: () => {},
});

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [unreadCount, setUnreadCount] = useState(0);

  const markAsRead = () => {
    setUnreadCount(0);
  };

  return (
    <NotificationsContext.Provider value={{ unreadCount, markAsRead }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationsContext); 