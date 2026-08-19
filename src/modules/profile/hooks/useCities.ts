import { GC_TIME, STALE_TIME } from "@/src/lib/queryClient";
import { useAuthQuery } from "@/src/modules/auth/hooks/useAuthQuery";
import { locationKeys } from "../queryKeys";
import { CountryService } from "../services/country.service";
import type { GeoPlace } from "../types/country.types";

export const useCities = (countryId: string, stateId: string) => {
  const query = useAuthQuery<GeoPlace[]>({
    queryKey: locationKeys.cities(stateId),
    queryFn: () => CountryService.getCities(countryId, stateId),
    enabled: !!countryId && !!stateId,
    staleTime: STALE_TIME.STATIC,
    gcTime: GC_TIME.DEFAULT,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return {
    cities: query.data ?? ([] as GeoPlace[]),
    isLoading: query.isLoading,
    error: query.error,
  };
};
