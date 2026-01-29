interface TratamientoCareme {
  id: number;
  title: string;
  link: string;
  image: string;
}

interface MembershipData {
  name?: string;
  id?: number;
  benefits: Benefits[];
  benefits_used: BenefitUsed[];
  benefit_redeem?: BenefitReedemed[];
}

interface BenefitReedemed {
  procedimiento: string;
  id_procedimiento: string;
  estado: string;
}

interface BenefitUsed {
  id: number;
  benefit: string;
  date_redeem: string;
}

interface Benefits {
  title: string;
  id: number;
  description: string;
  precio: number;
  image: string;
  allowed: number;
  used: number;
  remaining: number;
  period: string;
}

interface BenefitsListProps {
  benefits: Benefits[];
  activeBenefitId: string | null;
  benefitsUsed?: BenefitUsed[];
  benefitsRedemed?: BenefitReedemed;
  loading: boolean;
  refreshing: boolean;
  onRefresh: () => void;
  onBenefitRedemed: (benefit: Benefits, action: "aplicar" | "cancelar") => void;
  onBenefitViewDetails?: (benefit: Benefits) => void;
  emptyMessage?: string;
  filterUsed?: "available" | "used";
  animationKey?: string;
  isPendingRedeem?: boolean;
}

export {
  BenefitReedemed,
  Benefits,
  BenefitsListProps,
  BenefitUsed,
  MembershipData,
  TratamientoCareme
};

