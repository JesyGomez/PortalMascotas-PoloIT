// src/store/admin/adminSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stats: null,
  solicitudes: [],
  mascotas: [],
  isLoading: false,
  error: null,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    onStartLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    onLoadStatsSuccess: (state, { payload }) => {
      state.stats = payload;
      state.isLoading = false;
    },
    onLoadSolicitudesSuccess: (state, { payload }) => {
      state.solicitudes = payload;
      state.isLoading = false;
    },
    onLoadMascotasSuccess: (state, { payload }) => {
      state.mascotas = payload;
      state.isLoading = false;
    },
    onLoadError: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const {
  onStartLoading,
  onLoadStatsSuccess,
  onLoadSolicitudesSuccess,
  onLoadMascotasSuccess,
  onLoadError,
} = adminSlice.actions;

export default adminSlice.reducer;
