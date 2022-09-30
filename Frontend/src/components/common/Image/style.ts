import styled, { css } from 'styled-components';
import { shapeTyep, sizeType } from './constants';

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

const squareStyle = css`
  border-radius: 2px;
`;

const circleStyle = css`
  border-radius: 50%;
`;

const sizes = {
  xlarge: xLargeSize,
  large: largeSize,
  medium: mediumSize,
  small: smallSize,
  xsmall: xSmallSize,
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
  cursor: pointer;
`;

export default StyledImage;
