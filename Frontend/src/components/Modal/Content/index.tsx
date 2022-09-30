/* eslint-disable react/require-default-props */
import { ReactNode } from 'react';
import { contentSizeType } from '@components/types/Modal';
import StyledContent from './style';

type ContentProps = {
  children: ReactNode;
  size?: contentSizeType;
  className?: string;
};

const Content = ({ className, children, size = 'medium' }: ContentProps) => (
  <StyledContent className={className} size={size}>
    {children}
  </StyledContent>
);

export default Content;
