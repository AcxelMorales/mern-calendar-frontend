import { useDispatch, useSelector } from 'react-redux';

import { calendarApi } from '../api';

import { clearErrorMessage, onChecking, onLoging, onLogout } from '../store';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const disptach = useDispatch();

  const startLogin = async ({ email, password }) => {
    disptach(onChecking());

    try {
      const { data } = await calendarApi.post(`/auth/`, {
        email,
        password,
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      disptach(onLoging({ name: data.name, uid: data.uid }));
    } catch (error) {
      disptach(onLogout('Credenciales incorrectas'));
      setTimeout(() => {
        disptach(clearErrorMessage());
      }, 1000);
    }
  };

  return {
    status,
    user,
    errorMessage,
    startLogin,
  };
};
