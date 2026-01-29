import { useMutation } from "@tanstack/react-query";
import { BenefitService } from "../services/benefits.service";
import {
    BenefitRedemBody,
    BenefitRedemedApiResponse,
} from "../types/benefits.types";

export const useRedemed = () => {
  return useMutation<BenefitRedemedApiResponse, Error, BenefitRedemBody>({
    mutationFn: BenefitService.redemedBenefit,
  });
};
