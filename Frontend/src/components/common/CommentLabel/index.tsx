/* eslint-disable react/require-default-props */
import StyledLabel from '@common/CommentLabel/style';

type CommentLabelProps = {
  className?: string;
  isStudyOrganizer: boolean;
  isMyComment: boolean;
  nickname: string;
  handleClick?: () => void;
};

const CommentLabel = ({ className, isStudyOrganizer, isMyComment, nickname, handleClick }: CommentLabelProps) => (
  <StyledLabel className={className} isStudyOrganizer={isStudyOrganizer} isMyComment={isMyComment} onClick={handleClick}>
    {nickname}
  </StyledLabel>
);

export default CommentLabel;
