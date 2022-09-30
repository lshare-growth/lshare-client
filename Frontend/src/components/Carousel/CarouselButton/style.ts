import styled, { css } from 'styled-components';
import Button from '@components/Carousel/Button';

const CustomButtonStyle = css`
  position: absolute;
  top: 50px;
  z-index: 1;
`;

export const LeftButton = styled(Button)<{ buttonSizeOnBothSide: string }>`
  ${CustomButtonStyle}
  font-size: ${({ buttonSizeOnBothSide }) => buttonSizeOnBothSide};
  left: ${({ buttonSizeOnBothSide }) =>
    -Number(buttonSizeOnBothSide.split('px')[0]) - 10}px;
`;

export const RightButton = styled(Button)<{ buttonSizeOnBothSide: string }>`
  ${CustomButtonStyle}
  font-size: ${({ buttonSizeOnBothSide }) => buttonSizeOnBothSide};
  right: ${({ buttonSizeOnBothSide }) =>
    -Number(buttonSizeOnBothSide.split('px')[0]) - 10}px;
`;
