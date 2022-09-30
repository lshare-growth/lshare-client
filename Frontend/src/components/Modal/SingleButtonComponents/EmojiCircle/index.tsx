import { ReactNode } from 'react';
import StyledEmojiCircle from './style';

type EmojiCircleProps = {
  children: ReactNode;
};

const EmojiCircle = ({ children }: EmojiCircleProps) => <StyledEmojiCircle>{children}</StyledEmojiCircle>;

export default EmojiCircle;
