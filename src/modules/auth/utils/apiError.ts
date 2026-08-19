export type ApiError = {
  status?: number;
  message?: string;
};

export const SESSION_EXPIRED_MESSAGE =
  "Tu sesión ha expirado. Inicia sesión nuevamente.";

/** 401 (JWT estándar) y 403 (jwt-auth de WordPress). */
export function isSessionAuthStatus(status: number | undefined): boolean {
  return status === 401 || status === 403;
}

export function isUnauthorizedError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    isSessionAuthStatus((error as ApiError).status)
  );
}
