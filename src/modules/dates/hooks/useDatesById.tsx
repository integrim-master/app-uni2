import { GC_TIME, STALE_TIME } from "@/src/lib/queryClient";
import {
  useAuthenticated,
  useAuthQuery,
} from "@/src/modules/auth/hooks/useAuthQuery";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DatesService } from "../services/dates.service";
import { Cita } from "../types/date.api.types";

export const useDatesDetails = (id: string) => {
  return useAuthQuery<Cita>({
    queryKey: ["dates-details", id],
    queryFn: () => DatesService.getDateDetails(id),
    enabled: !!id,
    staleTime: STALE_TIME.STATIC,
    gcTime: GC_TIME.DEFAULT,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 1,
  });
};

/** Para usar dentro de <Suspense>. Requiere id válido. */
export const useDatesDetailsSuspense = (id: string) => {
  const { isAuthenticated } = useAuthenticated();

  return useSuspenseQuery<Cita>({
    queryKey: ["dates-details", id, isAuthenticated],
    queryFn: async () => {
      if (!isAuthenticated) {
        throw new Error("Sesión no disponible");
      }
      return DatesService.getDateDetails(id);
    },
    staleTime: STALE_TIME.STATIC,
    gcTime: GC_TIME.DEFAULT,
    retry: 1,
  });
};
