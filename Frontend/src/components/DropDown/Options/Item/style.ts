import styled from 'styled-components';

export const Item = styled.li<{ isMouseOvered?: boolean }>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: ${({ isMouseOvered, theme }) =>
    isMouseOvered && theme.colors.default.hover};
  :last-child {
    border-radius: 0 0 4px 4px;
  }
  list-style: none;
  cursor: pointer;
`;

export const Title = styled.h1``;

export const ItemContainer = styled.div`
  padding: 10px;
`;
