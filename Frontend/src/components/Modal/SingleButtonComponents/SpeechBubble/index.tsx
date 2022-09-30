import { ReactNode } from 'react';
import StypedContainer from './style';

type SpeechBubbleProps = {
  children: ReactNode;
};

const SpeechBubble = ({ children }: SpeechBubbleProps) => <StypedContainer>{children}</StypedContainer>;

export default SpeechBubble;
