/* eslint-disable react/require-default-props */
import ReactionItem from '@components/ReactionItem';
import emojisType from '@components/types/ReactionList';
import StyledContainer from './style';

type ReactionListProps = {
  className?: string;
  emojis: emojisType[];
  // eslint-disable-next-line no-unused-vars
  handleClick?: (selectedContent: string) => void;
};

const ReactionList = ({ className = 'reaction', emojis, handleClick }: ReactionListProps) => (
  <StyledContainer className={className}>
    {emojis.map(({ id, type, value, count, isSelected }) => (
      <ReactionItem className="reaction" key={`ReactionList-emoji-${id}`} content={value} count={count} label={type} isSelected={isSelected} handleClick={handleClick} />
    ))}
  </StyledContainer>
);

export default ReactionList;
