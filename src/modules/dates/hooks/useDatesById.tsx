import { useQuery } from "@tanstack/react-query";
import { DatesService } from "../services/dates.service";
import { Cita } from "../types/date.api.types";

export const useDatesDetails = (id: string) => {
  return useQuery<Cita>({
    queryKey: ["dates-details", id],
    queryFn: () => DatesService.getDateDetails(id),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 1,
  });
};
