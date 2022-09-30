/* eslint-disable react/require-default-props */
import { useState, ReactNode } from 'react';
import CarouselButton from '@components/Carousel/CarouselButton';
import ItemContainer from '@components/Carousel/ItemContainer';
import { items, DEFAULT_SHOWING_CARD_NUM, DEFAULT_ITEM_GAP, DEFAULT_BUTTON_SIZE_ON_BOTH_SIDE } from '@components/Carousel/constants';
import * as S from './style';

type CarouselProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  children: ReactNode[];
  showingSlideCardNum?: number;
  itemGap?: string;
  buttonSizeOnBothSide?: string;
};
const Carousel = ({ children, showingSlideCardNum = DEFAULT_SHOWING_CARD_NUM, itemGap = DEFAULT_ITEM_GAP, buttonSizeOnBothSide = DEFAULT_BUTTON_SIZE_ON_BOTH_SIDE }: CarouselProps) => {
  const [slidingSize, setSlidingSize] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  const handleTransitionEnd = () => {
    setIsMoving(false);
  };

  const handleClickSlide = (movingSlidingSize: number) => {
    setIsMoving(true);
    setSlidingSize(slidingSize + movingSlidingSize);
  };

  return (
    <S.Container buttonSizeOnBothSide={buttonSizeOnBothSide}>
      <CarouselButton
        showingSlideCardNum={showingSlideCardNum}
        handleClickSlide={handleClickSlide}
        cardNum={children?.length || items.length}
        isMoving={isMoving}
        buttonSizeOnBothSide={buttonSizeOnBothSide}
      />
      <S.Wrapper itemGap={itemGap} buttonSize={buttonSizeOnBothSide}>
        <ItemContainer showingSlideCardNum={showingSlideCardNum} slidingSize={slidingSize} handleTransitionEnd={handleTransitionEnd} itemGap={itemGap}>
          {items.map(({ id, content }) => (
            <S.ChildrenItem key={`item-${id}`}>{content}</S.ChildrenItem>
          ))}
        </ItemContainer>
      </S.Wrapper>
    </S.Container>
  );
};

export default Carousel;
