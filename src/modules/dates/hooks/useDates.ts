import { useQuery } from "@tanstack/react-query";
import { DatesService } from "../services/dates.service";
import { CitasApiResponse } from "../types/date.api.types";

export const useDates = () => {
  return useQuery<CitasApiResponse>({
    queryKey: ["dates"],
    queryFn: () => DatesService.getDates(),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });
};
