import { Benefits, BenefitUsed } from "@/src/types/shared/Benefits.type";
import { useAuthQuery } from "@/src/modules/auth/hooks/useAuthQuery";
import { GC_TIME, STALE_TIME } from "@/src/lib/queryClient";
import { benefitsKeys } from "../queryKeys";
import { BenefitService } from "../services/benefits.service";

interface BenefitsApiResponse {
  benefits: Benefits[];
  benefits_used: BenefitUsed[];
  benefit_redeem?: {
    procedimiento: string;
    id_procedimiento: string;
    estado: string;
  }[];
}

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
