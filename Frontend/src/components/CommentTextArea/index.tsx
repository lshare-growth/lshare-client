/* eslint-disable react/require-default-props */
import { ChangeEvent } from 'react';
import sizeType from '@components/types/CommentTextArea';
import * as S from './style';
import {
  AUTHORIZED_DEFAULT_PALCEHOLDER,
  DEFAULT_PALCEHOLDER,
  DEFAULT_SIZE,
} from './constants';

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

const CommentTextArea = ({
  id,
  isAuthorized,
  placeholder,
  size = DEFAULT_SIZE,
  value,
  className,
  handleChangeValue,
}: CommentTextAreaPropsType) => {
  const handleFocus = () => {
    if (isAuthorized) {
      return;
    }

    // TODO: 로그인으로 연결
    console.log('go to login');
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
        placeholder={
          placeholder || isAuthorized
            ? AUTHORIZED_DEFAULT_PALCEHOLDER
            : DEFAULT_PALCEHOLDER
        }
        size={size}
        value={value}
        handleChange={handleChange}
        handleFocus={handleFocus}
      />
    </>
  );
};

export default CommentTextArea;
