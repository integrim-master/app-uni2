import { apiFetch } from "./cliente";

export function getDiagnosticosApi(userId, token) {
  return apiFetch(`/facecheck/v1/ultimo-informe?identificacion=${userId}`, {}, token);
}

export function createDiagnosticoApi(diagnostico, procedimientos, imageId, userId, token) {
  return apiFetch(`/facecheck/v1/analisis`, {
    method: 'POST',
    body: JSON.stringify({
      diagnostico, // 👈 puedes enviarlo como objeto
      procedimientos, // 👈 array directo
      identificacion: userId, // mejor usar el de tu contexto
      imagen_id: imageId
    }),
  }, token);
}

export async function uploadImage(photo, userId, token) {
  const formData = new FormData();
  formData.append("file", {
    uri: photo.uri,
    type: "image/jpeg",
    name: `${userId}-${Date.now()}.jpg`,
  });

  // Puedes agregar un título opcional si quieres
  formData.append("title", `${userId}-${Date.now()}`);

  try {
    const response = await apiFetch(`/wp/v2/media`, {
      method: "POST",
      body: formData,
    }, token);

    console.log("✅ Imagen subida:", response.id);
    return response.id;
  } catch (error) {
    console.error("❌ Error subiendo imagen:", error.message);
    throw error;
  }
}
