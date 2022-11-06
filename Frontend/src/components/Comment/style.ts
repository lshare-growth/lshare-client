import styled from 'styled-components';
import LikeCountBox from '@components/LikeCountBox';
import ReactionList from '@components/ReactionList';
import CommentWrite from '@components/CommentWrite';
import TextButton from '@common/TextButton';

export const CustomLickCountBox = styled(LikeCountBox)`
  margin: 0 0 0 32px;
`;

export const CustomReactionList = styled(ReactionList)`
  margin: 0 0 0 32px;
`;

export const CustomCommentWrite = styled(CommentWrite)`
  margin: 8px 0 0 0;
`;

export const CommentContainer = styled.div`
  margin: 0 0 0 64px;
`;

export const CommentInfosMenuContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox({ justify: 'space-between', align: 'stretch' })}
`;

export const FlexBox = styled.div`
  display: flex;
`;

export const ReplyContainer = styled.ul`
  margin: 8px 0 0 0;
`;

export const ReplyItem = styled.li`
  margin: 0 0 0 8px;
`;

export const CustomTextButton = styled(TextButton)`
  margin: 16px 0 16px 32px;
  color: ${({ theme }) => theme.colors.accent.initial};
`;

export const SkeletonPosting = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  background-color: ${({ theme }) => theme.colors.skeleton};
  padding: 8px;
  border-radius: 8px;
`;
