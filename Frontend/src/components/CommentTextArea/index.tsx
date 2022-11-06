/* eslint-disable no-restricted-globals */
/* eslint-disable react/require-default-props */
import { ChangeEvent } from 'react';
import sizeType from '@components/types/CommentTextArea';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import useLogOut from '@hooks/useLogout';
import * as S from './style';
import { AUTHORIZED_DEFAULT_PALCEHOLDER, DEFAULT_PALCEHOLDER, DEFAULT_SIZE } from './constants';
import { ETC_PATH, SERVER_ERROR_PATH, LOGIN_PATH } from '../../constants/route';

type CommentTextAreaPropsType = {
  id: string;
  isAuthorized: boolean;
  placeholder?: string;
  size?: sizeType;
  value: string;
  className?: string;
  // eslint-disable-next-line no-unused-vars
  handleChangeValue: (value: string) => void;
};

const CommentTextArea = ({ id, isAuthorized, placeholder, size = DEFAULT_SIZE, value, className, handleChangeValue }: CommentTextAreaPropsType) => {
  const navigate = useNavigate();
  const { logout } = useLogOut();
  const handleFocus = () => {
    if (isAuthorized) {
      return;
    }

    const handleClickLogin = async () => {
      try {
        const url: AxiosResponse = await axios.get(`${process.env.END_POINT}api/oauth/login`);
        sessionStorage.setItem('destination', `${location?.pathname}${location?.search}`);
        window.location.href = url.data;
      } catch (error: any) {
        if (error.response.status === 401) {
          logout();
          navigate(`${LOGIN_PATH}`, { state: { previousPathname: location.pathname } });
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
    handleClickLogin();
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const currentValue = event.target.value;
    handleChangeValue(currentValue);
  };

  return (
    <>
      <S.Label htmlFor={id} />
      <S.CustomTextArea
        className={className}
        id={id}
        isAuthorized={isAuthorized}
        placeholder={placeholder || isAuthorized ? AUTHORIZED_DEFAULT_PALCEHOLDER : DEFAULT_PALCEHOLDER}
        size={size}
        value={value}
        handleChange={handleChange}
        handleFocus={handleFocus}
      />
    </>
  );
};

export default CommentTextArea;
