import type { Cita } from "../types/date.api.types";

/** Mock temporal para UI cuando la API no trae citas. Quitar al conectar datos reales. */
export const MOCK_CITAS: (Cita & { id: string })[] = [
  {
    id: "mock-1",
    Procedimiento: "Limpieza facial profunda",
    sede: "Care Me - Chapinero",
    categoria: "Estetico",
    fecha_cita: "28/07/2026",
    hora_cita: "10:30 a.m.",
    duracion: "60 min",
    profesional: "Dra. Laura Méndez",
  },
  {
    id: "mock-2",
    Procedimiento: "Consulta dermatológica",
    sede: "Care Me - Norte",
    categoria: "Médico",
    fecha_cita: "02/08/2026",
    hora_cita: "3:00 p.m.",
    duracion: "45 min",
    profesional: "Dr. Andrés Ruiz",
  },
  {
    id: "mock-3",
    Procedimiento: "Botox zona frontal",
    sede: "Care Me - Chapinero",
    categoria: "Estetico",
    fecha_cita: "10/08/2026",
    hora_cita: "11:15 a.m.",
    duracion: "30 min",
    profesional: "Dra. Camila Torres",
  },
  {
    id: "mock-4",
    Procedimiento: "Control post-tratamiento",
    sede: "Care Me - Centro",
    categoria: "Médico",
    fecha_cita: "15/08/2026",
    hora_cita: "9:00 a.m.",
    duracion: "20 min",
    profesional: "Dr. Andrés Ruiz",
  },
];
