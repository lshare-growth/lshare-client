import styled from 'styled-components';

const StyledLabel = styled.span<{ isWriter: boolean }>`
  height: 16px;
  padding: 4px;
  border: ${({ isWriter }) => isWriter && '1px solid'};
  border-color: ${({ theme, isWriter }) =>
    isWriter && theme.colors.default.border};
  border-radius: 4px;
  cursor: pointer;
`;

export default StyledLabel;
