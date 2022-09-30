import styled from 'styled-components';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import DropDown from '@components/DropDown';
import Divider from '@components/common/Divider';

export const CustomDropDown = styled(DropDown)`
  margin: 28px 0 0 0;
`;

export const Container = styled.div`
  width: 432px;
  margin: 0 auto;
`;

export const Text = styled.h1`
  margin: 24px 0 0 0;
`;
export const CustomButton = styled(Button)`
  margin: 64px 0 0 0;
`;
export const CustomInput = styled(Input)`
  margin: 32px 0 0 0;
`;

export const LoginButton = styled(Button)`
  margin: 32px 0 40px 0;
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
`;

export const CustomInputDefault = styled(Input)`
  margin: 16px 0 0 0;
`;

export const CustomInputXsmall = styled(Input)`
  margin: 28px 0 0 0;
`;

export const Title = styled.h1``;

export const TitleContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'center', align: 'stretch' })}
  margin: 32px 0 0 0;
`;

export const MailContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'space-between' })}
  margin: 32px 0 0 0;
`;

export const HorizontalDivider = styled(Divider)`
  margin: 8px 0;
`;
