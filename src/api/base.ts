import axios from "axios";
import {
  isSessionAuthStatus,
  SESSION_EXPIRED_MESSAGE,
} from "@/src/modules/auth/utils/apiError";

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "https://api.careme360.com";

let _memoryToken: string | null = null;
let _onUnauthorized: (() => void) | null = null;
let _sessionRestoring = false;
let _handlingUnauthorized = false;

export function setMemoryToken(token: string | null) {
  _memoryToken = token;
}

export function setOnUnauthorized(handler: (() => void) | null) {
  _onUnauthorized = handler;
}

export function setSessionRestoring(restore: boolean) {
  _sessionRestoring = restore;
}

export function getMemoryToken(): string | null {
  return _memoryToken;
}

/**
 * Dispara el flujo global de "sesión expirada" (limpiar sesión + redirigir a
 * login). Lo usa el interceptor de axios, pero también debe llamarse a mano
 * desde cualquier request que NO pase por la instancia `api` (ej. `fetch`
 * crudo para subir archivos), para que un 401/403 ahí también cierre la sesión
 * en vez de mostrarse como un error genérico.
 */
export function handleUnauthorized() {
  if (_sessionRestoring || _handlingUnauthorized) return;

  _handlingUnauthorized = true;
  _onUnauthorized?.();
  setTimeout(() => {
    _handlingUnauthorized = false;
  }, 1000);
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  if (_memoryToken) {
    config.headers.Authorization = `Bearer ${_memoryToken}`;
  }

  config.headers.Accept ??= "application/json";
  // No pisar el Content-Type si el request ya trae uno propio (ej. multipart/form-data).
  config.headers["Content-Type"] ??= "application/json";

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url ?? "";
    const isLoginRequest = requestUrl.includes("jwt-auth/v1/token");
    const isPushTokenRequest = requestUrl.includes("push-token");

    // Login/push-token: un 401/403 no debe cerrar (ni inventar) una sesión.
    const shouldEndSession =
      isSessionAuthStatus(status) &&
      !isLoginRequest &&
      !isPushTokenRequest &&
      !!_memoryToken &&
      !_sessionRestoring;

    if (shouldEndSession) {
      handleUnauthorized();

      return Promise.reject({
        status,
        message: SESSION_EXPIRED_MESSAGE,
      });
    }

    if (status === 403 && !isLoginRequest) {
      return Promise.reject({
        status,
        message: "No tienes permisos para realizar esta acción.",
      });
    }

    if (status === 500) {
      return Promise.reject({
        status,
        message: "Error interno en el servidor.",
      });
    }

    if (!error.response) {
      return Promise.reject({
        status: undefined,
        message: "Sin conexión. Revisa tu internet e intenta de nuevo.",
      });
    }

    return Promise.reject({
      status,
      message:
        error.response?.data?.message ||
        error.message ||
        "Ha ocurrido un error inesperado.",
    });
  },
);

export default api;
