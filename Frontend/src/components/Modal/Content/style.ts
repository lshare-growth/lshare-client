import styled, { css } from 'styled-components';
import { contentSizeType } from '@components/types/Modal';

const xlargeSize = css`
  width: 608px;
`;

const largeSize = css`
  width: 400px;
`;

const mediumSize = css`
  width: 217px;
`;

const smallSize = css`
  width: 160px;
`;

// TODO: any 타입 구체화
const contentSizes: any = {
  xlarge: xlargeSize,
  large: largeSize,
  medium: mediumSize,
  small: smallSize,
};

const StyledContent = styled.div<{ size: contentSizeType }>`
  display: flex;
  flex-direction: column;
  ${({ size }) => contentSizes[size]}
  padding: ${({ size }) => size === 'small' && '16px'};
  font-size: 12px;
  text-align: center;
`;

export default StyledContent;
