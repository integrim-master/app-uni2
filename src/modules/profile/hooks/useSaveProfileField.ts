import { getErrorMessage, showErrorToast } from "@/src/utils/showErrorToast";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import type { EditProfilePayload } from "../services/profile.service";
import { useEditProfile } from "./useEditProfile";

export function useSaveProfileField() {
  const router = useRouter();
  const { mutate, isPending } = useEditProfile();

  const save = (payload: EditProfilePayload) => {
    mutate(payload, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Perfil actualizado",
          text2: "Tus cambios se guardaron correctamente.",
        });
        router.back();
      },
      onError: (err) => {
        showErrorToast(
          "No se pudo guardar",
          getErrorMessage(err, "Intenta de nuevo en un momento."),
        );
      },
    });
  };

  return { save, isPending };
}
