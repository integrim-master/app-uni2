import Toast from "react-native-toast-message";

/**
 * Convención UX:
 * - Errores de mutación (POST/PUT/DELETE) → Toast
 * - Errores de carga (GET / queries) → ErrorScreen con onRetry
 */
export function showErrorToast(
  title = "Error",
  message = "Ocurrió un error. Intenta de nuevo.",
) {
  Toast.show({
    type: "error",
    text1: title,
    text2: message,
  });
}

export function getErrorMessage(error: unknown, fallback?: string) {
  if (!error) return fallback ?? "Ocurrió un error. Intenta de nuevo.";
  if (typeof error === "string") return error;
  const anyErr = error as any;
  return (
    anyErr?.message ||
    anyErr?.response?.data?.message ||
    fallback ||
    "Ocurrió un error. Intenta de nuevo."
  );
}
