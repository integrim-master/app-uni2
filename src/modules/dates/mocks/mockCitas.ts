import type { Cita } from "../types/date.api.types";

/** Activa/desactiva toda la data quemada de citas (lista + detalle). */
export const USE_MOCK_CITAS = true;

export type MockCita = Cita & {
  id: string;
  recomendaciones: string[];
};

/**
 * Única fuente de mocks de citas.
 * Quitar o poner USE_MOCK_CITAS = false al conectar la API real.
 */
export const MOCK_CITAS: MockCita[] = [
  {
    id: "mock-1",
    Procedimiento: "Limpieza facial profunda",
    sede: "Care Me - Chapinero",
    categoria: "Estetico",
    fecha_cita: "28/07/2026",
    hora_cita: "10:30 a.m.",
    duracion: "60 min",
    profesional: "Dra. Laura Méndez",
    recomendaciones: [
      "Llega 10 minutos antes de tu cita.",
      "Evita maquillaje el día del procedimiento.",
      "Si no puedes asistir, cancela con al menos dos horas de anticipación.",
    ],
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
    recomendaciones: [
      "Trae tu historial de tratamientos previos si los tienes.",
      "Llega 10 minutos antes de tu cita.",
      "Si no puedes asistir, cancela con al menos dos horas de anticipación.",
    ],
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
    recomendaciones: [
      "No consumas alcohol 24 horas antes.",
      "Evita antiinflamatorios el día previo, salvo indicación médica.",
      "Si no puedes asistir, cancela con al menos dos horas de anticipación.",
    ],
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
    recomendaciones: [
      "Llega 10 minutos antes de tu cita.",
      "Comenta cualquier molestia post-tratamiento al profesional.",
      "Si no puedes asistir, cancela con al menos dos horas de anticipación.",
    ],
  },
];

export function getMockCitaById(id: string): MockCita {
  return MOCK_CITAS.find((cita) => cita.id === id) ?? MOCK_CITAS[0];
}
