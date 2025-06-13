import { useDispatch, useSelector } from 'react-redux';
import { api } from '../api';
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from '../store';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      console.log(data)
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      console.log(data)
      dispatch(onLogin({ name: data.nombre, uid: data.token, rol: data.rol }));

    } catch (error) {
      dispatch(onLogout(error.response?.data?.message || 'Credenciales incorrectas'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async (formData) => {
    dispatch(onChecking());
    try {
      const { data } = await api.post('/api/auth/register', formData);
      console.log(data)

      dispatch(onLogout('Registrado correctamente. Iniciá sesión.'));
    } catch (error) {
      dispatch(onLogout(error.response?.data?.error || 'Error al registrar'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout());

    try {
        const { data } = await api.get('/api/auth/renew');
       console.log(data)
        localStorage.setItem('token', data.token );
        localStorage.setItem('token-init-date', new Date().getTime() );
     
        dispatch( onLogin({ name: data.nombre, uid: data.token, rol: data.rol }) );
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  return {
    errorMessage,
    status,
    user,

    checkAuthToken,
    startLogin,
    startLogout,
    startRegister,
  };
};
