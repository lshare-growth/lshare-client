import IconCountBox from '@components/IconCountBox';
import Icon from '@components/common/Icon';
import Button from '@common/Button';

type LikeCountBoxProps = {
  // eslint-disable-next-line react/require-default-props
  className?: string;
  count: number;
  handleClick: () => void;
};
const LikeCountBox = ({ className, count, handleClick }: LikeCountBoxProps) => (
  <IconCountBox className={className} count={count}>
    <Button mode="tiny" size="tiny" handleClick={handleClick}>
      <Icon mode="thumbsUp" />
    </Button>
  </IconCountBox>
);

export default LikeCountBox;
