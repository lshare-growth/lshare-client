/* eslint-disable react/require-default-props */
import React from 'react';
import * as S from './style';

type IconCountBoxProps = {
  className?: string;
  children?: React.ReactNode;
  count: number | string;
  handleClick?: () => void;
  isShort?: boolean;
};

const cacluateCount = (counting: number | string) => {
  const targetNum = `${counting}`;
  if (targetNum.length === 4) {
    return `${targetNum[0]}천+`;
  }

  if (targetNum.length === 5) {
    return `${targetNum.slice(0, targetNum.length - 4)}만+`;
  }

  return counting;
};

const IconCountBox = ({ className = 'reaction', children, count, handleClick, isShort }: IconCountBoxProps) => (
  <S.Container className={className} onClick={handleClick}>
    <span className="reaction">{children}</span>
    <span className="reaction">
      <S.Number className="reaction">{isShort ? cacluateCount(count) : count}</S.Number>
    </span>
  </S.Container>
);
export default IconCountBox;
