import axios from "axios";
import * as SecureStore from "expo-secure-store";

const api = axios.create({
  baseURL: "https://api.careme360.com",
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const stored = await SecureStore.getItemAsync("auth_data");

  if (stored) {
    const parsed = JSON.parse(stored);
    if (parsed.token) {
      config.headers.Authorization = `Bearer ${parsed.token}`;
    }
  }

  config.headers.Accept = "application/json";
  config.headers["Content-Type"] = "application/json";

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
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
