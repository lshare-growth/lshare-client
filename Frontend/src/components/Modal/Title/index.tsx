import { ReactNode } from 'react';
import * as S from './style';

type TitleProps = {
  children: ReactNode;
  // eslint-disable-next-line react/require-default-props
  className?: string;
};

const Title = ({ className, children }: TitleProps) => (
  <S.Title className={className}>
    <S.HighlightTitle>{children}</S.HighlightTitle>
  </S.Title>
);

export default Title;
