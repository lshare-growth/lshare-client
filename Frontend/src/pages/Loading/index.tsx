/* eslint-disable no-unused-vars */
import LoadingSpinner from '@components/common/LoadingSpinner';
import StyledContainer from '@pages/Loading/style';
import { useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import userInfosState from '@store/UserInfos';
import useLogOut from '@hooks/useLogout';
import { Cookies } from 'react-cookie';
import loginInfoState from '@store/LoginInfo';
import { encrypt, getHeaders } from '@pages/util';
import { LANDING_PATH, MAIN_PATH, SERVER_ERROR_PATH } from '../../constants/route';

const Loading = () => {
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-unused-vars
  const [currentUserInfos, setUserInfos] = useRecoilState(userInfosState);
  const location = useLocation();
  const navigate = useNavigate();
  const CALL_BACK_URL = 'api/oauth/callback/github?code=';
  const cookies = new Cookies();
  const { logout } = useLogOut();
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);

  useEffect(() => {
    const codeDate = location.search;
    const code = codeDate.split('code=')[1];
    const myRefreshToken = cookies.get(`refreshtoken`);
    const headers = getHeaders();

    const body = myRefreshToken ? headers : {};

    const getToken = async (currentCode: string) => {
      try {
        const response = await axios.get(`${process.env.END_POINT}${CALL_BACK_URL}${currentCode}`);

        cookies.remove('logined', {
          path: '/',
        });

        const { memberid, notificationmessagereadstatus, profileimageurl, nickname, logined } = response.headers;
        // notificationmessagereadstatus
        // eslint-disable-next-line no-unused-vars
        const isLogined = logined.split('logined=')[1].split(';')[0];
        // const expires = new Date(logined.split('Expires=')[1].split(';')[0]);
        const maxAge = Number(logined.split('Max-Age=')[1].split(';')[0]);

        // // TODO: notificationread에 따라 알람 온지 표시하기
        const expires = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), new Date().getMinutes() + maxAge / 1000 / 60);
        cookies.set('logined', isLogined, {
          expires,
          path: '/',
        });

        setLoginInfo(isLogined);
        const newToken = response.data.accessToken;
        if (newToken) {
          localStorage.removeItem('accessToken');
          // const encodesAccessToken = encrypt(newToken, `${process.env.SECURE_ACCESS_TOKEN_KEY}`);
          localStorage.setItem('accessToken', newToken);
        }

        // TODO : encode 자체를 true, false값으로 할지 리팩토링 고민(헤더에서 오는 noticiation관련 정보가 바뀌면 다른 코드도 바꿔야하기 때문)
        // notification: notificationmessagereadstatus !== 'READ_ALL',
        if (response.headers) {
          const userInfos = {
            memberId: Number(memberid),
            nickName: nickname,
            notification: notificationmessagereadstatus !== 'READ_ALL',
            profileImage: profileimageurl,
          };
          const notification = notificationmessagereadstatus !== 'READ_ALL' ? 'true' : 'false';

          setUserInfos(userInfos);

          const encodedMemberId = encrypt(memberid, `${process.env.SECURE_ID_KEY}`);
          const encodedNickName = encrypt(nickname, `${process.env.SECURE_IDENTIFI_KEY}`);
          const encodedNotificationRead = encrypt(notification, `${process.env.SECURE_ALARM_KEY}`);
          const encodedProfileImage = encrypt(profileimageurl, `${process.env.SECURE_PROFILE_KEY}`);

          // cookies.set(`a`, encodedMemberId);
          // cookies.set(`b`, encodedNickName);
          // cookies.set(`c`, encodedNotificationRead);
          // cookies.set(`d`, encodedProfileImage);

          cookies.remove(`SEC_MITO78`, {
            path: '/',
          });
          cookies.remove(`SEC_3BKIF3`, {
            path: '/',
          });
          cookies.remove(`SEC_1RATI5`, {
            path: '/',
          });
          cookies.remove(`SEC_DMIF22`, {
            path: '/',
          });

          cookies.set(`SEC_MITO78`, encodedMemberId, {
            path: '/',
          });
          cookies.set(`SEC_3BKIF3`, encodedNickName, {
            path: '/',
          });
          cookies.set(`SEC_1RATI5`, encodedNotificationRead, {
            path: '/',
          });
          cookies.set(`SEC_DMIF22`, encodedProfileImage, {
            path: '/',
          });
        }

        // const targetInfos = localStorage.getItem('userInfos');
        // if (!targetInfos) {
        //   return;
        // }

        // const previousePathname = localStorage.getItem('previousePathname');
        // if (previousePathname) {
        //   localStorage.removeItem('previousePathname');
        //   navigate(`${previousePathname}`);
        // }

        // navigate(`${MAIN_PATH}`);
        const destionation = sessionStorage.getItem('destination');

        if (destionation) {
          sessionStorage.removeItem('destination');
          // navigate(`${destionation}`);
          //
          window.location.href = `${destionation}`;
        }

        // navigate(-1);
      } catch (error: any) {
        // if (error.response.status === 400) {
        //   navigate(`${LANDING_PATH}`);
        //   return;
        // }
        if (error.response.status === 401) {
          const destionation = sessionStorage.getItem('destination');
          if (destionation) {
            sessionStorage.removeItem('destination');
            window.location.href = `${destionation}`;
            return;
          }
          return;
        }
        if (error.response.status === 404) {
          const destionation = sessionStorage.getItem('destination');
          if (destionation) {
            sessionStorage.removeItem('destination');
            window.location.href = `${destionation}`;
            return;
          }
          navigate(`${LANDING_PATH}`);
          return;
        }
        if (error.response.status === 500) {
          const destionation = sessionStorage.getItem('destination');
          if (destionation) {
            sessionStorage.removeItem('destination');
            window.location.href = `${destionation}`;
            return;
          }
          navigate(`${SERVER_ERROR_PATH}`);
        }
      }
    };

    getToken(code);

    //
  }, []);

  return (
    <StyledContainer>
      <LoadingSpinner size="large" />
    </StyledContainer>
  );
};

export default Loading;
