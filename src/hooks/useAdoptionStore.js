import { api } from "../helpers";

export const useAdoptionStore = () => {
  const sendAdoptionRequest = async (petId) => {
    try {
      const { data } = await api.post("/api/adopciones",{ id_mascota: petId });
      return { ok: true, msg: data.message };
    } catch (error) {
      return {
        ok: false,
        msg: error.response?.data?.message || "Error al enviar solicitud",
        status: error.response?.status || 500,
      };
    }
  };

  return { sendAdoptionRequest };
};
