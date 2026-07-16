import { useAuthQuery } from "@/src/modules/auth/hooks/useAuthQuery";
import { BenefitService } from "../services/benefits.service";
import { BenefitApiResponse } from "../types/benefits.types";

export const useBenefit = (uid?: string) => {
  return useAuthQuery<BenefitApiResponse, { status: number; message: string }>({
    queryKey: ["benefit", uid],
    queryFn: () => BenefitService.getDetailsByBenefit({ uid: uid! }),
    enabled: !!uid,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });
};
