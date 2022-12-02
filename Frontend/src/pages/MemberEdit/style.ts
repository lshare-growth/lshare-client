import styled, { css } from 'styled-components';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import Image from '@common/Image';
import Icon from '@components/common/Icon';
import Divider from '@components/common/Divider';
import DropDown from '@components/DropDown';

export const Container = styled.div`
  width: 432px;
  margin: 0 auto;
`;

export const FlexBox = styled.div`
  display: flex;
  align-items: center;
`;

export const BetweenBox = styled.div`
  display: flex;
  margin: 16px 0 32px 0;
  ${({ theme }) => theme.mixins.flexBox({ justify: 'space-between', align: 'strecth' })}
`;

export const Title = styled.h1`
  text-align: center;
  margin: 32px 0 0 0;
`;

export const CustomInput = styled(Input)`
  margin: 24px 0 0 0;
`;

export const BirthContainer = styled.div`
  margin: 32px 0 0 0;
`;

export const CustomInputDefault = styled(Input)`
  margin: 16px 0 0 0;
`;

const buttonStyle = css`
  margin: 32px 0 40px 0;
`;

export const UserInfos = styled.div`
  margin: 8px 0 0 16px;
`;

export const UserInfoContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'space-between' })};
  margin: 8px 0 0 0;
`;

export const NickName = styled.h3`
  margin: 0 0 8px 0;
`;

export const GithubId = styled.h3``;

export const UserInfoArea = styled.div``;

export const CustomIcon = styled(Icon)`
  margin: 0 8px 0 0;
`;

export const Rank = styled(Image)`
  margin: 64px 0 0 0;
`;

export const CancelButton = styled(Button)`
  ${buttonStyle}
`;

export const EditButton = styled(Button)`
  ${buttonStyle}
  color: ${({ theme }) => theme.colors.background};
  font-weight: bold;
`;

export const HorizontalDivider = styled(Divider)`
  margin: 16px 0;
`;

export const Label = styled.span`
  margin: 16px 8px 0 0;
`;

export const CustomDropDown = styled(DropDown)`
  margin: 24px 0 0 0;
`;

export const NickNameInput = styled(Input)``;

export const CustomButton = styled(Button)`
  margin: 0 0 0 12px;
  height: 50px;
`;

export const NickNameMsg = styled.div<{ isDuplicated?: boolean }>`
  color: ${({ theme }) => theme.colors.accent.initial};
  font-size: 10px;
  margin: 8px 0 0 0;
`;

export const Msg = styled.div`
  font-size: 10px;
  margin: 8px 0 0 0;
`;

export const NickNameLabel = styled.span``;

export const BirthLabel = styled.span`
  margin: 0 0 8px 0;
`;

export const LoadingContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox({})};
  height: 100vh;
  vertical-align: 'middle';
`;
