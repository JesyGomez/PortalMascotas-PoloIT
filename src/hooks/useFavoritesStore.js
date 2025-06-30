// src/hooks/useFavoritosStore.js
import { useDispatch, useSelector } from "react-redux";
import { api } from "../helpers";
import { setFavoritos, addFavorito, removeFavorito } from "../store";

export const useFavoritesStore = () => {
  const dispatch = useDispatch();
  const { favoritos } = useSelector((state) => state.favorites);

  const loadFavoritos = async () => {
    try {
      const { data } = await api.get("/api/favoritos");
      const ids = data.map((f) => f.id);
      dispatch(setFavoritos(ids));
    } catch (error) {
      console.error("Error al cargar favoritos", error);
    }
  };

  const toggleFavorito = async (id_mascota) => {
    if (favoritos.includes(id_mascota)) {
      try {
        const {status}=await api.delete(`/api/favoritos/${id_mascota}`);
        dispatch(removeFavorito(id_mascota));
        return status;
      } catch (error) {
        console.error("Error al eliminar favorito", error);
      }
    } else {
      try {
        const {status}=await api.post(`/api/favoritos`,{ id_mascota });
        dispatch(addFavorito(id_mascota));
        return status;
      } catch (error) {
        console.error("Error al agregar favorito", error);
      }
    }
  };

  return {
    favoritos,
    loadFavoritos,
    toggleFavorito,
  };
};
