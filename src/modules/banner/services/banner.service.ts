import api from "@/src/api/base";
import { BannerMedia } from "../types/banner.type";

export const BannerService = {
  getBanner: async () => {
    try {
      const response = await api.get<BannerMedia>(
        `wp-json/careme/v1/media/promo`,
      );
      return response.data;
    } catch (error: any) {
      console.error("Error en get de banner:", error);
      throw error;
    }
  },
};
