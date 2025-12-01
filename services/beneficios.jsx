import { apiFetch } from "./client";

export function getBeneficiosApi(nameBenefit, token) {
  return apiFetch(`/careme/v1/benefits/?membership=${nameBenefit}`, {}, token);
}
