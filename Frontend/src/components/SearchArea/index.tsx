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
  handleClickSearch: () => void;
  // eslint-disable-next-line no-unused-vars
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const SearchArea = ({ className, id, value, handleKeyPress, handleChangeValue, handleFocusDefault, handleBlur, handleBlurTag, isFocusedTag, handleClickSearch }: SearchAreaProps) => {
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
      <Search
        className="search"
        id={id}
        size="smallSmall"
        handleFocusDefault={handleFocusDefault}
        value={value}
        handleChangeValue={handleChangeValue}
        handleClickSearch={handleClickSearch}
        handleKeyPress={handleKeyPress}
      />
    </S.Container>
  );
};
export default SearchArea;
