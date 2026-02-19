import {
    DiagnosticsServices,
    LastDiagnosticResult,
} from "@/src/modules/diagnostics/services/diagnostic.service";
import { useQuery } from "@tanstack/react-query";

export const useLastDiagnostic = ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) => {
  return useQuery<LastDiagnosticResult>({
    queryKey: ["last-diagnostic", userId],
    queryFn: () => DiagnosticsServices.getLastDiagnostic({ userId, token }),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });
};
