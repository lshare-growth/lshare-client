/* eslint-disable react/require-default-props */
import React from 'react';

import StyledButton from './style';

type ButtonProps = {
  mode?: string;
  size?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  handleClick?: () => void;
};

const Button = ({ mode = 'default', size = 'medium', disabled = false, children = '', className, handleClick }: ButtonProps) => (
  <StyledButton mode={mode} size={size} disabled={disabled} className={className} handleClick={handleClick}>
    {children}
  </StyledButton>
);

export default Button;
