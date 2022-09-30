/* eslint-disable react/require-default-props */
import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import Search from '@components/Search';
import * as S from './style';

type SearchAreaProps = {
  className?: string;
  id: string;
  value?: string;
  // eslint-disable-next-line no-unused-vars
  handleChangeValue?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleFocusDefault: () => void;
  handleBlur: () => void;
  handleBlurTag?: () => void;
  isFocusedTag?: boolean;
};

const SearchArea = ({ className, id, value, handleChangeValue, handleFocusDefault, handleBlur, handleBlurTag, isFocusedTag }: SearchAreaProps) => {
  const target = useRef<HTMLDivElement>(null);
  const [isClickAway, setIsClickAway] = useState(false);
  const handleBlurDefault = () => {
    handleBlur();
  };

  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      setIsClickAway(!target.current?.contains(event.target as Node));
    };

    document.addEventListener('click', handleClickAway);
  }, []);

  useEffect(() => {
    const blurWhenClickAway = () => {
      if (!isClickAway) {
        return;
      }

      handleBlurDefault();
    };

    blurWhenClickAway();

    if (!handleBlurTag || isFocusedTag) {
      return;
    }

    handleBlurTag();
  }, [isClickAway]);
  return (
    <S.Container className={className} ref={target}>
      <Search className="search" id={id} size="medium" handleFocusDefault={handleFocusDefault} value={value} handleChangeValue={handleChangeValue} />
    </S.Container>
  );
};
export default SearchArea;
