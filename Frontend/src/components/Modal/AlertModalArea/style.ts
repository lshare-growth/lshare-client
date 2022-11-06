import styled, { css } from 'styled-components';
import Icon from '@components/common/Icon';
import { contentSizeType } from '@components/types/Modal';

// TODO: content와 중복 제거
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
  width: 184px;
`;

// TODO: any 타입 구체화
const contentSizes: any = {
  xlarge: xlargeSize,
  large: largeSize,
  medium: mediumSize,
  small: smallSize,
};

export const IconContainer = styled.span``;

export const CustomIcon = styled(Icon)`
  cursor: pointer;
  float: right;
`;

export const Container = styled.div<{ size: contentSizeType }>`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'space-between' })}
  ${({ size }) => contentSizes[size]}
  padding: 8px;
  font-size: 16px;
`;
