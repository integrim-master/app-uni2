import { ComponentType } from 'react';
import { ViewProps } from 'react-native';

export interface ButtonData {
  item: string;
  routPage: string;
  icon: ComponentType<any>;
  dark: string;
  light: string;
  colorFondo: string;
}

export interface AccesoDirectoProps {
  item: string;
  icon: ComponentType<{ color: string }>;
  routPage: string;
  dark: string;
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
  user: {
    id: string;
    display_name: string;
    email: string;
    [key: string]: any;
  };
  fullName: string;
  dark: string;
  light: string;
  colorFondo: string;
  dataButtons: ButtonData[];
  citas: CitaData[];
  benefits: BenefitData[];
}





export interface BenefitData {
  id: string;
  procedimiento: string;
  descripcion: string;
  descuento?: number;
  estado: 'disponible' | 'usado' | 'expirado';
  fechaExpiracion?: string;
  valor?: number;
}

 export interface BeneficiosProps {
  dark: string;
  light: string;
  transparent: string;
  benefits: BenefitData[];
}

export interface ItemsBenefitsProps {
  dark: string;
  light: string;
  transparent: string;
  data: BenefitData;
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