import { useAuthQuery } from "@/src/modules/auth/hooks/useAuthQuery";
import { DatesService } from "../services/dates.service";
import { Cita } from "../types/date.api.types";

export const useDatesDetails = (id: string) => {
  return useAuthQuery<Cita>({
    queryKey: ["dates-details", id],
    queryFn: () => DatesService.getDateDetails(id),
    enabled: !!id,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 1,
  });
};
