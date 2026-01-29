import api from "@/src/api/base";

export interface EditProfilePayload {
  id?: number;
  user_name?: string;
}

export async function editProfileById(payload: EditProfilePayload) {
  const response = await api.put(`/wp-json/careme/v1/me/update`, payload);
  return response.data;
}
