import styled from 'styled-components';

export const Container = styled.div`
  /* width: 56px; */
  height: 32px;
  ${({ theme }) => theme.mixins.flexBox({})}
`;

export const Number = styled.h3`
  margin: 0 0 0 8px;
  color: ${({ theme }) => theme.colors.subTitle};
  font-size: 12px;
`;
