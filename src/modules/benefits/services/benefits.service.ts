import api from "@/src/api/base";
import {
  BenefitApiResponse,
  BenefitRedemBody,
  BenefitRedemedApiResponse,
  BenefitsApiResponse,
} from "../types/benefits.types";

export const BenefitService = {
  getDetailsByBenefit: async ({ uid }: { uid: string }) => {
    try {
      const response = await api.get<BenefitApiResponse>(
        `wp-json/careme/v1/benefit/${uid}`,
      );
      return response.data;
    } catch (error: any) {
      console.error("Error en getDetailsByBenefit:", error);
      throw error;
    }
  },

  getBenefitsAll: async (): Promise<BenefitsApiResponse> => {
    try {
      const response = await api.get<BenefitsApiResponse>(
        `wp-json/careme/v1/me/benefits`,
      );
      return response.data;
    } catch (error: any) {
      console.error("Error en getBenefitsAll:", error);
      throw error;
    }
  },

  redemedBenefit: async (
    benefitRedemBody: BenefitRedemBody,
  ): Promise<BenefitRedemedApiResponse> => {
    try {
      const response = await api.post<BenefitRedemedApiResponse>(
        `wp-json/careme/v1/redeem`,
        {
          telefono: benefitRedemBody.telefono,
          nombre: benefitRedemBody.nombre,
          procedimiento: benefitRedemBody.procedimiento,
          identificacion: benefitRedemBody.identificacion,
          sede: benefitRedemBody.sede,
          user_id: benefitRedemBody.user_id,
          procedimiento_id: benefitRedemBody.procedimiento_id,
        },
      );
      return response.data;
    } catch (error: any) {
      console.error("Error en redeemBenefit:", error);
      throw error;
    }
  },

  cancelBenefit: async (
    benefitRedemBody: Pick<BenefitRedemBody, "user_id" | "procedimiento_id">,
  ): Promise<BenefitRedemedApiResponse> => {
    try {
      const response = await api.post<BenefitRedemedApiResponse>(
        `wp-json/careme/v1/redeem/cancel`,
        {
          user_id: benefitRedemBody.user_id,
          procedimiento_id: benefitRedemBody.procedimiento_id,
        },
      );
      return response.data;
    } catch (error: any) {
      console.error("Error en cancelBenefit:", error);
      throw error;
    }
  },
};
