import {
  useAuthenticated,
  useAuthQuery,
} from "@/src/modules/auth/hooks/useAuthQuery";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  DiagnosticsServices,
  LastDiagnosticResult,
} from "../services/diagnostic.service";

export const LAST_DIAGNOSTIC_KEY = (userId?: string) =>
  ["last-diagnostic", userId] as const;

export const useLastDiagnostic = (userId?: string) => {
  return useAuthQuery<LastDiagnosticResult>({
    queryKey: LAST_DIAGNOSTIC_KEY(userId),
    queryFn: () => DiagnosticsServices.getLastDiagnostic({ userId: userId! }),
    enabled: !!userId,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });
};

/** Para usar dentro de <Suspense>. Requiere userId válido. */
export const useLastDiagnosticSuspense = (userId: string) => {
  const { isAuthenticated } = useAuthenticated();

  return useSuspenseQuery<LastDiagnosticResult>({
    queryKey: LAST_DIAGNOSTIC_KEY(userId),
    queryFn: async () => {
      if (!isAuthenticated) {
        throw new Error("Sesión no disponible");
      }
      return DiagnosticsServices.getLastDiagnostic({ userId });
    },
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    retry: 1,
  });
};
