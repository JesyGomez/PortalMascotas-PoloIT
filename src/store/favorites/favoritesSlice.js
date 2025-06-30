// src/store/favoritos/favoritosSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoritos: [], // lista de ids de mascotas favoritas
};

export const favoritesSlice = createSlice({
  name: "favoritos",
  initialState,
  reducers: {
    setFavoritos: (state, action) => {
      state.favoritos = action.payload;
    },
    addFavorito: (state, action) => {
      if (!state.favoritos.includes(action.payload)) {
        state.favoritos.push(action.payload);
      }
    },
    removeFavorito: (state, action) => {
      state.favoritos = state.favoritos.filter((id) => id !== action.payload);
    },
  },
});

export const { setFavoritos, addFavorito, removeFavorito } = favoritesSlice.actions;
export default favoritesSlice.reducer;
