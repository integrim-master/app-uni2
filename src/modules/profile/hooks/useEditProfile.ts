import { useMutation } from "@tanstack/react-query";
import { EditProfilePayload, MeService } from "../services/profile.service";

export const useEditProfile = () => {
  return useMutation({
    mutationFn: (params: EditProfilePayload) =>
      MeService.editProfileById(params),
  });
};
