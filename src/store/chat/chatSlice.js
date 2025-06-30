import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mensajesPorMascota: {},
  isLoading: false,
  error: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    onStartChatLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    onLoadMensajes: (state, { payload }) => {
      const { id_mascota, mensajes } = payload;
      state.mensajesPorMascota[id_mascota] = mensajes;
      state.isLoading = false;
    },
    onErrorChat: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { onStartChatLoading, onLoadMensajes, onErrorChat } = chatSlice.actions;
export default chatSlice.reducer;
