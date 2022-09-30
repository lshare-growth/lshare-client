import styled, { css } from 'styled-components';

const largeSize = css`
  width: 1024px;
  height: 176px;
`;

const mediumSize = css`
  width: 912px;
  height: 104px;
`;

const smallSize = css`
  width: 792px;
  height: 80px;
`;

const xsmallSize = css`
  width: 320px;
  height: 240px;
`;

// TODO: any타입 구체화
const sizes: any = {
  large: largeSize,
  medium: mediumSize,
  small: smallSize,
  xsmall: xsmallSize,
};

export const Label = styled.label``;

export const TextArea = styled.textarea<{
  size: string;
}>`
  resize: none;
  padding: 16px;
  overflow: hidden;
  ${({ size }) => sizes[size]};
  border-color: ${({ theme }) => theme.colors.line};
  :focus {
    border-color: ${({ theme }) => theme.colors.accent.initial};
    outline: 1px solid ${({ theme }) => theme.colors.accent.initial};
  }
`;
