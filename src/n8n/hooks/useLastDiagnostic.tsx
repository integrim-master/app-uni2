import { useAuthQuery } from "@/src/modules/auth/hooks/useAuthQuery";
import {
  DiagnosticsServices,
  LastDiagnosticResult,
} from "@/src/modules/diagnostics/services/diagnostic.service";

export const useLastDiagnostic = (userId?: string) => {
  return useAuthQuery<LastDiagnosticResult>({
    queryKey: ["last-diagnostic", userId],
    queryFn: () => DiagnosticsServices.getLastDiagnostic({ userId: userId! }),
    enabled: !!userId,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });
};
