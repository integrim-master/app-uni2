import { Benefits, BenefitUsed } from "@/src/types/shared/Benefits.type";
import { useQuery } from "@tanstack/react-query";
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
  return useQuery<BenefitsApiResponse, { status: number; message: string }>({
    queryKey: ["benefit"],
    queryFn: () => BenefitService.getBenefitsAll(),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 1,
  });
};
