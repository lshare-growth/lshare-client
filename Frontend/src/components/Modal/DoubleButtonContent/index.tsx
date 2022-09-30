/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/require-default-props */
import { ReactNode } from 'react';
import Title from '@components/Modal/Title';
import Article from '@components/Modal/Article';
import StyledContent from './style';

type DoubleButtonModalProps = {
  className?: string;
  children: ReactNode[];
};

const DoubleButtonContent = ({ className, children }: DoubleButtonModalProps) => (
  <StyledContent className={className}>
    <Title>{children[0]}</Title>
    <Article>{children[1]}</Article>
  </StyledContent>
);

export default DoubleButtonContent;
