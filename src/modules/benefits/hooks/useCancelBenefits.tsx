import { FULL_PROFILE_KEY } from "@/src/modules/user/types/me.types";
import { getErrorMessage, showErrorToast } from "@/src/utils/showErrorToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { benefitsKeys } from "../queryKeys";
import { BenefitService } from "../services/benefits.service";
import {
  BenefitRedemedApiResponse,
  CancelBenefitBody,
} from "../types/benefits.types";

export const useCancel = () => {
  const queryClient = useQueryClient();

  return useMutation<BenefitRedemedApiResponse, Error, CancelBenefitBody>({
    mutationFn: BenefitService.cancelBenefit,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: benefitsKeys.all });
        queryClient.invalidateQueries({ queryKey: FULL_PROFILE_KEY });
      }
    },
    onError: (error) => {
      showErrorToast("No se pudo cancelar", getErrorMessage(error));
    },
  });
};
