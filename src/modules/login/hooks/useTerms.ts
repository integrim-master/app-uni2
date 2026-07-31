import { AuthService } from "@/src/modules/auth/services/auth.service";
import { FULL_PROFILE_KEY } from "@/src/modules/user/types/me.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AcceptTermsResponse } from "../types/login.types";

export const useTerms = () => {
  const queryClient = useQueryClient();

  return useMutation<AcceptTermsResponse, Error>({
    mutationFn: AuthService.AceptTerms,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FULL_PROFILE_KEY });
    },
  });
};
