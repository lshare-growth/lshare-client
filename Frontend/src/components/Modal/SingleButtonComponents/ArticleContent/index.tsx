import EmojiCircle from '@components/Modal/SingleButtonComponents/EmojiCircle';
import SpeechBubble from '@components/Modal/SingleButtonComponents/SpeechBubble';
import { explainsItemType } from '@components/types/Modal';
import * as S from './style';

type ArticleContentProps = {
  items: explainsItemType[];
};
const ArticleContent = ({ items }: ArticleContentProps) => (
  <S.FlexBox>
    <S.FlexColumn>
      {items.map(({ id, emoji, msg }) => (
        <S.Item key={`loginAritcleContent-loginExplains-${id}`}>
          <EmojiCircle>{emoji}</EmojiCircle>
          <SpeechBubble>
            <S.Msg>{msg}</S.Msg>
          </SpeechBubble>
        </S.Item>
      ))}
    </S.FlexColumn>
  </S.FlexBox>
);

export default ArticleContent;
