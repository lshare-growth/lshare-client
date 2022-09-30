/* eslint-disable react/jsx-no-useless-fragment */
import { ReactNode } from 'react';
import DoubleButton from '@components/Modal/DoubleButton';

type DoubleButtonControlProps = {
  children: ReactNode[];
  // eslint-disable-next-line react/require-default-props
  className?: string;
  handleClickLeft: () => void;
  handleClickRight: () => void;
};

const DoubleButtonControl = ({ className, children, handleClickLeft, handleClickRight }: DoubleButtonControlProps) => (
  <DoubleButton className={className} handleClickLeft={handleClickLeft} handleClickRight={handleClickRight}>
    {children[0]}
    {children[1]}
  </DoubleButton>
);

export default DoubleButtonControl;
