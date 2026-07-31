import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditProfilePayload, MeService } from "../services/profile.service";

export const useEditProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: EditProfilePayload) =>
      MeService.editProfileById(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile-info"] });
    },
  });
};
