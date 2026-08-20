import type { EditProfilePayload } from "../../services/profile.service";
import type { UserProfile } from "../../types/profile.types";
import type { ProfileField } from "../../utils/validateProfileField";

export type SaveProfileField = (payload: EditProfilePayload) => void;

export type BaseFieldEditorProps = {
  user: UserProfile;
  isPending: boolean;
  onSave: SaveProfileField;
};

export type TextProfileField = Extract<
  ProfileField,
  "nombre" | "identificacion" | "telefono" | "ciudad" | "postal"
>;

export type CountryProfileField = Extract<
  ProfileField,
  "pais_origen" | "pais_residencia"
>;
