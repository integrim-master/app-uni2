import { FULL_PROFILE_KEY } from "@/src/modules/user/types/me.types";
import { getErrorMessage, showErrorToast } from "@/src/utils/showErrorToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { benefitsKeys } from "../queryKeys";
import { BenefitService } from "../services/benefits.service";
import {
  BenefitRedemBody,
  BenefitRedemedApiResponse,
} from "../types/benefits.types";

export const useRedemed = () => {
  const queryClient = useQueryClient();

  return useMutation<BenefitRedemedApiResponse, Error, BenefitRedemBody>({
    mutationFn: BenefitService.redemedBenefit,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: benefitsKeys.all });
        queryClient.invalidateQueries({ queryKey: FULL_PROFILE_KEY });
      }
    },
    onError: (error) => {
      showErrorToast("No se pudo canjear", getErrorMessage(error));
    },
  });
};
