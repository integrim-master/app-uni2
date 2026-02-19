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

export type ResultViewProps = {
  photoUri?: {
    uri: string;
    type?: string;
    fileName?: string;
  };
  diagnostic: any;
  onReset: () => void;
  onNewDiagnostic: () => void;
  onClose?: () => void;
};

export interface TreatmentCardProps {
  title: string;
  image?: string;
  link?: string;
}
