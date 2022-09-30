/* eslint-disable react/require-default-props */
import { useState, useRef, useEffect } from 'react';
import TextButton from '@common/TextButton';
import * as S from './style';
import { LONG_CONTENT } from './constants';

type CommentContentProps = {
  content: string;
  className?: string;
  clamp?: number;
};

const DEFAULT_CLAMP = 5;

const CommentContent = ({
  content = LONG_CONTENT,
  className,
  clamp = DEFAULT_CLAMP,
}: CommentContentProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isClosed, setIsClosed] = useState(true);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const handleClick = () => {
    setIsClosed(!isClosed);
  };

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const targetElement = ref.current;
    if (targetElement?.offsetHeight < targetElement.scrollHeight) {
      setIsOverflowing(true);
    }
  }, []);

  return (
    <S.Container className={className}>
      <S.Content ref={ref} isClosed={isClosed} clamp={clamp}>
        {content}
      </S.Content>
      {isOverflowing && (
        <TextButton mode="default" handleClick={handleClick}>
          {isClosed ? '자세히 보기' : '간략히'}
        </TextButton>
      )}
    </S.Container>
  );
};

export default CommentContent;
