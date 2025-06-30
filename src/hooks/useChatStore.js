import { useDispatch, useSelector } from "react-redux";
import {
  onStartChatLoading,
  onLoadMensajes,
  onErrorChat,
} from "../store/chat/chatSlice";
import { api } from "../helpers";

export const useChatStore = () => {
  const dispatch = useDispatch();
  const { mensajesPorMascota, isLoading, error } = useSelector((state) => state.chat);

  const loadMensajes = async (id_mascota) => {
    dispatch(onStartChatLoading());
    try {
      const { data } = await api.get(`/api/chat/${id_mascota}`);
      dispatch(onLoadMensajes({ id_mascota, mensajes: data }));
    } catch (err) {
      dispatch(onErrorChat("Error al cargar mensajes"));
    }
  };

  const sendMensaje = async (id_mascota, mensaje) => {
    try {
      await api.post(
        "/api/chat",
        { id_mascota, mensaje },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Re-cargar mensajes después de enviar
      await loadMensajes(id_mascota);
    } catch (err) {
      dispatch(onErrorChat("Error al enviar mensaje"));
    }
  };

  return {
    mensajesPorMascota,
    isLoading,
    error,

    // Funciones
    loadMensajes,
    sendMensaje,
  };
};
