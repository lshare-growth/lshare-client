import styled, { css } from 'styled-components';

const verticalStyle = css`
  width: 1px;
  height: 100%;
  display: inline-block;
  vertical-align: 'middle';
`;

const horizontalStyle = css`
  width: 100%;
  height: 1px;
`;

// TODO: any 타입 구체화
const directionStyles: any = {
  vertical: verticalStyle,
  horizontal: horizontalStyle,
};

export const Divider = styled.hr<{ direction: 'vertical' | 'horizontal' }>`
  border: none;
  background-color: ${({ theme }) => theme.colors.line};
  ${({ direction }) => directionStyles[direction]};
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
`;

export const StyoryBookContainer = styled.div`
  height: 20px;
`;
