import styled, { css } from 'styled-components';
import { shapeTyep, sizeType } from './constants';

const megaLargeSize = css`
  width: 386px;
  height: 386px;
`;

const xLargeSize = css`
  width: 96px;
  height: 96px;
`;

const largeSize = css`
  width: 84px;
  height: 84px;
`;

const mediumSize = css`
  width: 64px;
  height: 64px;
`;

const smallSize = css`
  width: 48px;
  height: 48px;
`;

const xSmallSize = css`
  width: 40px;
  height: 40px;
`;

const xxSmallSize = css`
  width: 24px;
  height: 24px;
`;

const squareStyle = css`
  border-radius: 2px;
`;

const circleStyle = css`
  border-radius: 50%;
`;

const sizes = {
  megaLarge: megaLargeSize,
  xlarge: xLargeSize,
  large: largeSize,
  medium: mediumSize,
  small: smallSize,
  xsmall: xSmallSize,
  xxsmall: xxSmallSize,
};

const shapes = {
  circle: circleStyle,
  square: squareStyle,
};

const StyledImage = styled.img<{
  mode: shapeTyep;
  size: sizeType;
}>`
  ${({ mode }) => shapes[mode]}
  ${({ size }) => sizes[size]}
  box-shadow: 0 3px 5px ${({ theme }) => theme.colors.line};
  object-fit: cover;
  cursor: pointer;
`;

export default StyledImage;
