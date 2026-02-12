import api from "@/src/api/base";
import { NotificationsResponse } from "../types/notifications.types";

export const NotificationsServices = {
  getNotifications: async () => {
    try {
      const response = await api.get<NotificationsResponse>(
        `wp-json/careme/v1/notification/user`,
      );
      return response.data;
    } catch (error: any) {
      console.error("Error en get de notificaciones:", error);
      throw error;
    }
  },

  markedRead: async (data: { id_notification: string; user_id: number }) => {
    try {
      const response = await api.put(`wp-json/careme/v1/notification/read`, {
        user_id: data.user_id,
        id_notification: data.id_notification,
      });
      return response.data;
    } catch (error: any) {
      console.error("Error al marcar notificación como leída:", error);
      throw error;
    }
  },
};
