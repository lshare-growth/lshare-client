/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/require-default-props */
import { ReactNode } from 'react';
import DoubleButtonContent from '@components/Modal/DoubleButtonContent';
import DoubleButtonControl from '@components/Modal/DoubleButtonControl';

type DoubleButtonModalAreaProps = {
  className?: string;
  children: ReactNode[];
  handleClickLeftButton: () => void;
  handleClickRightButton: () => void;
};

const DoubleButtonModalArea = ({ className, children, handleClickLeftButton, handleClickRightButton }: DoubleButtonModalAreaProps) => (
  <div className={className}>
    <DoubleButtonContent>
      {children[0]}
      {children[1]}
    </DoubleButtonContent>
    <DoubleButtonControl handleClickLeft={handleClickLeftButton} handleClickRight={handleClickRightButton}>
      {children[2]}
      {children[3]}
    </DoubleButtonControl>
  </div>
);

export default DoubleButtonModalArea;
