import { getMemoryToken, handleUnauthorized } from "@/src/api/base";
import {
  isSessionAuthStatus,
  SESSION_EXPIRED_MESSAGE,
} from "@/src/modules/auth/utils/apiError";

interface PhotoAsset {
  uri: string;
  type?: string;
  fileName?: string;
}

export interface AnalyzeImageResult {
  valido: boolean | string;
  diagnostico?: any;
  procedimientos?: any[];
  error?: string;
  motivo?: string;
}

const ANALYZE_TIMEOUT_MS = 60_000;

function getAnalyzeUrl(): string {
  const url = process.env.EXPO_PUBLIC_N8N_URL;
  if (!url) {
    throw new Error(
      "EXPO_PUBLIC_N8N_URL no esta definido. Configuralo en `.env`.",
    );
  }
  return url;
}

export async function analyzeImage(
  photo: PhotoAsset,
): Promise<AnalyzeImageResult> {
  const token = getMemoryToken();
  if (!token) {
    handleUnauthorized();
    throw {
      status: 401,
      message: SESSION_EXPIRED_MESSAGE,
    };
  }

  const formData = new FormData();
  formData.append("file", {
    uri: photo.uri,
    type: photo.type ?? "image/jpeg",
    name: photo.fileName ?? "photo.jpg",
  } as any);

  const headers: Record<string, string> = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const webhookSecret = process.env.EXPO_PUBLIC_N8N_WEBHOOK_SECRET;
  if (webhookSecret) {
    headers["X-Webhook-Secret"] = webhookSecret;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ANALYZE_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(getAnalyzeUrl(), {
      method: "POST",
      body: formData,
      headers,
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(
        "El análisis tardó demasiado. Intenta de nuevo en un momento.",
      );
    }
    throw new Error("Sin conexión. Revisa tu internet e intenta de nuevo.");
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    if (isSessionAuthStatus(response.status)) {
      handleUnauthorized();
      throw {
        status: response.status,
        message: SESSION_EXPIRED_MESSAGE,
      };
    }
    throw new Error(`Error en análisis de imagen: status ${response.status}`);
  }

  const text = await response.text();
  if (!text) {
    throw new Error("Respuesta vacía del servidor de análisis");
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Respuesta inválida del servidor de análisis");
  }
}
