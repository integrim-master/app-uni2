import { Benefits, MembershipData } from "@/types/shared/Benefits.type";


 interface ItemUniqueProps {

  data: Benefits;
  loading: boolean;
  onPress?: (item: MembershipData) => void;
}

 interface BenefitApiResponse {
  id: string; 
  title: string;
  description: string;
  precio: number | null;
  image: string;
}

export { BenefitApiResponse, ItemUniqueProps };

