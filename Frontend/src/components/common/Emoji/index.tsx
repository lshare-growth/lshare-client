import StyledEmoji from './style';

type EmojiProps = {
  // eslint-disable-next-line react/require-default-props
  className?: string;
  content: string;
  label: string;
};

const Emoji = ({ className, content, label = '' }: EmojiProps) => (
  <StyledEmoji
    className={className}
    role="img"
    aria-label={label}
    aria-hidden={label ? 'false' : 'true'}
  >
    {content}
  </StyledEmoji>
);

export default Emoji;
