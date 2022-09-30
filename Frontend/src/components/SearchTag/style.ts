import styled from 'styled-components';
import Button from '@components/common/Button';
import Input from '@components/common/Input';

export const DefaultTagContainer = styled.ul`
  ${({ theme }) =>
    theme.mixins.flexBox({ justify: 'center', align: 'center' })};
  flex-wrap: wrap;
`;

export const DefaultTagBox = styled.div`
  width: 602px;
`;

export const Item = styled.li`
  margin: 0 8px 8px 0;
`;

export const DefaultTag = styled.li``;

export const Container = styled.div`
  ${({ theme }) =>
    theme.mixins.flexBox({ justify: 'flex-start', align: 'center' })};
`;

export const CustomButton = styled(Button)`
  margin: 0 0 0 8px;
`;

export const CustomInput = styled(Input)`
  vertical-align: 'middle';
`;
