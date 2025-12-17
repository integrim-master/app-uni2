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

      const url = "https://admin.alangonzalez.com/wp-json/wp/v2/media";

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
};
