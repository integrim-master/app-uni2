import axios from "axios";

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "https://api.careme360.com";

let _memoryToken: string | null = null;
let _onUnauthorized: (() => void) | null = null;
let _sessionRestoring = false;
let _handling401 = false;

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

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  if (_memoryToken) {
    config.headers.Authorization = `Bearer ${_memoryToken}`;
  }

  config.headers.Accept = "application/json";
  config.headers["Content-Type"] = "application/json";

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url ?? "";
    const isLoginRequest = requestUrl.includes("jwt-auth/v1/token");

    if (status === 401 && !isLoginRequest && _memoryToken && !_sessionRestoring) {
      if (!_handling401) {
        _handling401 = true;
        _onUnauthorized?.();
        setTimeout(() => {
          _handling401 = false;
        }, 1000);
      }

      return Promise.reject({
        status,
        message: "Tu sesión ha expirado. Inicia sesión nuevamente.",
      });
    }

    if (status === 403) {
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
