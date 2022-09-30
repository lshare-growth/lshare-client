/* eslint-disable react/require-default-props */
import React from 'react';
import StyledButton from './style';

type TextButtonProps = {
  mode?: 'default' | 'accent';
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  handleClick: () => void;
};

const TextButton = ({
  mode = 'default',
  children,
  className,
  disabled,
  handleClick,
}: TextButtonProps) => (
  <StyledButton
    className={className}
    handleClick={handleClick}
    disabled={disabled}
    mode={mode}
  >
    {children}
  </StyledButton>
);

export default TextButton;
