import { GC_TIME, STALE_TIME } from "@/src/lib/queryClient";
import { useAuthQuery } from "@/src/modules/auth/hooks/useAuthQuery";
import { locationKeys } from "../queryKeys";
import { CountryService } from "../services/country.service";
import type { GeoPlace } from "../types/country.types";

export const useStates = (countryId: string) => {
  const query = useAuthQuery<GeoPlace[]>({
    queryKey: locationKeys.states(countryId),
    queryFn: () => CountryService.getStates(countryId),
    enabled: !!countryId,
    staleTime: STALE_TIME.STATIC,
    gcTime: GC_TIME.DEFAULT,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return {
    states: query.data ?? ([] as GeoPlace[]),
    isLoading: query.isLoading,
    error: query.error,
  };
};
