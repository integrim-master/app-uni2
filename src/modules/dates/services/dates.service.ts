import api from "@/src/api/base";
import { CitasApiResponse } from "../types/date.api.types";

export const DatesService = {
  getDates: async () => {
    try {
      const response = await api.get<CitasApiResponse>(
        `/wp-json/careme/v1/citas`,
      );
      return response.data;
    } catch (error: any) {
      console.error("Error en al obtener las citas:", error);
      throw error;
    }
  },
};
