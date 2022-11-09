import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 160px;
  height: 100vh;
  vertical-align: 'middle';
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 200px;
  font-weight: 900;
  margin: 16px 0;
`;

export const Content = styled.h3`
  font: 48px;
  font-weight: 500;
  margin: 8px 0;
`;

export const Explain = styled.h3`
  margin: 8px 0;
  color: ${({ theme }) => theme.colors.subTitle};
`;
