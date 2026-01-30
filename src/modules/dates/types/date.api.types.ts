export interface Cita {
  fecha_cita: string;
  hora_cita: string;
  categoria: string;
  Procedimiento: string;
  duracion: string;
  profesional: string;
}

export type CitasApiResponse = Cita[];
