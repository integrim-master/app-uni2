import { AuthService } from "@/src/modules/auth/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useSendNotifications = () => {
  return useMutation({
    mutationFn: AuthService.sendTokenNotifications,
  });
};
