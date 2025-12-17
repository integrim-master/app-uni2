import api from "@/src/api/base";
import { BenefitApiResponse } from "../types/benefits.types";



export const BenefitService = {
    getDetailsByBenefit: async ({uid}: { uid:string }) => {
  const response = await api.get<BenefitApiResponse>(`wp-json/careme/v1/benefits/${uid}`);
  return response.data;
}

};