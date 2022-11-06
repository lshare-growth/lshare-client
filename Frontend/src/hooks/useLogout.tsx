/* eslint-disable no-unused-vars */
import { useRecoilState } from 'recoil';
import userInfosState from '@store/UserInfos';
import { Cookies, useCookies } from 'react-cookie';
import loginInfoState from '@store/LoginInfo';
import { useNavigate, useLocation } from 'react-router-dom';
import { LANDING_PATH, MAIN_PATH } from '../../src/constants/route';

type UseLogOutype = {
  logout: () => void;
};

const useLogOut = (): UseLogOutype => {
  const [userInfos, setUserInfos] = useRecoilState(userInfosState);
  const cookies = new Cookies();
  const [_, setCookie, removeCookie] = useCookies();
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem('accessToken');
    cookies.remove('logined', {
      path: '/',
    });
    cookies.remove('SEC_MITO78', {
      path: '/',
    });
    cookies.remove('SEC_3BKIF3', {
      path: '/',
    });
    cookies.remove('SEC_1RATI5', {
      path: '/',
    });
    cookies.remove('SEC_DMIF22', {
      path: '/',
    });

    setLoginInfo('false');
    setUserInfos({
      memberId: 0,
      nickName: '',
      notification: false,
      profileImage: '',
    });
  };

  return {
    logout,
  };
};

export default useLogOut;
