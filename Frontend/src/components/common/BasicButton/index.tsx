/* eslint-disable react/require-default-props */
import React, { forwardRef } from 'react';
import StyledButton from './style';

type BasicButtonProps = {
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  handleClick?: () => void;
};

type Ref = HTMLButtonElement;

const BasicButton = forwardRef<Ref, BasicButtonProps>(({ disabled = false, children = '', className, handleClick }, ref) => (
  <StyledButton ref={ref} type="button" disabled={disabled} className={className} onClick={handleClick}>
    {children}
  </StyledButton>
));

export default BasicButton;
