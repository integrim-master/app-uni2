import { UserData } from "@/src/types/shared/Auth.types";
import { Benefits, TratamientoCareme } from "@/src/types/shared/Benefits.type";
import { ComponentType } from "react";
import { UltimasCitas } from "./home.dates.types";
import { Promotion } from "./home.promotions.types";

export interface ButtonData {
  item: string;
  routPage: string;
  icon: ComponentType<any>;
}

export interface AccesoDirectoProps {
  item: string;
  icon: ComponentType<any>;
  routPage: string;
  dark: string;
  width?: string;
  light: string;
  colorFondo: string;
}

export interface HomeScreenProps {
  user: UserData;
  mebershipName: string;
  isError: boolean;
  treatmentsCareme: TratamientoCareme[];
  promotions: Promotion[];
  isLoading: boolean;
  onRefresh: () => void;
  refreshing: boolean;
  benefits: Benefits[];
  dates?: UltimasCitas;
}

export interface BeneficiosProps {
  benefits: Benefits[];
}

export interface HistoryByDatesProps {
  dark: string;
  citas: {
    id?: string | number;
    procedimiento: string;
    fecha: string;
    hora: string;
    especialista: string;
    estado: string;
  }[];
}

export interface ItemsHistoryProps {
  buttons?: "Activo" | "Inactivo";
  dark?: string;
  light?: string;
  transparent?: string;
  procedimiento: string;
  fecha: string;
  hora: string;
  medico: string;
  estado: "Cancelada" | "Pendiente" | "Completada" | string;
}
