// src/store/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'checking',
  user: null,
  errorMessage: null,
  successMessage: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = 'checking';
      state.errorMessage = null;
      state.successMessage = null;
    },
    onLogin: (state, action) => {
      state.status = 'authenticated';
      state.user = action.payload;
      state.errorMessage = null;
      state.successMessage = null;
    },
    onLogout: (state, action) => {
      state.status = 'not-authenticated';
      state.user = null;
      state.errorMessage = action.payload || null;
      state.successMessage = null;
    },
    onRegisterSuccess: (state, action) => {
      state.status = 'not-authenticated';
      state.user = null;
      state.errorMessage = null;
      state.successMessage = action.payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
});

export const {
  onChecking,
  onLogin,
  onLogout,
  onRegisterSuccess,
  clearErrorMessage,
  clearSuccessMessage,
} = authSlice.actions;

export default authSlice.reducer;
