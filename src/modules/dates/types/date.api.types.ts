export interface Cita {
  id?: string;
  fecha_cita: string;
  hora_cita: string;
  categoria: string;
  Procedimiento: string;
  duracion: string;
  profesional: string;
  sede: string;
  recomendaciones?: string[];
}

export type CitasApiResponse = Cita[];
