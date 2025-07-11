// src/hooks/useAuthStore.js
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../helpers';
import {
  onChecking,
  onStopChecking,
  onLogin,
  onLogout,
  onRegisterSuccess,
  onClearErrorMessage,
  onClearSuccessMessage,
} from '../store';

export const useAuthStore = () => {
  const { status, user, errorMessage, successMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin(data));
    } catch (error) {
      dispatch(onLogout(error.response?.data?.message || 'Credenciales incorrectas'));
    }
  };

  const startRegister = async (formData) => {
    dispatch(onChecking());
    try {
      await api.post('/api/auth/register', formData);
      dispatch(onRegisterSuccess('Registrado correctamente. Iniciá sesión.'));
    } catch (error) {
      dispatch(onLogout(error.response?.data?.message || 'Error al registrar'));
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await api.get('/api/auth/renew');
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin(data));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  const startUpdateUser = async (formData) => {
    dispatch(onChecking());
    try {
      const { data } = await api.put('/api/auth/update-user', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(onLogin({ ...user, ...data }));
      dispatch(onClearErrorMessage());
      return true;
    } catch (error) {
      dispatch(onLogout(error.response?.data?.message || 'Error al actualizar perfil'));
      setTimeout(() => dispatch(onClearErrorMessage()), 10);
      return false;
    }
  };

  const startDeleteUser = async () => {
    dispatch(onChecking());
    try {
      const res = await api.delete('/api/auth/delete-user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.status === 200) {
        dispatch(onLogout());
        localStorage.removeItem('token');
        localStorage.removeItem('token-init-date');
        return true;
      }
      throw new Error('No se pudo eliminar la cuenta');
    } catch (error) {
      dispatch(onLogout(error.response?.data?.message || 'Error al eliminar cuenta'));
      setTimeout(() => dispatch(onClearErrorMessage()), 10);
      return false;
    }
  };

const startRequestReset = async (email) => {
  dispatch(onChecking());
  try {
    const { data } = await api.post('/api/auth/request-reset', { email });
    // Podés usar onLogout solo para dejar el estado como "not-authenticated"
    dispatch(onLogout());
    return { ok: true, msg: data.message || 'Código enviado' };
  } catch (error) {
    dispatch(onLogout());
    return {
      ok: false,
      msg: error.response?.data?.message || 'Error al enviar el código',
    };
  }
};

const verifyResetPassword = async ({ email, code }) => {
  if (!email || !code) {
    return { ok: false, msg: 'Email y código son requeridos' };
  }

  dispatch(onChecking());

  try {
    const { data } = await api.post('/api/auth/verify-reset-code', {
      email,
      code,
    });
    dispatch(onStopChecking());
    return { ok: true, msg: data.message || 'Código verificado', data };
  } catch (error) {
    dispatch(onStopChecking());
    return {
      ok: false,
      msg: error.response?.data?.message || 'Error al verificar el código',
    };
  }
};


const startResetPassword = async ({ email, code, newPassword }) => {
  dispatch(onChecking());
  try {
    const { data } = await api.post('/api/auth/reset-password', {
      email,
      code,
      new_password: newPassword,
    });
    dispatch(onLogout());
    return { ok: true, msg: data.message || 'Contraseña actualizada' };
  } catch (error) {
    dispatch(onLogout());
    return {
      ok: false,
      msg: error.response?.data?.message || 'Error al cambiar contraseña',
    };
  }
};
const clearErrorMessage=()=>{
  dispatch(onClearErrorMessage());
}
const clearSuccessMessage=()=>{
  dispatch(onClearSuccessMessage());
} 

return {
  // State
  status,
  user,
  errorMessage,
  successMessage,

  // Actions
  startLogin,
  startRegister,
  checkAuthToken,
  startLogout,
  startUpdateUser,
  startDeleteUser,
  startRequestReset,
  startResetPassword,
  verifyResetPassword,

  clearErrorMessage,
  clearSuccessMessage,
};
};