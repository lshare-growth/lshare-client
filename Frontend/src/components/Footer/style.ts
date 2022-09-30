import styled from 'styled-components';

export const Footer = styled.footer``;

export const FooterContent = styled.div`
  ${({ theme }) => theme.mixins.flexBox({})};
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.footer};
`;
