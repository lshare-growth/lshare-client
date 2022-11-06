/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import React, { ChangeEvent } from 'react';
import Input from '@components/common/Input';
import * as S from './style';

type SearchType = {
  size: string;
  id: string;
  handleClickSearch?: () => void;
  handleFocusDefault?: () => void;
  className?: string;
  value?: string;
  handleChangeValue?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const Search = ({ size, id, handleKeyPress, handleClickSearch, handleFocusDefault, className, value, handleChangeValue }: SearchType) => (
  <S.Container className={className}>
    <S.CustomInput id={id} size={size} handleFocusDefault={handleFocusDefault} value={value} handleChangeValue={handleChangeValue} handleKeyPress={handleKeyPress} />
    <S.CustomButton size="xsmall" handleClick={handleClickSearch}>
      검색
    </S.CustomButton>
  </S.Container>
);

export default Search;
