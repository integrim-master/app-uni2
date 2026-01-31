export interface UltimaCita {
  id: string;
  fecha_cita: string;
  hora_cita: string;
  categoria: string;
  Procedimiento: string;
  duracion: string;
  profesional: string;
  sede: string;
}

export type UltimasCitas = UltimaCita[];
