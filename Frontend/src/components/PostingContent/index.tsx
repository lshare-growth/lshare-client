import * as S from './style';

type PostingContentProps = {
  // eslint-disable-next-line react/require-default-props
  className?: string;
  content: string;
  clamp: number;
};

const PostingContent = ({ className, content, clamp }: PostingContentProps) => (
  <S.Container className={className} clamp={clamp}>
    <S.Content>{content}</S.Content>
  </S.Container>
);

export default PostingContent;
