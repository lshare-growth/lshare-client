/* eslint-disable no-unused-vars */
import ArticleContent from '@components/Modal/SingleButtonComponents/ArticleContent';
import ButtonContent from '@components/Modal/SingleButtonComponents/ButtonContent';
import { LOGIN_TITLE, LOGIN_BUTTON_CONTENT, SIGN_UP_BUTTON_CONTENT } from '@components/Modal/constants';
import { loginExplains } from '@components/Modal/SingleButtonComponents/constants';
import axios, { AxiosResponse } from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useLayoutEffect, useState } from 'react';
import Button from '@components/common/Button';
import { useRecoilState } from 'recoil';
import previousPathNameState from '@store/PreviousPathName';
import { LOAD_PATH, ETC_PATH, MAIN_PATH, SERVER_ERROR_PATH, NEW_STUDY_PATH, UPDATE_PATH, MEMBER_EDIT_PATH, LANDING_PATH } from '../../constants/route';
import * as S from './style';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  type stateKeyType = 'previousPathname';
  type stateType = Record<stateKeyType, any>;
  const state = location.state as stateType;
  const [previousPathName, setPreviousPathName] = useRecoilState(previousPathNameState);

  useEffect(() => {
    const previousPath = sessionStorage.getItem('previousPath');
    sessionStorage.removeItem('previousPath');
    if (previousPath) {
      navigate(`${previousPath}`);
    }
  }, []);

  const handleClickLoginButton = () => {
    // TODO: 헤더와 중복제거
    const goGithubLogin = async () => {
      try {
        const url: AxiosResponse = await axios.get(`${process.env.END_POINT}api/oauth/login`);
        sessionStorage.setItem('destination', `${location?.pathname}${location?.search}`);
        window.location.href = url.data;
      } catch (error: any) {
        if (error.response.status === 404) {
          navigate(`${ETC_PATH}`);
          return;
        }
        if (error.response.status === 500) {
          navigate(`${SERVER_ERROR_PATH}`);
        }
      }
    };

    const previousPath = state?.previousPathname;
    if (previousPath) {
      sessionStorage.setItem('previousPath', previousPath);
    }
    goGithubLogin();
  };

  const handleClickSignUpButton = () => {
    const GITHUB_SIGNUP_PAGE = 'https://github.com/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home';
    window.location.href = GITHUB_SIGNUP_PAGE;
  };

  const handleClickHome = () => {
    navigate(`${LANDING_PATH}`);
  };

  return (
    <S.Container>
      <S.FlexBox>
        <S.CustomTitle>{LOGIN_TITLE}</S.CustomTitle>
        <ArticleContent items={loginExplains} />
        <S.ButtonsContainer>
          <S.ButtonContainer>
            <S.CustomButton size="large" handleClick={handleClickLoginButton}>
              <ButtonContent content={LOGIN_BUTTON_CONTENT} />
            </S.CustomButton>
            <S.HomeButton size="large" handleClick={handleClickHome}>
              홈으로 이동
            </S.HomeButton>
          </S.ButtonContainer>
        </S.ButtonsContainer>
      </S.FlexBox>
    </S.Container>
  );
};

export default Login;
