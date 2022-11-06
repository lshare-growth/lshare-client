import styled, { css } from 'styled-components';

import Title from '@components/common/Title';
import PostingContent from '@components/PostingContent';
import Image from '@components/common/Image';
import Button from '@components/common/Button';
import { Link } from 'react-router-dom';
import Label from '@components/common/Label';
import Divider from '@components/common/Divider';
import IconCountBox from '@components/IconCountBox';
import CommentContent from '@components/CommentContent';
import LabelList from '@components/LabelList';
import Icon from '@components/common/Icon';
import TextButton from '@components/common/TextButton';
import BasicButton from '@components/common/BasicButton';

export const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FollowMsg = styled.span`
  font-size: 11px;
`;

export const FollowButton = styled(Button)<{ isFollowing?: boolean }>`
  background-color: ${({ theme, isFollowing }) => isFollowing && theme.colors.default.hover};
`;

export const Name = styled.span`
  margin: 0 0 0 8px;
  cursor: pointer;
`;

export const FollowerContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const FollowerListContainer = styled.ul`
  /* width: 240px; */
  height: 240px;
  padding: 4px 16px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const FollowerContent = styled.li`
  margin: 12px 0;
`;

export const FollowerTitleArea = styled.div`
  //width: 256px;
  /* width: 256px; */
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

/** */

export const ProfileCard = styled.div<{ isTop?: boolean; increasingTop?: number; followsLength?: number }>`
  width: 240px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 4px;
  position: absolute;
  top: ${({ isTop, increasingTop }) => (isTop ? `calc(110px + ${increasingTop}px)` : `calc(310px + ${increasingTop}px)`)};
  top: ${({ isTop, increasingTop, followsLength }) => followsLength === 1 && isTop && `calc(144px + ${increasingTop}px)`};
  top: ${({ isTop, increasingTop, followsLength }) => followsLength === 1 && !isTop && `calc(254px + ${increasingTop}px)`};
  z-index: 900;
  cursor: pointer;
`;

const HighlightInfo = css`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.title};
`;

export const NickName = styled.div`
  ${HighlightInfo}
  margin: 16px 0;
  font-weight: bold;
  display: flex;
`;

export const CustomNickName = styled(CommentContent)`
  ${HighlightInfo}
  margin: 16px 0;
  font-weight: bold;
  display: flex;
`;

export const Introducion = styled(CommentContent)`
  ${HighlightInfo}
  margin: 8px 0;
  display: flex;
`;

export const Info = styled.div`
  margin: 8px 0;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.titlePlaceholder};
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const CustomIcon = styled(Icon)`
  margin: 0 8px 0 0;
`;

export const CustomTextButton = styled(TextButton)`
  margin: 4px 0;
  text-decoration: underline;
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
