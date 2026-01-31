export interface Promotion {
  id: number;
  title: string;
  link_promotion: string;
  fecha_fin: string;
  image: string;
}

export type PromotionsApiResponse = Promotion[];
