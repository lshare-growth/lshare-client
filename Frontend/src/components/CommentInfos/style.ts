import styled, { css } from 'styled-components';
import CommentLabel from '@components/common/CommentLabel';
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

export const FlexBox = css`
  display: flex;
  align-items: center;
`;

export const Container = styled.div`
  ${FlexBox}
`;

export const CustomCommentLabel = styled(CommentLabel)<{ isHighlighting?: boolean; isDeleted?: boolean }>`
  margin: 0 0 0 16px;
  font-weight: ${({ isHighlighting, isDeleted }) => !isDeleted && isHighlighting && '600'};
  font-weight: ${({ isDeleted }) => isDeleted && '200'};
  color: ${({ isDeleted, theme }) => isDeleted && theme.colors.default.disabled};
`;

export const Time = styled.span`
  margin: 0 0 0 8px;
  color: ${({ theme }) => theme.colors.subTitle};
  font-size: 12px;
`;

export const IsEdited = styled.span`
  margin: 0 0 0 8px;
  font-size: 12px;
`;

// TODO: CommentInfos와 중복제거
export const SkeletonAvator = styled.div`
  border-radius: 50%;
  width: 48px;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.default.border};
`;

export const SkeletonSmallLabel = styled.div`
  width: 48px;
  height: 24px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.default.border};
`;

export const SkeletonItem = styled.li`
  list-style: none;
  margin: 0 0 0 16px;
`;

export const SkeletonContent = styled.div`
  /* width: 320px;
  height: 30px; */
  width: 968px;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.default.border};
  border-radius: 4px;
`;

export const SkeletonPosting = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.skeleton};
  border-radius: 4px;
`;

/** followlist */

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

export const CustomLink = styled(Link)`
  ${FlexBox}
  color: inherit;
  text-decoration: none;
`;

/** */
export const UserInfo = styled.div`
  ${FlexBox}
`;

export const ProfileCard = styled.div<{ isTop?: boolean; increasingTop?: number }>`
  width: 240px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 4px;
  position: absolute;
  margin: 224px 0 0 0; //320px 0 0 60px; //258
  z-index: 900;
`;

const HighlightInfo = css`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.title};
`;

export const NickName = styled.div`
  ${HighlightInfo}
  margin: 16px 0;
  font-weight: bold;
  cursor: pointer;
`;

export const CustomNickName = styled(CommentContent)`
  ${HighlightInfo}
  margin: 16px 0;
  font-weight: bold;
`;

export const Introducion = styled(CommentContent)`
  ${HighlightInfo}
  margin: 8px 0;
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

// TODO : underline을 TextButton에서 props로 관리해야하는가?
export const CustomTextButton = styled(TextButton)`
  margin: 4px 0;
  text-decoration: underline;
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
