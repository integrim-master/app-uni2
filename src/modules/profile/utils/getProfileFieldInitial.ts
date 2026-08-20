import type { UserProfile } from "../types/profile.types";
import { getProfilePlaceId, getProfilePlaceName } from "../types/profile.types";
import type { ProfileField } from "./validateProfileField";

export function parseProfileDate(raw?: string | null) {
  if (!raw) return new Date();
  const parsed = new Date(raw.includes("T") ? raw : `${raw}T12:00:00`);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

export function getProfileTextValue(
  user: UserProfile,
  field: ProfileField,
): string {
  switch (field) {
    case "nombre":
      return user.nombre ?? "";
    case "identificacion":
      return user.identificacion ?? "";
    case "telefono":
      return user.telefono ?? "";
    case "pais_origen":
      return getProfilePlaceId(user.pais_origen);
    case "pais_residencia":
      return getProfilePlaceId(user.pais_residencia);
    case "ciudad":
      return getProfilePlaceId(user.ciudad);
    case "postal":
      return user.postal ?? "";
    case "type_id":
      return user.type_id != null ? String(user.type_id) : "";
    default:
      return "";
  }
}

/** Valores iniciales del picker de localización (ids para CustomPicker). */
export function getProfileLocation(user: UserProfile) {
  return {
    country: getProfilePlaceId(user.pais_residencia),
    state: getProfilePlaceId(user.provincia),
    city: getProfilePlaceId(user.ciudad),
  };
}

/** Texto legible para listas / subtítulos de menú. */
export function formatProfilePlaceLabel(
  places?: UserProfile["pais_origen"] | null,
): string {
  return getProfilePlaceName(places) || "N/A";
}
