import {
  BenefitReedemed,
  Benefits,
  BenefitUsed,
  MembershipData,
} from "@/src/types/shared/Benefits.type";

interface ItemUniqueProps {
  benefitRedemed?: BenefitReedemed;
  data: Benefits;
  isPendingRedeem?: boolean;
  activeBenefitId: string | null;
  loading?: boolean;
  isOtherActive?: boolean;
  onPressRedeem?: (item: Benefits, action: "aplicar" | "cancelar") => void;
  onPressViewDetails?: () => void;
}
interface CancelBenefitBody {
  user_id: string;
  procedimiento_id: string;
}

interface BenefitApiResponse {
  id: string | number;
  title: string;
  description: string;
  precio: number | string | null;
  image: string;
  active?: boolean;
  button?: "enabled" | "disabled" | "cancel" | string;
}

interface BenefitRedemBody {
  telefono: string;
  nombre: string;
  procedimiento: string;
  identificacion: string;
  sede: string;
  user_id: string;
  procedimiento_id: string;
}

interface BeneficiosScreenProps {
  refreshing: boolean;
  loading: boolean;
  membership: MembershipData | null;
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab: "disponibles" | "canjeados";

  setActiveTab: React.Dispatch<
    React.SetStateAction<"disponibles" | "canjeados">
  >;
  onRefresh: () => void;
}

interface BenefitRedemedApiResponse {
  success: boolean;
  message: string;
}

interface BenefitsApiResponse {
  benefits: Benefits[];
  benefits_used: BenefitUsed[];
}

export {
  BeneficiosScreenProps,
  BenefitApiResponse,
  BenefitRedemBody,
  BenefitRedemedApiResponse,
  BenefitsApiResponse,
  CancelBenefitBody,
  ItemUniqueProps
};

