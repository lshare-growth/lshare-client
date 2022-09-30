import styled, { css } from 'styled-components';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import Image from '@common/Image';
import Icon from '@components/common/Icon';
import Divider from '@components/common/Divider';

export const Container = styled.div`
  width: 432px;
  margin: 0 auto;
`;

export const FlexBox = styled.div`
  display: flex;
`;

export const BetweenBox = styled.div`
  display: flex;
  ${({ theme }) => theme.mixins.flexBox({ justify: 'space-between', align: 'stretch' })}
`;

export const Title = styled.h1`
  text-align: center;
  margin: 32px 0 0 0;
`;

export const CustomInput = styled(Input)`
  margin: 32px 0 0 0;
`;

export const CustomInputDefault = styled(Input)`
  margin: 16px 0 0 0;
`;

const buttonStyle = css`
  margin: 32px 0 40px 0;
`;

export const UserInfos = styled.div`
  margin: 8px 0 0 64px;
`;

export const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 8px 0;
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
