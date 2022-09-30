/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/require-default-props */
import { ReactNode } from 'react';
import Title from '@components/Modal/Title';
import Article from '@components/Modal/Article';
import Content from '@components/Modal/Content';
import { contentSizeType } from '@components/types/Modal';

type DoubleButtonModalProps = {
  className?: string;
  children: ReactNode[];
  size: contentSizeType;
};

const DoubleButtonContent = ({ className, children, size }: DoubleButtonModalProps) => (
  <Content className={className} size={size}>
    <Title>{children[0]}</Title>
    <Article>{children[1]}</Article>
  </Content>
);

export default DoubleButtonContent;
