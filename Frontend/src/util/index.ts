import { useNavigate } from 'react-router-dom';
import { decrypt } from '@pages/util';
import { Cookies } from 'react-cookie';
import { LOGIN_PATH } from '../constants/route';

const navigate = useNavigate();
type stateKeyType = 'previousPathname';
type stateType = Record<stateKeyType, string>;

export const login = (state: stateType) => {
  navigate(`${LOGIN_PATH}`, { state });
};

export const getAccessToken = () => {
  const encodedToken = localStorage.getItem('SEC_5AKWE1');
  if (!encodedToken) {
    return encodedToken;
  }
  const accessToken = decrypt(encodedToken, `${process.env.SECURE_ACCESS_TOKEN_KEY}`);
  return accessToken;
};

export const getRefreshToken = () => {
  const cookies = new Cookies();
  const encodedToken = cookies.get('SEC_EKIL15');
  if (!encodedToken) {
    return encodedToken;
  }
  const refreshToken = decrypt(encodedToken, `${process.env.SECURE_REFRESH_TOKEN_KEY}`);
  return refreshToken;
};
