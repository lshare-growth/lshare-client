/* eslint-disable react/require-default-props */
import React, { forwardRef } from 'react';

import StyledButton from './style';

type ButtonProps = {
  mode?: string;
  size?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  handleClick?: () => void;
};

type Ref = HTMLButtonElement;

const Button = forwardRef<Ref, ButtonProps>(({ mode = 'default', size = 'medium', disabled = false, children = '', className, handleClick }, ref) => (
  <StyledButton ref={ref} mode={mode} size={size} disabled={disabled} className={className} handleClick={handleClick}>
    {children}
  </StyledButton>
));

export default Button;
