// src/hooks/useAdminStore.js
import { useDispatch, useSelector } from 'react-redux';
import {
  onStartLoading,
  onLoadStatsSuccess,
  onLoadSolicitudesSuccess,
  onLoadMascotasSuccess,
  onLoadError,
} from '../store/admin/adminSlice';
import { api } from '../helpers';

export const useAdminStore = () => {
  const dispatch = useDispatch();
  const { stats, solicitudes, mascotas, isLoading, error } = useSelector((state) => state.admin);

  const loadAdminStats = async () => {
    dispatch(onStartLoading());
    try {
      const { data } = await api.get('/api/admin/stats');
      dispatch(onLoadStatsSuccess(data));
    } catch (err) {
      dispatch(onLoadError('Error al cargar estadísticas'));
    }
  };

  const loadSolicitudes = async () => {
    dispatch(onStartLoading());
    try {
      const { data } = await api.get('/api/solicitudes');
      dispatch(onLoadSolicitudesSuccess(data));
    } catch (err) {
      dispatch(onLoadError('Error al cargar solicitudes'));
    }
  };

  const updateSolicitudEstado = async (id, estado) => {
    try {
      await api.put(`/api/solicitudes/${id}`, { estado });
      await loadSolicitudes();
    } catch (err) {
      dispatch(onLoadError('Error al actualizar estado de la solicitud'));
    }
  };

  const deleteSolicitud = async (id) => {
    try {
      await api.delete(`/api/solicitudes/${id}`);
      await loadSolicitudes();
    } catch (err) {
      dispatch(onLoadError('Error al eliminar solicitud'));
    }
  };

  // 👉 NUEVO: mascotas
  const loadMascotas = async () => {
    dispatch(onStartLoading());
    try {
      const { data } = await api.get('/api/mascotas');
      dispatch(onLoadMascotasSuccess(data.data));
    } catch (err) {
      dispatch(onLoadError('Error al cargar mascotas'));
    }
  };

  const createOrUpdateMascota = async (mascota, id = null) => {
    try {
      if (id) {
        await api.put(`/api/mascotas/${id}`, mascota);
      } else {
        await api.post('/api/mascotas', mascota);
      }
      await loadMascotas();
    } catch (err) {
      dispatch(onLoadError('Error al guardar mascota'));
    }
  };

  const deleteMascota = async (id) => {
    try {
      await api.delete(`/api/mascotas/${id}`);
      await loadMascotas();
    } catch (err) {
      dispatch(onLoadError('Error al eliminar mascota'));
    }
  };

  return {
    stats,
    solicitudes,
    mascotas,
    isLoading,
    error,

    // Stats y solicitudes
    loadAdminStats,
    loadSolicitudes,
    updateSolicitudEstado,
    deleteSolicitud,

    // Mascotas
    loadMascotas,
    createOrUpdateMascota,
    deleteMascota,
  };
};
