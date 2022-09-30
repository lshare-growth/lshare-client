import styled from 'styled-components';

export const Item = styled.li`
  margin: 0 16px 0 0;
`;

export const Tab = styled.h3<{ isSelected: boolean }>`
  color: ${({ theme, isSelected }) => (isSelected ? theme.colors.title : theme.colors.titlePlaceholder)};
  cursor: pointer;
  :hover {
    filter: brightness(80%);
  }
`;
