import { useMutation } from "@tanstack/react-query";

import { AuthService } from "../services/auth.service";
import { AcceptTermsResponse } from "../types/login.types";

export const useTerms = () => {
  return useMutation<AcceptTermsResponse, Error>({
    mutationFn: AuthService.AceptTerms,
  });
};
