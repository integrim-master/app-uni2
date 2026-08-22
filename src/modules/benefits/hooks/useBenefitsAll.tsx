import { useAuthQuery } from "@/src/modules/auth/hooks/useAuthQuery";
import { GC_TIME, STALE_TIME } from "@/src/lib/queryClient";
import { benefitsKeys } from "../queryKeys";
import { BenefitService } from "../services/benefits.service";
import { BenefitsApiResponse } from "../types/benefits.types";

export const useBenefitAll = () => {
  return useAuthQuery<BenefitsApiResponse, { status: number; message: string }>({
    queryKey: benefitsKeys.all,
    queryFn: () => BenefitService.getBenefitsAll(),
    staleTime: STALE_TIME.STATIC,
    gcTime: GC_TIME.DEFAULT,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 1,
  });
};
