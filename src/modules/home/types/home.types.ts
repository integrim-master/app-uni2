import { UserData } from "@/src/types/shared/Auth.types";
import { Benefits, TratamientoCareme } from "@/src/types/shared/Benefits.type";
import { ComponentType } from "react";
import { Promotion } from "./promotions.types";

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
}

export interface BeneficiosProps {
  benefits: Benefits[];
}

export interface HistoryByDatesProps {
  dark: string;
}
