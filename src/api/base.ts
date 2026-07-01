import axios from "axios";

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "https://api.careme360.com";

let _memoryToken: string | null = null;

export function setMemoryToken(token: string | null) {
  _memoryToken = token;
}

export function getMemoryToken(): string | null {
  return _memoryToken;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
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
    console.log(status);

    if (status === 401) {
      return Promise.reject({
        status,
        message: "Tu sesión ha expirado. Inicia sesión nuevamentes.",
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

    return Promise.reject({
      status,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Ha ocurrido un error inesperado.",
    });
  },
);

export default api;
