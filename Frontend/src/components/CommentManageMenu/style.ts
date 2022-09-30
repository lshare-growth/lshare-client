import styled from 'styled-components';

export const Container = styled.ul`
  display: flex;
  align-items: center;
`;

export const Item = styled.li`
  margin: 0 8px 0 0;
  position: relative;
`;

export const PopUp = styled.ul<{ isHovered: boolean }>`
  position: absolute;
  padding: 8px;
  display: ${({ isHovered }) => (isHovered ? 'flex' : 'none')};
  top: -56px;
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
