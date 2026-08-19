import type { UserProfile } from "../types/profile.types";
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
      return user.pais_origen ?? "";
    case "pais_residencia":
      return user.pais_residencia ?? "";
    case "ciudad":
      return user.ciudad ?? "";
    case "postal":
      return user.postal ?? "";
    case "type_id":
      return user.type_id != null ? String(user.type_id) : "";
    default:
      return "";
  }
}

export function getProfileLocation(user: UserProfile) {
  console.log("user", user);
  return {
    country: user.pais_residencia ?? "",
    state: user.provincia ?? "",
    city: user.ciudad ?? "",
  };
}
