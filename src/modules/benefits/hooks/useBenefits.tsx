import { useAuthQuery } from "@/src/modules/auth/hooks/useAuthQuery";
import { GC_TIME, STALE_TIME } from "@/src/lib/queryClient";
import { benefitsKeys } from "../queryKeys";
import { BenefitService } from "../services/benefits.service";
import { BenefitApiResponse } from "../types/benefits.types";

export const useBenefit = (uid?: string) => {
  return useAuthQuery<BenefitApiResponse, { status: number; message: string }>({
    queryKey: benefitsKeys.detail(uid),
    queryFn: () => BenefitService.getDetailsByBenefit({ uid: uid! }),
    enabled: !!uid,
    staleTime: STALE_TIME.STATIC,
    gcTime: GC_TIME.DEFAULT,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });
};
