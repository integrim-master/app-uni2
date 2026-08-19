import api from "@/src/api/base";

export type EditProfilePayload = {
  id?: number;
  user_name?: string;
  nombre?: string;
  fnacimiento?: string;
  type_id?: string | number | null;
  identificacion?: string;
  telefono?: string;
  pais_residencia?: string;
  provincia?: string;
  ciudad?: string;
  postal?: string;
  pais_origen?: string;
};

export const MeService = {
  editProfileById: async (payload: EditProfilePayload) => {
    const response = await api.put(`/wp-json/careme/v1/me/update`, payload);
    return response.data;
  },

  getProfile: async () => {
    try {
      const response = await api.get(`/wp-json/careme/v1/me/data`);
      return response.data;
    } catch (error: any) {
      console.error("Error en al obtener el perfil:", error);
      throw error;
    }
  },
};
