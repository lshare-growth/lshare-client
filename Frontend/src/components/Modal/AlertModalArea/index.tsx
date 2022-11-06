/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import { ReactNode } from 'react';
import { contentSizeType } from '@components/types/Modal';
import * as S from './style';

type AlertModalAreaProps = {
  className?: string;
  size: contentSizeType;
  children: ReactNode;
  handleClickCancel: () => void;
};

const AlertModalArea = ({ className, size, children, handleClickCancel }: AlertModalAreaProps) => (
  <S.Container size={size} className={className}>
    {children}
    {/* <S.CustomIcon mode="delete" handleClick={handleClickCancel} /> */}
  </S.Container>
);

export default AlertModalArea;
