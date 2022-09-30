import styled from 'styled-components';
import SearchTag from '@components/SearchTag';

export const Container = styled.div`
  ${({ theme }) =>
    theme.mixins.flexBox({ direction: 'column', justify: 'center' })};
  margin: '0 0 8px 0';
`;

export const CustomSearchTag = styled(SearchTag)`
  margin: 16px 0 0 0;
`;
