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
  const formData = new FormData();
  formData.append("file", {
    uri: photo.uri,
    type: photo.type ?? "image/jpeg",
    name: photo.fileName ?? "photo.jpg",
  } as any);

  const response = await fetch(getAnalyzeUrl(), {
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
