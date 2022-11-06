import styled from 'styled-components';
import Title from '@common/Title';
import PostingContent from '@components/PostingContent';
import TabsList from '@components/TabsList';
import { Link } from 'react-router-dom';
import Divider from '@components/common/Divider';
import Pagination from '@components/Pagination';
import CommentContent from '@components/CommentContent';
// TODO: POSTING과 중복 제거
export const TitleContainer = styled.div`
  display: flex;
  margin: 16px 0 0 0;
`;

export const CustomTitle = styled(Title)`
  font-weight: 600;
`;

export const CustomPostingContent = styled(PostingContent)`
  margin: 16px 0;
  font-size: 13.5px;
`;

// TODO: MAIN과 중복제거

export const CustomProgressTabsContainer = styled.div`
  height: 16px;
  margin: 32px 0 0 0;
`;

export const CustomProgressTabs = styled(TabsList)`
  float: right;
`;

export const CustomTabs = styled(TabsList)`
  align-items: center;
`;

export const Category = styled.h3``;

export const PostingItem = styled.li``;

export const CustomLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  margin: 0 24px 72px 0;
`;

export const HorizontalDivider = styled(Divider)`
  margin: 24px 0;
`;

export const FlexBetween = styled.div`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'space-between' })}
  margin: 40px 16px 16px 16px;
`;

export const CustomPagination = styled(Pagination)`
  ${({ theme }) => theme.mixins.flexBox({})};
  margin: 16px 0;
`;

export const FlexBox = styled.div`
  ${({ theme }) => theme.mixins.flexBox({})};
`;

export const EmptyMsg = styled.span`
  margin: 8px 0;
`;

// About page
export const Content = styled.div``;

export const NoticeCategory = styled.h1`
  margin: 16px 0 0 0;
  color: ${({ theme }) => theme.colors.accent.initial};
  font-weight: bold;
  font-size: 16px;
`;

export const NoticeTitle = styled.h2`
  margin: 8px 0 0 0;
`;

export const NickName = styled.h3`
  margin: 8px 0 0 0;
  color: ${({ theme }) => theme.colors.subTitle};
`;

export const Container = styled.div`
  width: 1224px;

  margin: 0 auto;
  /* display: flex;
  flex-wrap: wrap; */
`;

export const NoticeItem = styled.li`
  //width: 160px;
  width: 384px;
  :hover {
    filter: brightness(96%);
  }
`;

export const PostingContainer = styled.ul<{ isPostingExist: boolean }>`
  /* width: 528px; */
  width: 1224px;
  display: ${({ isPostingExist }) => isPostingExist && 'flex'};
  flex-wrap: ${({ isPostingExist }) => isPostingExist && 'wrap'};
  margin: 64px 0 0 0;
`;

export const CustomCommentContent = styled(CommentContent)`
  margin: 8px 0 0 0;
  font-size: 20px;
`;

export const TitleLabel = styled.span`
  font-size: 28px;
`;

export const NoticeContainer = styled.div`
  margin: 64px 0 0 0;
`;

export const LoadingContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox({})};
  height: 100vh;
  margin: 300px 0 0 0;
  vertical-align: 'middle';
`;
