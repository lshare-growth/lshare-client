import styled from 'styled-components';

const StyledLoadingSpinner = styled.div`
  border: 8px solid ${({ theme }) => theme.colors.default.hover};
  border-top: 8px solid ${({ theme }) => theme.colors.default.disabled};
  border-radius: 50%;
  width: 48px;
  height: 48px;
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
