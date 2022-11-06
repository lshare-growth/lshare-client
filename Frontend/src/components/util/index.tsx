import { useRecoilState } from 'recoil';
import userInfosState from '@store/UserInfos';
import { Cookies } from 'react-cookie';
// import { LOGIN_PATH } from '../../constants/route';

const logout = () => {
  // eslint-disable-next-line no-unused-vars
  const [userInfos, setUserInfos] = useRecoilState(userInfosState);
  // eslint-disable-next-line no-unused-vars
  const cookies = new Cookies();
  localStorage.removeItem('accessToken');
  // localStorage.removeItem('refreshToken');
  // localStorage.removeItem('userInfos');
  // localStorage.removeItem('tags');
  setUserInfos({
    memberId: 0,
    nickName: '',
    notification: false,
    profileImage: '',
  });
  cookies.remove('logined');
};

export default logout;
