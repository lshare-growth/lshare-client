/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState, useEffect } from 'react';
import Login from '@pages/Login';
import LoadingSpinner from '@common/LoadingSpinner';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import useLogOut from '@hooks/useLogout';
import { Cookies } from 'react-cookie';
import loginInfoState from '@store/LoginInfo';
import { useRecoilState } from 'recoil';
import userInfosState from '@store/UserInfos';
import { getHeaders } from '@pages/util';
import * as S from './style';
import { STUDY_PATH, MAIN_PATH, NEW_STUDY_PATH, UPDATE_PATH, MEMBER_EDIT_PATH, ETC_PATH, LANDING_PATH, LOGIN_PATH, SERVER_ERROR_PATH, FORBIDDEN_PATH } from '../../constants/route';

type AuthorizedNewLayoutProps = {
  children: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
  url: string;
  params?: Record<any, any>;
};

// type RedirectedLayoutProps = {
//   children: React.ReactNode;
//   studyId: number;
// };

// eslint-disable-next-line no-unused-vars
const AuthorizedNewLayout = ({ children, url, params }: AuthorizedNewLayoutProps) => {
  const { logout } = useLogOut();
  const [isAuthorizedPage, setIsAuthorizedPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const cookies = new Cookies();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);
  const [userInfos, setUserInfos] = useRecoilState(userInfosState);

  useEffect(() => {
    const studyId = location.search.split('study_id=')[1];
    // 접근 권한 api요청
    const investigateAuthorization = async () => {
      const token = localStorage.getItem('accessToken');

      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();

      const body = token
        ? {
            params: {
              studyId,
            },
            headers,
          }
        : {
            params: {
              studyId,
            },
          };
      try {
        const response = await axios.get(`${process.env.END_POINT}${url}`, body);
        setIsLoading(false);
        if (response.status === 200) {
          setIsAuthorizedPage(true);
        }
      } catch (error: any) {
        setIsLoading(false);
        setIsAuthorizedPage(false);

        if (error.response.status === 401) {
          logout();
          navigate(`${LOGIN_PATH}`, { state: { previousPathname: `${location?.pathname}${location?.search}` } });
          return;
        }

        if (error.response.status === 403) {
          navigate(`${FORBIDDEN_PATH}`);
          return;
        }

        if (error.response.status === 404) {
          navigate(`${ETC_PATH}`);
          return;
        }

        if (error.response.status === 500) {
          navigate(`${SERVER_ERROR_PATH}`);
        }
      }
    };

    setIsLoading(true);

    investigateAuthorization();
  }, []);

  useEffect(() => {
    const isLogined = cookies.get('logined');
    setLoginInfo(isLogined);
    if (isLogined || isLogined === 'true') {
      return;
    }

    logout();

    if (location.pathname === NEW_STUDY_PATH) {
      // navigate(`${MAIN_PATH}?page=1`, { state: { isLogouted: true } });
      navigate(`${MAIN_PATH}`, { state: { isLogouted: true } });
      return;
    }

    if (location.pathname === UPDATE_PATH) {
      const studyId = location.search.split('study_id=')[1];
      navigate(`${STUDY_PATH}/${studyId}`, { state: { isLogouted: true } });
      return;
    }

    if (location.pathname === MEMBER_EDIT_PATH) {
      navigate(`${LANDING_PATH}`, { state: { isLogouted: true } });
    }
  }, []);

  return (
    <>
      {isLoading && (
        <S.LoadingContainer>
          <LoadingSpinner size="large" />
        </S.LoadingContainer>
      )}
      {!isLoading &&
        (isAuthorizedPage ? (
          // <S.Container>
          //   <S.CustomHeader type="header" />
          //   <S.Main>{children}</S.Main>
          //   <Footer />
          // </S.Container>
          children
        ) : (
          <Login />
        ))}
    </>
  );
};

// const AuthorizedLayout = ({ children, studyId }: AuthorizedLayoutProps) => {
//   return <RedirectedLayout studyId={studyId}>{children}</RedirectedLayout>;
// };

export default AuthorizedNewLayout;
