import styled from 'styled-components';
import Title from '@components/Modal/Title';
import Button from '@components/common/Button';

export const Container = styled.div`
  ${({ theme }) => theme.mixins.flexBox({})};
  height: 100%;
`;

export const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const CustomTitle = styled(Title)`
  margin: 0 0 64px 0;
`;

export const ButtonsContainer = styled.div`
  margin: 64px 0 0 0;
`;

export const CustomButton = styled(Button)`
  margin: 0 16px 0 0;
`;

export const HomeButton = styled(Button)`
  margin: 0 0 4px 0;
`;

export const ButtonContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox({})}
`;
