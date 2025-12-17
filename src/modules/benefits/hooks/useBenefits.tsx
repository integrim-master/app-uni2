import { useMutation } from "@tanstack/react-query";
import { BenefitService } from "../services/benefits.service";
import { BenefitApiResponse } from "../types/benefits.types";

export const useBenefit = () => {
  return useMutation<BenefitApiResponse, Error, { uid: string }>({
    mutationFn: ({ uid }) => BenefitService.getDetailsByBenefit({ uid }),
  });
};
