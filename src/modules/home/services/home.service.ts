import api from "@/src/api/base";
import { PromotionsApiResponse } from "../types/home.promotions.types";

export const HomeService = {
  getPromotions: async () => {
    const response = await api.get<PromotionsApiResponse>(
      "/wp-json/careme/v1/promotions",
    );
    return response.data;
  },
};
