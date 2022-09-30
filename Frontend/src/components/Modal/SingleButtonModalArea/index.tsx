/* eslint-disable react/require-default-props */
import { ReactNode } from 'react';
import SingleButtonContent from '@components/Modal/SingleButtonContent';
import SingleButtonControl from '@components/Modal/SingleButtonControl';
import { contentSizeType } from '@components/types/Modal';
import * as S from './style';

type SingleButtonContentSizeType = 'xlarge' | 'large';

type SingleButtonModalAreaProps = {
  className?: string;
  size: contentSizeType;
  buttonSize?: SingleButtonContentSizeType;
  children: ReactNode[];
  handleClick: () => void;
  handleClickCancel: () => void;
};

const SingleButtonModalArea = ({ className, size, buttonSize, children, handleClick, handleClickCancel }: SingleButtonModalAreaProps) => (
  <>
    <S.IconContainer>
      <S.CustomIcon mode="cancel" handleClick={handleClickCancel} />
    </S.IconContainer>
    <S.Container className={className}>
      <SingleButtonContent size={size}>
        {children[0]}
        {children[1]}
      </SingleButtonContent>
      <SingleButtonControl size={buttonSize} handleClick={handleClick}>
        {children[2]}
      </SingleButtonControl>
    </S.Container>
  </>
);

export default SingleButtonModalArea;
