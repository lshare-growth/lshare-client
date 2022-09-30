import styled from 'styled-components';

export const Background = styled.div`
  height: 100%;
  width: 100%;
  ${({ theme }) => theme.mixins.flexBox({})}
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
`;

export const Content = styled.div`
  background: ${({ theme }) => theme.colors.modal};
  box-shadow: 1px 1px 1px 1px ${({ theme }) => theme.colors.line};
  border-radius: 4px;
`;
