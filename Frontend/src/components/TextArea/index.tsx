/* eslint-disable react/require-default-props */
// import { ChangeEvent, useState } from 'react';
import { ChangeEvent } from 'react';
import sizeType from '@components/types/TextArea';
import * as S from './style';
import { DEFAULT_PLACEHOLDER, DEFAULT_SIZE } from './constants';

type TextAreaPropsType = {
  id: string;
  className?: string;
  placeholder?: string;
  size?: sizeType;
  value: string;
  // eslint-disable-next-line no-unused-vars
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleFocus?: () => void;
};

const TextArea = ({
  id,
  placeholder = DEFAULT_PLACEHOLDER,
  size = DEFAULT_SIZE,
  value,
  className,
  handleChange,
  handleFocus,
}: TextAreaPropsType) => (
  <>
    <S.Label htmlFor={id} />
    <S.TextArea
      className={className}
      id={id}
      placeholder={placeholder}
      size={size}
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
    />
  </>
);

export default TextArea;
