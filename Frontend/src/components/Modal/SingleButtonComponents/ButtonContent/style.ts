import styled from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => theme.mixins.flexBox({})}
`;

export const ButtonName = styled.span`
  margin: 0 0 0 8px;
`;
