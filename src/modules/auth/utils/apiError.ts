export type ApiError = {
  status?: number;
  message?: string;
};

export function isUnauthorizedError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    (error as ApiError).status === 401
  );
}
