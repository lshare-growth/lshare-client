/* eslint-disable react/require-default-props */
import Icon from '@common/Icon';

import * as S from './style';

type SelectProps = {
  handleMouseOver?: () => void;
  handleMouseOut?: () => void;
  handleMouseDown?: () => void;
  handleMouseUp?: () => void;
  selectTitle: string;
  handleClick?: () => void;
  className?: string;
};

const Select = ({
  handleMouseOver,
  handleMouseOut,
  handleMouseDown,
  handleMouseUp,
  selectTitle,
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
    <S.SelectTitle>{selectTitle}</S.SelectTitle>
    <S.IconContainer>
      <Icon mode="down" />
    </S.IconContainer>
  </S.Select>
);

export default Select;
