const N8N_URL =
  process.env.EXPO_PUBLIC_N8N_URL ??
  "https://n8n-gqev.onrender.com/webhook/b9ff3f44-cd3d-4e95-865b-76ffc441f7be";

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

export async function AnalyzeImage(
  photo: PhotoAsset,
): Promise<AnalyzeImageResult> {
  const formData = new FormData();
  formData.append("file", {
    uri: photo.uri,
    type: photo.type ?? "image/jpeg",
    name: photo.fileName ?? "photo.jpg",
  } as any);

  const response = await fetch(N8N_URL, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
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
