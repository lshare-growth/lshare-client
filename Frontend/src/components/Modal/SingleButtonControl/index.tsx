/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-useless-fragment */
import { ReactNode } from 'react';
import SingleButton from '@components/Modal/SingleButton';
import Button from '@common/Button';
import { SingleButtonContentSizeType } from '@components/types/Modal';

type SingleButtonControlProps = {
  children: ReactNode;
  className?: string;
  handleClick: () => void;
  size?: SingleButtonContentSizeType;
};

const SingleButtonControl = ({ className, children, size = 'large', handleClick }: SingleButtonControlProps) => (
  <SingleButton className={className}>
    <Button size={size} handleClick={handleClick}>
      {children}
    </Button>
  </SingleButton>
);

export default SingleButtonControl;
