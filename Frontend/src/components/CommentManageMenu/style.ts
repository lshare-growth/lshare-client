import styled from 'styled-components';

export const Container = styled.ul`
  display: flex;
  align-items: center;
`;

export const Item = styled.li`
  margin: 0 8px 0 0;
  position: relative;
`;

export const PopUp = styled.ul<{ isClicked: boolean }>`
  position: absolute;
  padding: 8px;
  display: ${({ isClicked }) => (isClicked ? 'flex' : 'none')};
  top: -48px;
  right: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 4px;
`;

export const EmojiItem = styled.li`
  margin: 0 0 0 8px;
`;

export const StorybookContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'center' })}
  margin: 64px 0 0 0;
`;

export const SkeletonAvator = styled.div`
  border-radius: 50%;
  width: 48px;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.default.border};
`;

export const SkeletonSmallLabel = styled.div`
  width: 48px;
  height: 24px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.default.border};
`;

export const SkeletonItem = styled.li`
  list-style: none;
  margin: 0 0 0 16px;
`;
