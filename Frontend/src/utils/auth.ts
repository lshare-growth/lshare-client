import { Cookies } from 'react-cookie';

export const logout = () => {
  const cookies = new Cookies();
  localStorage.removeItem('accessToken');
  cookies.set('logined', 'false', {
    path: '/',
  });
};

export const getHeaders = () => {
  const token = localStorage.getItem('accessToken');

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return token ? { headers } : {};
};
