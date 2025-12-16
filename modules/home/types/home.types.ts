
import { UserData } from '@/types/shared/Auth.types';
import { Benefits } from '@/types/shared/Benefits.type';
import { ComponentType } from 'react';
import { ViewProps } from 'react-native';

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

export interface CitaData {
  id: string;
  procedimiento: string;
  fecha: string;
  hora: string;
  especialista: string;
  estado: string;
}



export interface HomeScreenProps {
  user: UserData
  fullName: string;
  mebershipName: string;
  dataButtons: ButtonData[];
  citas: CitaData[];
  benefits: Benefits[];
}


 export interface BeneficiosProps {
  benefits: Benefits[];
}

export interface ItemsBenefitsProps {
  data: Benefits;
}



export type EstadoCita = "Cancelada" | "Pendiente" | "Completada";
 export type ButtonState = "Activo" | "Inactivo";

 export interface HistoryData {
  procedimiento: string;
  fecha: string;
  hora: string;
  medico: string;
  estado: EstadoCita;
}


 export interface ItemsHistoryProps extends ViewProps, HistoryData {
  buttons: ButtonState;
  dark: string;
  light: string;
  transparent: string;
}

export interface HistoryByDatesProps {
  citas: CitaData[];
  dark: string;
}