import styled, { css } from 'styled-components';

const largeSize = css`
  width: 48px;
  height: 48px;
`;

const mediumSize = css`
  width: 24px;
  height: 24px;
`;

const sizes = {
  large: largeSize,
  medium: mediumSize,
};

const StyledLoadingSpinner = styled.div<{ size: 'large' | 'medium' }>`
  border: 8px solid ${({ theme }) => theme.colors.default.hover};
  border-top: 8px solid ${({ theme }) => theme.colors.default.disabled};
  border-radius: 50%;
  ${({ size }) => sizes[size]}
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default StyledLoadingSpinner;
