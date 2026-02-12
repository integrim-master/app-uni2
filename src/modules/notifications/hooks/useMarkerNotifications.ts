import { useMutation } from "@tanstack/react-query";
import { NotificationsServices } from "../services/notifications.service";
import { MarkerNotification } from "../types/marker.notifications.types";

export const useMarkerReadNotifications = () => {
  return useMutation<void, unknown, MarkerNotification>({
    mutationFn: (data) => NotificationsServices.markedRead(data),
  });
};
