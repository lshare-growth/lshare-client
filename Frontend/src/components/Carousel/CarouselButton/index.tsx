/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import * as S from './style';

type CarouselButtonProps = {
  showingSlideCardNum: number;
  // eslint-disable-next-line no-unused-vars
  handleClickSlide: (size: number) => void;
  isMoving: boolean;
  cardNum: number;
  buttonSizeOnBothSide: string;
};

const CarouselButton = ({ showingSlideCardNum, handleClickSlide, isMoving, cardNum, buttonSizeOnBothSide }: CarouselButtonProps) => {
  const initialHeadCardOrder = 1;

  const [curHeadCardOrder, setCurHeadCardOrder] = useState(initialHeadCardOrder);
  const [disabledPrevBtn, setDisabledPrevBtn] = useState(true);
  const [disabledNextBtn, setDisabledNextBtn] = useState(false);

  const handleClickPrev = () => {
    if (disabledPrevBtn) return;

    /**
     * 1 2 3 4 | 5 6 7 8 (이전에 4개 있는 경우)
     * 5 - 4 => 1
     * 1 2 3 | 4 5 6 7 |(이전에 3개 있는 경우)
     * 4 - 4 => 0
     * 1 2 | 3 4 5 6 | (이전에 2개 있는 경우)
     * 3 - 4 => -1
     * 1 | 2 3 4 5 | (이전에 1개 있는 경우)
     * 2- 4 => -2
     */
    const prevOrder = curHeadCardOrder - showingSlideCardNum;
    const isLeakNFirstSlide = prevOrder < 1;
    const isFirstShowingSlide = isLeakNFirstSlide || prevOrder === initialHeadCardOrder;

    changeBtnActivation(isFirstShowingSlide, setDisabledPrevBtn, setDisabledNextBtn);

    /**
     * if(showingSlideCardNum = 4) 1 2 3 | 4 5 6 7 | => 4 + 4 - (4 + 1) = 3
     * if(showingSlideCardNum = 3) 1 2 | 3 4 5 | => 3 + 3 - (3 + 1) = 2
     */
    const sizeToMove = showingSlideCardNum + curHeadCardOrder - (showingSlideCardNum + initialHeadCardOrder);

    setCurHeadCardOrder(isLeakNFirstSlide ? curHeadCardOrder - sizeToMove : curHeadCardOrder - showingSlideCardNum);

    const prevSlidingSize = getSlidingSize(isLeakNFirstSlide, sizeToMove, showingSlideCardNum);

    handleClickSlide(prevSlidingSize);
  };

  const handleClickNext = () => {
    if (disabledNextBtn) return;

    const showingHeadCardOrder = curHeadCardOrder + showingSlideCardNum;
    const sizeToMove = cardNum % showingSlideCardNum;

    const isUndividedLastSlide = (showingHeadCardOrder - initialHeadCardOrder) / showingSlideCardNum === Math.floor(cardNum / showingSlideCardNum);

    const isDividedLastSlide = showingHeadCardOrder + showingSlideCardNum === cardNum + initialHeadCardOrder;

    const isLastShowingSlide = isUndividedLastSlide || isDividedLastSlide;

    changeBtnActivation(isLastShowingSlide, setDisabledNextBtn, setDisabledPrevBtn);

    setCurHeadCardOrder(isUndividedLastSlide ? curHeadCardOrder + sizeToMove : showingHeadCardOrder);

    const nextSlidingSize = getSlidingSize(isUndividedLastSlide, sizeToMove, showingSlideCardNum);

    handleClickSlide(-nextSlidingSize);
  };

  const changeBtnActivation = (isImmovable: boolean, setSelectedBtnActivate: React.Dispatch<React.SetStateAction<boolean>>, setAnotherBtnActivate: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (isImmovable) {
      setSelectedBtnActivate(true);
    } else {
      setSelectedBtnActivate(false);
    }
    setAnotherBtnActivate(false);
  };

  const getSlidingSize = (isMoveableSlide: boolean, sizeToMove: number, showenSlideCardNum: number) => {
    const moveDefault = 100;
    const slidingSize = isMoveableSlide ? Math.floor(moveDefault * (sizeToMove / showenSlideCardNum)) : moveDefault;
    return slidingSize;
  };

  return (
    <>
      <S.LeftButton icon="◀" disabled={disabledPrevBtn || isMoving} onClick={handleClickPrev} buttonSizeOnBothSide={buttonSizeOnBothSide} />
      <S.RightButton icon="▶" disabled={disabledNextBtn || isMoving} onClick={handleClickNext} buttonSizeOnBothSide={buttonSizeOnBothSide} />
    </>
  );
};

export default CarouselButton;
