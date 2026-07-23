import { getErrorMessage, showErrorToast } from "@/src/utils/showErrorToast";
import { useMutation } from "@tanstack/react-query";
import { BenefitService } from "../services/benefits.service";
import {
  BenefitRedemedApiResponse,
  CancelBenefitBody,
} from "../types/benefits.types";

export const useCancel = () => {
  return useMutation<BenefitRedemedApiResponse, Error, CancelBenefitBody>({
    mutationFn: BenefitService.cancelBenefit,
    onError: (error) => {
      showErrorToast("No se pudo cancelar", getErrorMessage(error));
    },
  });
};
