import { useMutation } from "@tanstack/react-query";
import {
    editProfileById,
    EditProfilePayload,
} from "../services/editProfile.service";

export const useEditProfile = () => {
  return useMutation({
    mutationFn: (params: EditProfilePayload) => editProfileById(params),
  });
};
