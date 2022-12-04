import axios from 'axios';
import { logout } from '@utils/auth';
import { ETC_PATH, SERVER_ERROR_PATH, LOGIN_PATH } from '../constants/route';

const api = axios.create({
  baseURL: `${process.env.END_POINT}`,
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const {
      response: { status },
    } = error;

    if (status === 401) {
      logout();
      sessionStorage.setItem('previousPathnameState', window.location.pathname);
      window.location.href = `${LOGIN_PATH}`;
    } else if (status === 404) {
      window.location.href = `${ETC_PATH}`;
    } else if (status === 500) {
      window.location.href = `${SERVER_ERROR_PATH}`;
    }
  }
);

export default api;
