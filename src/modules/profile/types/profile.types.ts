export interface UserProfile {
  user_id: number;
  nombre: string;
  type_id: number | null;
  identificacion: string;
  fnacimiento: string | null;
  telefono: string;
  pais_residencia: string | null;
  provincia: string | null;
  ciudad: string | null;
  postal: string | null;
  pais_origen: string | null;
  terms: string;
}
