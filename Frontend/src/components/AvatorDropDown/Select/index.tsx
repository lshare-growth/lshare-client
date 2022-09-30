/* eslint-disable react/require-default-props */
import { ReactNode } from 'react';
import * as S from './style';

type SelectProps = {
  handleMouseOver?: () => void;
  handleMouseOut?: () => void;
  handleMouseDown?: () => void;
  handleMouseUp?: () => void;
  children: ReactNode;
  handleClick?: () => void;
  className?: string;
};

const Select = ({
  handleMouseOver,
  handleMouseOut,
  handleMouseDown,
  handleMouseUp,
  children,
  handleClick,
  className,
}: SelectProps) => (
  <S.Select
    onMouseOver={handleMouseOver}
    onMouseOut={handleMouseOut}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
    onClick={handleClick}
    className={className}
  >
    <S.DropDown type="checkbox" />
    <S.SelectTitle>{children}</S.SelectTitle>
  </S.Select>
);

export default Select;
