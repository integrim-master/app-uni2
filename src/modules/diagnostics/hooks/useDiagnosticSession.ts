import { useQuery, useQueryClient } from "@tanstack/react-query";

export const DIAGNOSTIC_SESSION_KEY = ["diagnostic-session"];

export type DiagnosticSession = {
  analysis: any;
  photoUri?: { uri: string; type?: string; fileName?: string };
  mediaId?: number;
};

export const useDiagnosticSession = () => {
  return useQuery<DiagnosticSession | null>({
    queryKey: DIAGNOSTIC_SESSION_KEY,
    queryFn: () => null,
    enabled: false,
    staleTime: Infinity,
  });
};

export const useClearDiagnosticSession = () => {
  const queryClient = useQueryClient();
  return () => queryClient.removeQueries({ queryKey: DIAGNOSTIC_SESSION_KEY });
};
