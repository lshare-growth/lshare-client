import styled from 'styled-components';
import Button from '@components/common/Button';

export const Container = styled.div`
  padding: 8px 0;
  ${({ theme }) => theme.mixins.flexBox({ justify: 'space-between' })};
`;

export const CustomButton = styled(Button)`
  margin: 0 0 0 8px;
`;
