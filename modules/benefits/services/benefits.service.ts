import api from "@/api/base";
import { BenefitApiResponse } from "../types/benefits.types";



export const BenefitService = {
    getDetailsByBenefit: async ({uid}: { uid:string }) => {
  const response = await api.get<BenefitApiResponse>(`wp-json/careme/v1/benefits/${uid}`);
  console.log({response}, 'esta es la response del servicio');
  return response.data;
}

};