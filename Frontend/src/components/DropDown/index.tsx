/* eslint-disable react/require-default-props */
import { useEffect, useRef, useState } from 'react';
import useMouse from '@hooks/useMouse';
import { useRecoilState } from 'recoil';
import dropDownItemState from '@store/DropDownItem';
import { Items } from './types';
import Options from './Options';
import * as S from './style';

type DropDownProps = {
  width: string;
  height: string;
  optionsWidth?: string;
  selectTitle: string;
  options: Items[];
  isStartFromRight?: boolean;
  className?: string;
  type?: string;
};

const DropDown = ({ width, height, selectTitle, optionsWidth = '100%', isStartFromRight, options, className, type }: DropDownProps) => {
  const { isClicked, isMouseOvered, handleMouseOver, handleMouseOut, handleMouseDown, handleMouseUp, handleClick } = useMouse(false);

  const [dropDownItem] = useRecoilState(dropDownItemState);

  const [isClickAway, setIsClickAway] = useState(false);
  const drop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      setIsClickAway(!drop.current?.contains(event.target as Node));
    };

    document.addEventListener('click', handleClickAway);
  }, []);

  useEffect(() => {
    if (isClicked && isClickAway) {
      handleClick();
    }
  }, [isClickAway]);

  return (
    <S.Container width={width} height={height} ref={drop} className={className}>
      <S.CustomSelect
        handleMouseOver={handleMouseOver}
        handleMouseOut={handleMouseOut}
        handleMouseDown={handleMouseDown}
        handleMouseUp={handleMouseUp}
        selectTitle={dropDownItem.find((item) => item.type === type)?.content || selectTitle}
        handleClick={handleClick}
        isMouseOvered={isMouseOvered}
      />
      <S.Content className={selectTitle} width={optionsWidth} isStartFromRight={isStartFromRight} isClicked={isClicked}>
        <Options type={type} options={options} handleClickSelect={handleClick} />
      </S.Content>
    </S.Container>
  );
};

export default DropDown;
