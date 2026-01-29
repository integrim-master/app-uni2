export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'appointment' | 'promotion';
  icon?: string;
}

export interface NotificationsScreenProps {
  notifications: Notification[];
}
