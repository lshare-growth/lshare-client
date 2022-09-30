/* eslint-disable react/require-default-props */
import StyledLabel from '@common/CommentLabel/style';

type CommentLabelProps = {
  className?: string;
  isWriter: boolean;
  nickname: string;
  handleClick?: () => void;
};

const CommentLabel = ({
  className,
  isWriter,
  nickname,
  handleClick,
}: CommentLabelProps) => (
  <StyledLabel className={className} isWriter={isWriter} onClick={handleClick}>
    {nickname}
  </StyledLabel>
);

export default CommentLabel;
