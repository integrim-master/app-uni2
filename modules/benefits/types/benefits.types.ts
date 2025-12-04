export interface BenefitData {
  id: string;
  procedimiento: string;
  descripcion: string;
  descuento?: number;
  estado: 'disponible' | 'usado' | 'expirado';
  fechaExpiracion?: string;
  valor?: number;
}

export interface ItemUniqueProps {
  index: number;
  dark: string;
  light: string;
  transparent: string;
  data: BenefitData;
  loading: boolean;
  onPress?: (item: BenefitData) => void;
}