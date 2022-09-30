/* eslint-disable react/require-default-props */
import React from 'react';
import * as S from './style';

type IconCountBoxProps = {
  className?: string;
  children?: React.ReactNode;
  count: number | string;
  handleClick?: () => void;
};

const IconCountBox = ({ className, children, count, handleClick }: IconCountBoxProps) => (
  <S.Container className={className} onClick={handleClick}>
    {children}
    <S.Number>{count}</S.Number>
  </S.Container>
);
export default IconCountBox;
