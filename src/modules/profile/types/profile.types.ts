import type { GeoPlace } from "./country.types";

/** Lugar geográfico que viene en `me/data` (array de 0–1 items). */
export type ProfilePlace = Pick<GeoPlace, "id" | "name">;

export interface UserProfile {
  user_id: number;
  nombre: string;
  type_id: string | null;
  identificacion: string;
  fnacimiento: string | null;
  telefono: string;
  pais_residencia: ProfilePlace[];
  provincia: ProfilePlace[];
  ciudad: ProfilePlace[];
  postal: string | null;
  pais_origen: ProfilePlace[];
  terms: string;
}

/** Primer ítem del array de lugar, o null si viene vacío. */
export function getProfilePlace(
  places?: ProfilePlace[] | null,
): ProfilePlace | null {
  if (!Array.isArray(places) || places.length === 0) return null;
  return places[0] ?? null;
}

export function getProfilePlaceId(places?: ProfilePlace[] | null): string {
  return getProfilePlace(places)?.id ?? "";
}

export function getProfilePlaceName(places?: ProfilePlace[] | null): string {
  return getProfilePlace(places)?.name ?? "";
}
