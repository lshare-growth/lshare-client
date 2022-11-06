import styled from 'styled-components';

export const Item = styled.li<{ isMouseOvered?: boolean }>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: ${({ theme }) => theme.colors.background};
  filter: ${({ isMouseOvered }) => isMouseOvered && 'brightness(90%)'};
  :last-child {
    border-radius: 0 0 4px 4px;
  }
  list-style: none;
  cursor: pointer;
`;

export const Title = styled.h1``;

export const ItemContainer = styled.div`
  padding: 4px;
`;
