import api, {
  API_BASE_URL,
  getMemoryToken,
  handleUnauthorized,
} from "@/src/api/base";
import {
  isSessionAuthStatus,
  isUnauthorizedError,
  SESSION_EXPIRED_MESSAGE,
} from "@/src/modules/auth/utils/apiError";

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
  }: UploadImageParams): Promise<UploadImageResult> => {
    try {
      const formData = new FormData();

      formData.append("file", {
        uri: photo.uri,
        type: photo.type ?? "image/jpeg",
        name: photo.fileName ?? `${userId}-${Date.now()}.jpg`,
      } as any);

      formData.append("title", `${userId}-${Date.now()}`);

      const token = getMemoryToken();
      if (!token) {
        handleUnauthorized();
        throw {
          status: 401,
          message: SESSION_EXPIRED_MESSAGE,
        };
      }

      const res = await fetch(`${API_BASE_URL}/wp-json/wp/v2/media`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (isSessionAuthStatus(res.status)) {
          handleUnauthorized();
          throw {
            status: res.status,
            message: SESSION_EXPIRED_MESSAGE,
          };
        }
        throw new Error(`Error subiendo imagen: status ${res.status}`);
      }

      const data = await res.json();

      if (!data || typeof data.id !== "number") {
        throw new Error("Respuesta inválida: id no encontrada");
      }

      return { id: data.id };
    } catch (error: any) {
      if (isUnauthorizedError(error)) throw error;
      throw new Error(error?.message ?? "Error subiendo imagen");
    }
  },

  createDiagnostic: async ({
    diagnostico,
    procedimientos,
    imageId,
    userId,
  }: CreateDiagnosticParams): Promise<CreateDiagnosticResult> => {
    const response = await api.post("/wp-json/facecheck/v1/analisis", {
      diagnostico,
      procedimientos,
      identificacion: userId,
      imagen_id: imageId,
    });
    return response.data;
  },

  getLastDiagnostic: async ({
    userId,
  }: GetLastDiagnosticParams): Promise<LastDiagnosticResult> => {
    try {
      const response = await api.get(
        `/wp-json/facecheck/v1/ultimo-informe?identificacion=${userId}`,
      );
      return { success: true, data: response.data };
    } catch (error: any) {
      if (error?.status === 404) {
        return { success: false, message: "No se encontró diagnóstico" };
      }
      return {
        success: false,
        message: error?.message ?? "Error consultando diagnóstico",
      };
    }
  },
};
