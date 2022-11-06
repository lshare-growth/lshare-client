import styled from 'styled-components';
import Header from '@components/Header';

export const Main = styled.main`
  flex: 1 1 0px;
  margin: 48px 0 0 0;
`;

export const CustomHeader = styled(Header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 3px 5px ${({ theme }) => theme.colors.line};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const LoadingContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox({})};
  height: 100vh;
  vertical-align: 'middle';
`;
