/* eslint-disable react/require-default-props */
import * as S from './style';

type ReactionItemProps = {
  className?: string;
  id: number;
  commentId?: number;
  content: string;
  count: number;
  label: string;
  isSelected: boolean;
  // eslint-disable-next-line no-unused-vars
  handleClick?: (selectedId: number) => void;
};

const ReactionItem = ({
  className,
  id,
  // eslint-disable-next-line no-unused-vars
  commentId,
  content,
  count,
  label,
  isSelected,
  handleClick,
}: ReactionItemProps) => (
  <S.Item className={className}>
    <S.CustomButton
      isSelected={isSelected}
      size="xsmall"
      mode="tiny"
      handleClick={() => handleClick && handleClick(id)}
    >
      <S.CustomEmoji label={label} content={content} />
      <S.Count>{count}</S.Count>
    </S.CustomButton>
  </S.Item>
);
export default ReactionItem;
