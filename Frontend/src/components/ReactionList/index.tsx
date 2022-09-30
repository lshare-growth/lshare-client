/* eslint-disable react/require-default-props */
import ReactionItem from '@components/ReactionItem';
import emojisType from '@components/types/ReactionList';
import StyledContainer from './style';

type ReactionListProps = {
  className?: string;
  emojis: emojisType[];
  commentId: number;
  // eslint-disable-next-line no-unused-vars
  handleClick?: (selectedId: number) => void;
};

const ReactionList = ({
  className,
  emojis,
  commentId,
  handleClick,
}: ReactionListProps) => (
  <StyledContainer className={className}>
    {emojis.map(({ id, type, value, count, isSelected }) => (
      <ReactionItem
        key={`ReactionList-emoji-${id}`}
        id={id}
        commentId={commentId}
        content={value}
        count={count}
        label={type}
        isSelected={isSelected}
        handleClick={handleClick}
      />
    ))}
  </StyledContainer>
);

export default ReactionList;
