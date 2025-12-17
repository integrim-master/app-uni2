import { CameraType, useCameraPermissions } from "expo-camera";

export interface Report {
  id: string;
  fecha: string;
  resultado: string;
  recomendaciones: string[];
  imagen?: string;
  procedimientos: string[];
}

export interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen?: string;
  categoria: string;
}

export interface ReportCardProps {
  report: Report | null;
  baseUrl: string;
}

export interface ItemProductProps {
  data: Product[];
  fondo: string;
  productReport: string[];
}

export type DiagnosticScreenProps = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  steps: string[];
  nextStep: () => void;
  prevStep: () => void;
  permission: ReturnType<typeof useCameraPermissions>[0];
  requestPermission: () => void;
  facing: CameraType;
  setFacing: React.Dispatch<React.SetStateAction<CameraType>>;
};