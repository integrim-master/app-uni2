import { useAuthQuery } from "@/src/modules/auth/hooks/useAuthQuery";
import { NotificationsServices } from "../services/notifications.service";
import { NotificationsResponse } from "../types/notifications.types";

export const useNotificationsApi = () => {
  return useAuthQuery<NotificationsResponse>({
    queryKey: ["notifications"],
    queryFn: () => NotificationsServices.getNotifications(),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });
};
