import { useAuthQuery } from "@/src/modules/auth/hooks/useAuthQuery";
import { GC_TIME, STALE_TIME } from "@/src/lib/queryClient";
import { DatesService } from "../services/dates.service";
import { CitasApiResponse } from "../types/date.api.types";

export const useDates = () => {
  return useAuthQuery<CitasApiResponse>({
    queryKey: ["dates"],
    queryFn: () => DatesService.getDates(),
    staleTime: STALE_TIME.STATIC,
    gcTime: GC_TIME.DEFAULT,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });
};
