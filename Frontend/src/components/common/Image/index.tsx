/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import React from 'react';
import StyledImage from './style';
import { shapeTyep, sizeType, DEFAULT_IMAGES } from './constants';

type ImageProps = {
  mode: shapeTyep;
  size: sizeType;
  className?: string;
  src?: string;
  alt?: string;
  handleClick?: () => void;
  handleError: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
};

const Image = ({
  mode,
  size,
  className,
  src,
  alt = 'defalut image',
  handleClick,
  handleError,
}: ImageProps) => (
  <StyledImage
    className={className}
    mode={mode}
    size={size}
    src={src || DEFAULT_IMAGES[size]}
    alt={alt}
    onClick={handleClick}
    onError={handleError}
  />
);

export default Image;
