import { ReactNode } from 'react';
import StyledContainer from './style';

type SingleButtonProps = {
  children: ReactNode;
  // eslint-disable-next-line react/require-default-props
  className?: string;
};

const SingleButton = ({ className, children }: SingleButtonProps) => <StyledContainer className={className}>{children}</StyledContainer>;

export default SingleButton;
