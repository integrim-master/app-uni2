const N8N_URL =
  process.env.N8N_URL ??
  "https://n8n-gqev.onrender.com/webhook/b9ff3f44-cd3d-4e95-865b-76ffc441f7be";

interface PhotoAsset {
  uri: string;
  type?: string;
  fileName?: string;
}

export async function AnalyzeImage(photo: PhotoAsset): Promise<any> {
  console.log("Analizando imagen con N8N:", photo);

  const formData = new FormData();
  formData.append("file", {
    uri: photo.uri,
    type: photo.type ?? "image/jpeg",
    name: photo.fileName ?? "photo.jpg",
  } as any);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(N8N_URL, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId));

    console.log("N8N status:", response.status);

    const text = await response.text();
    console.log("N8N response text:", text || "<vacío>");

    if (!text) return null;

    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error("Timeout conectando con N8N");
    }
    throw new Error(error?.message || "Error desconocido en N8N");
  }
}
