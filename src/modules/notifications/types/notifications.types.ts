export interface Notification {
  id: string;
  title: string;
  body: string;
  data?: any;
  receivedAt?: Date;
  read: boolean;
}

export interface NotificationsScreenProps {
  notifications: Notification[];
}

export interface NotificationsResponse {
  id: string;
  user_id: string;
  type_notification: string;
  id_notification: string;
  title: string;
  body: string;
  data?: any;
  status: string;
  sent_at: string;
  read_at: string | null;
  receivedAt?: Date;
}
