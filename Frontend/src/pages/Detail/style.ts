import styled, { css } from 'styled-components';
import IconCountBox from '@components/IconCountBox';
import Label from '@components/common/Label';
import CommentLabel from '@components/common/CommentLabel';
import LabelList from '@components/LabelList';
import CommentWrite from '@components/CommentWrite';
import Button from '@components/common/Button';
import Avatar from '@components/common/Avatar';
import Divider from '@components/common/Divider';
import CommentContent from '@components/CommentContent';
import Icon from '@components/common/Icon';
import TextButton from '@components/common/TextButton';
import PostingContent from '@components/PostingContent';
import Image from '@components/common/Image';
import { Link } from 'react-router-dom';
import BasicButton from '@components/common/BasicButton';

export const CustomICustomLabelconCountBox = styled(IconCountBox)`
  margin: 0 auto;
`;

export const CustomLikeIconCountBox = styled(IconCountBox)`
  margin: 0 auto;
`;

export const CustomLabel = styled(Label)`
  margin: 0 8px 0 0;
  font-size: 12px;
  width: 68px;
`;

export const CustomCommentLabel = styled(CommentLabel)`
  margin: 0 16px 0 0;
  font-size: 14px;
`;

export const Day = styled.span`
  margin: 0 16px 0 0;
  color: ${({ theme }) => theme.colors.subTitle};
  font-size: 12.8px;
`;

export const Count = styled(IconCountBox)`
  margin: 0 8px 0 0;
`;

export const CustomLabelList = styled(LabelList)`
  margin: 64px 0;
`;

export const CustomCommentWrite = styled(CommentWrite)`
  margin: 32px 0;
`;

export const CustomButton = styled(Button)`
  :active:enabled {
    transform: none;
  }
`;

export const ControllButton = styled(Button)`
  margin: 0 0 0 8px;
`;

export const PopUp = styled.ul<{ isHovered: boolean }>`
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.line};
  position: absolute;
  border-radius: 4px;
  top: -64px;
  right: 8px;
  display: ${({ isHovered }) => (isHovered ? 'flex' : 'none')};
`;

export const EmojiItem = styled.li`
  margin: 0 0 0 8px;
`;

export const CustomAvatar = styled(Avatar)`
  margin: 0 8px 0 0;
`;

export const CommentCount = styled.span`
  margin: 16px 0;
`;

export const UserContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'stretch' })}
`;

export const ReplyContainer = styled.ul`
  margin: 32px 0 0 0;
`;

export const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 32px 0 64px 0;
`;

export const Content = styled.div`
  line-height: 160%;
  margin: 16px 0 0 0;
  white-space: pre-wrap;
`;

export const FlexBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 8px 0;
`;

export const Title = styled.h1`
  line-height: 160%;
  font-weight: 350;
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TitleContainer = styled.div`
  margin: 64px 0 16px 0;
  display: flex;
`;

export const Container = styled.div`
  width: 936px;
  margin: 0 auto;
`;

export const CustomLikeButton = styled(Button)<{ isSelected: boolean }>`
  margin: 0 0 0 16px;
  filter: ${({ isSelected }) => isSelected && 'brightness(90%)'};
`;

export const DeleteButton = styled(Button)`
  margin: 0 0 0 16px;
`;

export const HorizontalDivider = styled(Divider)`
  margin: 16px 0;
`;

export const Flex = styled.div`
  margin: 64px 0 16px 0;
  ${({ theme }) => theme.mixins.flexBox({ justify: 'space-between', align: 'center' })}
`;

export const LoadingContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox({})};
  margin: 8px 0;
`;

export const CommentItem = styled.li`
  margin: 16px 0;
`;

export const OrganizerAvatar = styled(Avatar)`
  margin: 0 8px 0 0;
`;

export const SkeletonTitle = styled.div`
  /* width: 320px; */
  /* width: 720px; */
  height: 32px;
  background-color: ${({ theme }) => theme.colors.default.border};
  margin: 16px 0;
  border-radius: 4px;
`;

export const SkeletonContent = styled.div`
  /* width: 320px;
  height: 30px; */
  /* width: 968px; */
  height: 56px;
  margin: 0 0 16px 0;
  background-color: ${({ theme }) => theme.colors.default.border};
  border-radius: 4px;
`;

export const SkeletonLabel = styled.div`
  width: 48px;
  height: 24px;
  margin: 0 8px 8px 0;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.default.border};
`;

export const SkeletonButton = styled(Button)`
  margin: 0 16px 0 0;
  background-color: ${({ theme }) => theme.colors.default.border};
`;

export const RecruitButton = styled(Button)`
  font-size: 10px;
`;

export const InfoContainer = styled.ul`
  display: flex;
`;

export const InfoItem = styled.li`
  list-style: none;
  margin: 8px 8px 0 0;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.titlePlaceholder};
  text-align: right;
`;

export const CustomCommentContent = styled(CommentContent)`
  line-height: 160%;
  font-weight: bold;
  font-size: 16px;
`;

export const InfosWrapper = styled.div`
  /* position: relative;
  width: 600px;
  height: 60px; */
`;
export const DatesContainer = styled.ul`
  /* display: flex;
  text-align: right;
  float: right; */
`;

export const InfosContainer = styled.ul`
  /* display: flex;
  text-align: right;
  align-items: center;
  position: relative;
  right: 0; */
  /* width: 120px;
  height: 22px; */
`;
// margin: 40px 0 0 0;

// display: flex;
export const OtherInfo = styled.li``;

export const RigthText = styled.div`
  margin: 8px 0 0 0;
  text-align: right;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.subTitle};
`;

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
  margin: 45px 0 0 0;
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

export const UserInfosContainer = styled.div`
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
