import { useMutation } from "@tanstack/react-query";

import { AuthService } from "../services/auth.service";

export const useSendNotifications = () => {
  return useMutation({
    mutationFn: AuthService.sendTokenNotifications,
  });
};
