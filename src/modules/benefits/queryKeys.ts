/**
 * Keys centralizadas del módulo de beneficios. Cualquier mutación que
 * cambie el estado de un beneficio (canjear/cancelar) debe invalidar
 * `benefitsKeys.all`, que por matching de prefijo de React Query también
 * invalida `benefitsKeys.detail(uid)`.
 */
export const benefitsKeys = {
  all: ["benefit"] as const,
  detail: (uid?: string) => ["benefit", uid] as const,
};
