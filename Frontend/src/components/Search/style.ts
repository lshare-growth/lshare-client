import styled from 'styled-components';
import Button from '@components/common/Button';
import Input from '@components/common/Input';

export const Container = styled.div`
  padding: 8px 0;
  ${({ theme }) => theme.mixins.flexBox({ justify: 'space-between' })};
`;

export const CustomButton = styled(Button)`
  margin: 0 0 0 8px;
  font-size: 10px;
`;

// TODO: height크기 컴포넌트 재사용고려
export const CustomInput = styled(Input)`
  /* height: 30px; */
`;
