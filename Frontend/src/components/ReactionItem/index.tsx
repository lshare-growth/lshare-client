/* eslint-disable react/require-default-props */
import * as S from './style';

type ReactionItemProps = {
  className?: string;
  content: string;
  count: number;
  label: string;
  isSelected: boolean;
  // eslint-disable-next-line no-unused-vars
  handleClick?: (selectedContent: string) => void;
};

const ReactionItem = ({ className, content, count, label, isSelected, handleClick }: ReactionItemProps) => (
  <S.Item className={className}>
    <S.CustomButton className="reaction" isSelected={isSelected} size="xsmall" mode="tiny" handleClick={() => handleClick && handleClick(content)}>
      <S.CustomEmoji className="reaction" label={label} content={content} />
      <S.Count className="reaction">{count}</S.Count>
    </S.CustomButton>
  </S.Item>
);
export default ReactionItem;
