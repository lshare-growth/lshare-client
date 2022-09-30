import { ReactNode } from 'react';
import Divider from '@components/common/Divider';
import * as S from './style';

type DoubleButtonProps = {
  children: ReactNode[];
  // eslint-disable-next-line react/require-default-props
  className?: string;
  handleClickLeft: () => void;
  handleClickRight: () => void;
};

const DoubleButton = ({ className, children, handleClickLeft, handleClickRight }: DoubleButtonProps) => (
  <div className={className}>
    <Divider direction="horizontal" />
    <S.BetweenBox>
      <S.LeftBasicButton handleClick={handleClickLeft}>{children[0]}</S.LeftBasicButton>
      <S.DividerContainer>
        <Divider direction="vertical" />
      </S.DividerContainer>
      <S.RightBasicButton handleClick={handleClickRight}>{children[1]}</S.RightBasicButton>
    </S.BetweenBox>
  </div>
);

export default DoubleButton;
