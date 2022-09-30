/* eslint-disable react/require-default-props */
import React from 'react';
import StyledLabel from './style';

type labelType = {
  mode: 'default' | 'accent' | 'done';
  size: 'medium' | 'small';
  children?: React.ReactNode;
  className?: string;
};

const Label = ({
  mode = 'default',
  size = 'small',
  children,
  className,
}: labelType) => (
  <StyledLabel mode={mode} size={size} className={className}>
    {children}
  </StyledLabel>
);

export default Label;
