import styled, { css } from 'styled-components';
import TabsList from '@components/TabsList';
import { Link } from 'react-router-dom';
import Divider from '@components/common/Divider';

export const Container = styled.div`
  width: 800px;
  margin: 0 auto;
`;

const flexBox = css`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'flex-start' })}
`;

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserInfos = styled.div`
  ${flexBox}
  margin: 64px 0 0 128px;
`;

export const UserInfo = styled.div`
  ${flexBox}
  margin: 0 32px;
`;

export const User = styled.h3`
  margin: 0 32px 0 0;
`;

export const CustomTabs = styled(TabsList)`
  margin: 32px 32px;
`;

export const PostingContainer = styled.ul`
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PostingItem = styled.li``;

export const ItemContainer = styled.ul`
  display: flex;
  margin: 16px 32px;
`;

export const Item = styled.li`
  margin: 0 32px 0 0;
`;

export const Infos = styled.h3``;

export const Title = styled.h1`
  text-align: center;
  margin: 32px 0;
`;

export const CustomLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

export const HorizontalDivider = styled(Divider)``;

export const LinkContainer = styled.div``;
