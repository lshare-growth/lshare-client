/* eslint-disable react/require-default-props */
import React from 'react';
import StyledButton from './style';

type BasicButtonProps = {
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  handleClick?: () => void;
};

const BasicButton = ({ disabled = false, children = '', className, handleClick }: BasicButtonProps) => (
  <StyledButton type="button" disabled={disabled} className={className} onClick={handleClick}>
    {children}
  </StyledButton>
);

export default BasicButton;
