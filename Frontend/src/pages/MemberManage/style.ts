import styled from 'styled-components';
import Button from '@components/common/Button';
import Divider from '@components/common/Divider';

export const Container = styled.div`
  width: 438px;
  margin: 0 auto;
`;

export const ItemContainer = styled.ul``;

export const Item = styled.li`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'space-between', align: 'stretch' })}
  margin: 16px 0;
`;

export const NickName = styled.h2`
  margin: 0 auto;
  line-height: 46px;
  vertical-align: middle;
`;
export const CustomButton = styled(Button)`
  margin: 0 0 0 16px;
`;

export const Title = styled.h1`
  text-align: center;
  margin: 32px 0 0 0;
`;

export const ButtonContainer = styled.div``;

export const HorizontalDivider = styled(Divider)`
  margin: 16px 0;
`;
