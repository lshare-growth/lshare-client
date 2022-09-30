import styled from 'styled-components';
import LikeCountBox from '@components/LikeCountBox';
import ReactionList from '@components/ReactionList';
import CommentWrite from '@components/CommentWrite';

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
  ${({ theme }) =>
    theme.mixins.flexBox({ justify: 'space-between', align: 'stretch' })}
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
