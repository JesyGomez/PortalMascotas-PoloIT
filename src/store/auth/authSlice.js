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
    onStopChecking: (state) => {
      if (state.status === 'checking') {
        state.status = 'idle';
      }
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
    onClearErrorMessage: (state) => {
      state.errorMessage = null;
    },
    onClearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
});

export const {
  onChecking,
  onStopChecking,
  onLogin,
  onLogout,
  onRegisterSuccess,
  onClearErrorMessage,
  onClearSuccessMessage,
} = authSlice.actions;

export default authSlice.reducer;
