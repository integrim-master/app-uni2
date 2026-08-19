import { STALE_TIME } from "@/src/lib/queryClient";
import { useAuthQuery } from "@/src/modules/auth/hooks/useAuthQuery";
import { locationKeys } from "../queryKeys";
import { CountryService } from "../services/country.service";
import type { Country } from "../types/country.types";

export const useCountries = (enabled = true) => {
  const query = useAuthQuery<Country[]>({
    queryKey: locationKeys.countries,
    queryFn: () => CountryService.getCountries(),
    enabled,
    staleTime: STALE_TIME.MEDIUM,
  });

  return {
    countries: query.data ?? ([] as Country[]),
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
};
