export interface UploadImageParams {
  photo: {
    uri: string;
    type?: string;
    fileName?: string;
  };
  userId: string;
  token?: string;
}

export interface UploadImageResult {
  id: number;
}

export interface CreateDiagnosticParams {
  diagnostico: any;
  procedimientos: any[];
  imageId: number;
  userId: string;
}

export interface CreateDiagnosticResult {
  id: number;
  [key: string]: any;
}

export interface GetLastDiagnosticParams {
  userId: string;
  token?: string;
}

export interface LastDiagnosticResult {
  success: boolean;
  data?: {
    diagnostico: any;
    procedimientos: any[];
    imagen_url?: string;
    fecha?: string;
    photoUri?: {
      uri: string;
    };
    [key: string]: any;
  };
  message?: string;
}

export const DiagnosticsServices = {
  uploadImage: async ({
    photo,
    userId,
    token = "",
  }: UploadImageParams): Promise<UploadImageResult> => {
    try {
      const formData = new FormData();

      formData.append("file", {
        uri: photo.uri,
        type: photo.type ?? "image/jpeg",
        name: photo.fileName ?? `${userId}-${Date.now()}.jpg`,
      } as any);

      formData.append("title", `${userId}-${Date.now()}`);

      const url = "https://api.careme360.com/wp-json/wp/v2/media";

      const res = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!res.ok) {
        throw new Error(`Error subiendo imagen: status ${res.status}`);
      }

      const data = await res.json();

      if (!data || typeof data.id !== "number") {
        throw new Error("Respuesta inválida: id no encontrada");
      }

      return { id: data.id };
    } catch (error: any) {
      console.error("Error uploading image:", error);
      throw new Error(error?.message ?? "Error subiendo imagen");
    }
  },

  createDiagnostic: async ({
    diagnostico,
    procedimientos,
    imageId,
    userId,
  }: CreateDiagnosticParams): Promise<CreateDiagnosticResult> => {
    const url = "https://api.careme360.com/wp-json/facecheck/v1/analisis";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        diagnostico,
        procedimientos,
        identificacion: userId,
        imagen_id: imageId,
      }),
    });
    if (!res.ok) {
      throw new Error(`Error creando diagnóstico: status ${res.status}`);
    }
    return await res.json();
  },

  getLastDiagnostic: async ({
    userId,
    token,
  }: GetLastDiagnosticParams): Promise<LastDiagnosticResult> => {
    try {
      const url = `https://api.careme360.com/wp-json/facecheck/v1/ultimo-informe?identificacion=${userId}`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      console.log("Fetch last diagnostic response status:", res);

      if (!res.ok) {
        if (res.status === 404) {
          return { success: false, message: "No se encontró diagnóstico" };
        }
        throw new Error(`Error consultando diagnóstico: status ${res.status}`);
      }

      const data = await res.json();
      console.log("Last diagnostic data:", data);
      return { success: true, data };
    } catch (error: any) {
      console.error("Error fetching last diagnostic:", error);
      return {
        success: false,
        message: error?.message ?? "Error consultando diagnóstico",
      };
    }
  },
};
