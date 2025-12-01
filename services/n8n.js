const N8N_URL = "https://n8n-jvzn.onrender.com/webhook/b9ff3f44-cd3d-4e95-865b-76ffc441f7be";
const N8N_URL_PRUEBA = "https://n8n-jvzn.onrender.com/webhook-test/b9ff3f44-cd3d-4e95-865b-76ffc441f7be";

export async function analyzeImage(photo) {
  const formData = new FormData();
  formData.append("file", {
    uri: photo.uri,
    type: "image/jpeg",
    name: "photo.jpg",
  });

  const response = await fetch(N8N_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Error en N8N");
  const data = await response.json();
  if (!data || !data[0]) throw new Error("Respuesta inválida desde N8N");

  return data[0];
}