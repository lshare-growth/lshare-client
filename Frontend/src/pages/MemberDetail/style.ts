import styled, { css } from 'styled-components';
import TabsList from '@components/TabsList';
import { Link } from 'react-router-dom';
import Divider from '@components/common/Divider';
import Button from '@components/common/Button';
import Icon from '@components/common/Icon';
import BasicButton from '@components/common/BasicButton';

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
  margin: 0 0 0 32px;
`;

export const UserInfos = styled.div`
  ${flexBox}
  margin: 64px 0 0 128px;
`;

export const UserInfo = styled.div`
  ${flexBox}
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

export const Category = styled.h3`
  margin: 40px 16px 16px 16px;
`;

export const CustomLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

export const HorizontalDivider = styled(Divider)``;

export const LinkContainer = styled.div``;

export const CustomButton = styled(Button)`
  font-size: 11px;
`;

export const FollowContainer = styled.ul`
  ${flexBox}
  margin: 8px 0;
`;

export const FollowItem = styled.li`
  margin: 0 8px 0 0;
`;

export const FollowContent = styled.span`
  margin: 0 4px 0 0;
  cursor: pointer;
`;

export const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

/** follower */
export const FollowMsg = styled.span`
  font-size: 11px;
`;

export const FollowButton = styled(Button)<{ isFollowing?: boolean }>`
  background-color: ${({ theme, isFollowing }) => isFollowing && theme.colors.default.hover};
`;

export const Name = styled.span`
  margin: 0 0 0 8px;
`;

export const FollowerContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const FollowerListContainer = styled.ul`
  height: 268px;
  padding: 4px 16px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const FollowerContent = styled.li`
  margin: 12px 0;
`;

export const FollowerTitleArea = styled.div`
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Flex = styled.div`
  ${({ theme }) => theme.mixins.flexBox({})}
`;

export const FollowerTitle = styled.h1`
  width: 100%;
  font-weight: bold;
  text-align: center;
`;

export const FollowCancelIcon = styled(Icon)``;

export const FollowCancelButton = styled(BasicButton)``;

export const FlexCenter = styled.div`
  display: flex;
  align-items: center;
`;

export const FollowerWrapper = styled.div`
  width: 344px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 6px;
`;
