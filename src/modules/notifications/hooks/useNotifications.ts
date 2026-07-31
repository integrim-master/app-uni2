import { useAuthQuery } from "@/src/modules/auth/hooks/useAuthQuery";
import { GC_TIME, STALE_TIME } from "@/src/lib/queryClient";
import { NotificationsServices } from "../services/notifications.service";
import { NotificationsResponse } from "../types/notifications.types";

export const useNotificationsApi = () => {
  return useAuthQuery<NotificationsResponse>({
    queryKey: ["notifications"],
    queryFn: () => NotificationsServices.getNotifications(),
    staleTime: STALE_TIME.STATIC,
    gcTime: GC_TIME.DEFAULT,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });
};
