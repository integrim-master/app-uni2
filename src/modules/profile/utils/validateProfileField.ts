export const PROFILE_FIELDS = [
  "nombre",
  "fnacimiento",
  "localizacion",
  "type_id",
  "identificacion",
  "telefono",
  "pais_origen",
  "pais_residencia",
  "ciudad",
  "postal",
] as const;

export type ProfileField = (typeof PROFILE_FIELDS)[number];

export function isProfileField(value: string): value is ProfileField {
  return (PROFILE_FIELDS as readonly string[]).includes(value);
}

export function getEditFieldHref(field: ProfileField) {
  return `/profile-details/edit/${field}` as const;
}

export const FIELD_TITLES: Record<string, string> = {
  nombre: "Cómo quieres que te llamemos",
  fnacimiento: "Fecha de nacimiento",
  localizacion: "Tu ubicación",
  type_id: "Tipo de identificación",
  identificacion: "Número de identificación",
  telefono: "Teléfono",
  pais_origen: "País de origen",
  pais_residencia: "País de residencia",
  ciudad: "Ciudad",
  postal: "Código postal",
};

export const MIN_AGE = 13;
export const MAX_NAME_LENGTH = 50;

export function getFieldTitle(field: ProfileField) {
  if (FIELD_TITLES[field]) return FIELD_TITLES[field];
  return `Editar ${field.toString().replace(/_/g, " ")}`;
}

export function getAge(date: Date) {
  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const monthDiff = today.getMonth() - date.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < date.getDate())
  ) {
    age -= 1;
  }
  return age;
}

type ValidateProfileFieldInput = {
  field: ProfileField;
  value: string;
  date?: Date;
  country?: string;
  state?: string;
  city?: string;
};

export function validateProfileField({
  field,
  value,
  date,
  country,
  state,
  city,
}: ValidateProfileFieldInput): string | null {
  if (field === "localizacion") {
    if (!country || !state || !city) {
      return "Completa país, estado y ciudad.";
    }
    return null;
  }

  if (field === "fnacimiento") {
    if (!date) return "Selecciona una fecha de nacimiento.";
    if (date > new Date()) return "La fecha no puede ser futura.";
    if (getAge(date) < MIN_AGE) {
      return `Debes tener al menos ${MIN_AGE} años.`;
    }
    return null;
  }

  if (field === "type_id") {
    if (!value) return "Selecciona un tipo de identificación.";
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) return "Este campo no puede estar vacío.";

  if (field === "nombre") {
    if (trimmed.length < 2) {
      return "El nombre debe tener al menos 2 caracteres.";
    }
    if (trimmed.length > MAX_NAME_LENGTH) {
      return `El nombre no puede superar ${MAX_NAME_LENGTH} caracteres.`;
    }
    if (!/^[\p{L}\s'.-]+$/u.test(trimmed)) {
      return "El nombre solo puede contener letras y espacios.";
    }
  }

  if (field === "telefono") {
    const digits = trimmed.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15) {
      return "Ingresa un teléfono válido (7 a 15 dígitos).";
    }
  }

  if (field === "identificacion" && trimmed.length < 4) {
    return "La identificación debe tener al menos 4 caracteres.";
  }

  if (field === "postal" && !/^[A-Za-z0-9\s-]{3,12}$/.test(trimmed)) {
    return "Ingresa un código postal válido.";
  }

  return null;
}

export function buildProfileFieldValue({
  field,
  value,
  date,
}: ValidateProfileFieldInput): string {
  if (field === "fnacimiento" && date) {
    return date.toISOString().split("T")[0];
  }
  if (field === "telefono") {
    return value.replace(/\D/g, "");
  }
  return value.trim();
}
