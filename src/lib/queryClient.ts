import { QueryClient } from "@tanstack/react-query";

/**
 * Política de cache de React Query para toda la app.
 *
 * La mayoría de las pantallas usan `staleTime: Infinity` + pull-to-refresh
 * manual (ver `useAuthQuery`/hooks de cada módulo). Es una decisión
 * deliberada, no un olvido: evita refetch silenciosos en cada focus y deja
 * el control de "cuándo se actualiza" al usuario (swipe to refresh) o a una
 * mutación explícita.
 *
 * Reglas a seguir al crear un nuevo hook de datos:
 * 1. Datos que dependen de una lista mostrada en varias pantallas (ej.
 *    beneficios, perfil) → `STALE_TIME.STATIC` (Infinity) + pull-to-refresh.
 * 2. Datos que cambian solos en el backend sin acción del usuario (ej.
 *    "full-profile" agregador) → `STALE_TIME.MEDIUM` para que hagan refetch
 *    solo. Ya usado en `useMe`/`useMembership`.
 * 3. Toda mutación que modifique datos ya cacheados (POST/PUT/DELETE) DEBE
 *    invalidar el/los `queryKey` afectados en su propio `onSuccess`, nunca
 *    depender de que la pantalla que la llama lo haga. Así cualquier
 *    consumidor futuro del hook obtiene el comportamiento correcto gratis.
 */
export const STALE_TIME = {
  /** Nunca se considera "vieja" sola; se refresca por pull-to-refresh o invalidación manual. */
  STATIC: Infinity,
  /** Se revalida sola cada 5 min si la pantalla sigue montada. */
  MEDIUM: 1000 * 60 * 5,
  /** Cache por defecto para queries sin política especial. */
  DEFAULT: 1000 * 60,
} as const;

export const GC_TIME = {
  DEFAULT: 1000 * 60 * 10,
} as const;

export function createAppQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: STALE_TIME.DEFAULT,
      },
    },
  });
}
