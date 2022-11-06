/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import Icon from '@components/common/Icon';
import useDateForm from '@hooks/useDateForm';
import { useRecoilState } from 'recoil';
import tagsState from '@store/Tags';
import tagType from '@components/types/Tags';
import Hash from '@assets/img/hash.png';
import keywordsState from '@store/Keyword';
import showingInputValueState from '@store/ShowingInputValue';
import Button from '@components/common/Button';
import * as S from './style';
import { DEFAULT_MODE, DEFAULT_SIZE, sizes } from './constants';

type InputProps = {
  label?: string;
  mode?: 'default' | 'tag' | 'calendar';
  size?: string;
  placeholder?: string;
  isEssential?: boolean;
  disabled?: boolean;
  isLabelHorizontal?: boolean;
  id: string;
  className?: string;
  isResetTag?: boolean;
  isTagSingly?: boolean;
  tags?: tagType[];
  initializeIsRestTag?: () => void;
  handleKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  handleFocusDefault?: () => void;
  value?: string;
  handleChangeValue?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const Input = ({
  label = '',
  mode = DEFAULT_MODE,
  size = DEFAULT_SIZE,
  placeholder = '',
  isEssential,
  disabled = false,
  id,
  className,
  handleKeyDown,
  handleFocusDefault,
  isLabelHorizontal,
  isResetTag,
  initializeIsRestTag,
  isTagSingly = true,
  tags,
  value,
  handleChangeValue,
  handleKeyPress,
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  // TODO: ClickAway custom hook으로 빼서 드롭다운에서도 재활용하기
  const [isClickAway, setIsClickAway] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const targetInput = useRef<HTMLInputElement>(null);
  const [keywords, setKeywords] = useRecoilState(keywordsState);
  const [currentTags, setCurrentTags] = useRecoilState(tagsState);
  // const [keywords, setKeywords] = useState<string[]>([]);
  // const [currentTags, setCurrentTags] = useState<string[]>([]);
  const [searchWord, setSearchWord] = useState('');
  const MAX_TAG_TEXT_LENGTH = 15;
  const MIN_TAG_TEXT_LENGTH = 2;
  const MAX_TAG_NUM = 8;
  const [showingInputValue, setShowingInputValue] = useRecoilState(showingInputValueState);
  const [tag, setTag] = useState('');

  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      setIsClickAway(!ref.current?.contains(event.target as Node));
    };

    document.addEventListener('click', handleClickAway);
  }, []);

  useEffect(() => {
    const blurWhenClickAway = () => {
      if (!isClickAway) {
        return;
      }

      setIsFocused(false);
    };

    blurWhenClickAway();
  }, [isClickAway]);

  useEffect(() => {
    const focusInputWhenClickParent = () => {
      if (isFocused) {
        targetInput.current?.focus();
        return;
      }

      targetInput.current?.blur();
    };

    focusInputWhenClickParent();
  }, [isFocused]);

  useEffect(() => {
    if (!isResetTag) {
      return;
    }

    setKeywords([]);
    setCurrentTags([]);
    // TODO: 서버에 tag 한번에 모두 요청

    if (!initializeIsRestTag) {
      return;
    }

    initializeIsRestTag();
  }, [isResetTag]);

  const handleClickDeleteTag = (selectedKeyword: string) => {
    if (!keywords) {
      return;
    }
    const newKeywords = keywords.filter((keyword) => keyword !== selectedKeyword);

    setKeywords([...newKeywords]);

    if (isTagSingly) {
      // TODO: 서버에 tag 하나씩 요청
    }

    setCurrentTags([...newKeywords]);
  };

  const handleSubmitInput = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { elements } = event.currentTarget;
    const target = elements as typeof elements & {
      [id: string]: { value: string };
    };
    const newValue = target[id].value;

    target[id].value = '';
    setSearchWord(newValue);
  };

  const handleSubmitTag = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { elements } = event.currentTarget;
    const targetElements = elements as typeof elements & {
      [id: string]: { value: string };
    };

    const newKeyword = targetElements[id].value;
    targetElements[id].value = '';

    if (keywords.length >= MAX_TAG_NUM) {
      return;
    }

    if (newKeyword.length > MAX_TAG_TEXT_LENGTH || newKeyword.length === 0 || newKeyword.length < MIN_TAG_TEXT_LENGTH) {
      return;
    }

    const isExistKeyword = keywords?.find((keyword) => keyword === newKeyword);
    if (isExistKeyword) {
      return;
    }
    const newAllKeywords = [...keywords, newKeyword];

    setKeywords(newAllKeywords);
    setCurrentTags(newAllKeywords);
    if (isTagSingly) {
      // TODO: 서버에 tag 하나씩 요청
    }

    // TODO: 서버에 tag 한번에 모두 요청
  };

  const { width, height } = sizes[size];

  const { showingValue, handleDateChange, updateShowingInput } = useDateForm('');

  const handleDateChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    handleDateChange(event);
    if (!handleChangeValue) {
      return;
    }
    handleChangeValue(event);
  };

  const delimiter = '-';

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!handleChangeValue) {
      return;
    }
    setTag(event.target.value);
    handleChangeValue(event);
  };

  const handleTagKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (tag.length > 0) {
      setTag('');
      return;
    }
    if (event.key === 'Backspace') {
      const keywordsLen = keywords.length;
      const remainKeywords = keywords.slice(0, keywordsLen - 1);
      setKeywords([...remainKeywords]);
      setCurrentTags([...remainKeywords]);
    }
  };

  useEffect(() => {
    setShowingInputValue(showingValue);
  }, [showingValue]);

  useEffect(() => {
    updateShowingInput({ delimiter });
  }, [value, showingValue, updateShowingInput, handleDateChange]);

  switch (mode) {
    case 'default':
      return (
        <S.SearchForm className={className} onSubmit={handleSubmitInput}>
          {isLabelHorizontal ? (
            <S.LabelInputContainer>
              <S.LabelContainer>
                <S.SearchLabel htmlFor={id} hasLabel={label.length > 0}>
                  {label}
                </S.SearchLabel>
                {isEssential && <S.HighlightLabel>*</S.HighlightLabel>}
              </S.LabelContainer>
              <S.DefaultInput
                type="text"
                id={id}
                placeholder={placeholder}
                width={width}
                height={height}
                disabled={disabled}
                value={value}
                onFocus={handleFocusDefault}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
            </S.LabelInputContainer>
          ) : (
            <>
              <S.LabelContainer>
                <S.SearchLabel htmlFor={id} hasLabel={label.length > 0}>
                  {label}
                </S.SearchLabel>
                {isEssential && <S.HighlightLabel>*</S.HighlightLabel>}
              </S.LabelContainer>
              <S.DefaultInput
                type="text"
                id={id}
                placeholder={placeholder}
                width={width}
                height={height}
                disabled={disabled}
                onFocus={handleFocusDefault}
                value={value}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
            </>
          )}
        </S.SearchForm>
      );
    case 'tag':
      return (
        <S.Container className={className}>
          <S.SearchForm onSubmit={handleSubmitTag}>
            <S.SearchLabel htmlFor={id} hasLabel={label.length > 0}>
              {label}
            </S.SearchLabel>
            <S.InputContainer width={width} height={height} onClick={handleFocus} ref={ref} isFocused={isFocused}>
              {/* <div style={{ flexWrap: 'wrap' }}> */}
              <img src={Hash} alt="hash" width="16px" height="16px" />
              <S.TagsContainer>
                {currentTags?.map((keyword) => (
                  <S.Tags key={`keyword-${keyword}`}>
                    <S.CustomTag className="tag" mode="custom" handleClick={() => handleClickDeleteTag(keyword)}>
                      {keyword}
                    </S.CustomTag>
                  </S.Tags>
                ))}
              </S.TagsContainer>
              <S.Input
                type="text"
                id={id}
                name={id}
                placeholder={placeholder}
                ref={targetInput}
                onKeyDown={handleKeyDown}
                onFocus={handleFocusDefault}
                onChange={handleChange}
                onKeyDownCapture={handleTagKeyDown}
              />
              {/* </div> */}
            </S.InputContainer>
          </S.SearchForm>
        </S.Container>
      );
    case 'calendar':
      return (
        <div className={className}>
          <S.LabelInputContainer>
            <S.LabelContainer>
              <S.SearchLabel htmlFor={id} hasLabel={label.length > 0}>
                {label}
              </S.SearchLabel>
            </S.LabelContainer>
            <S.CalendarInputContainer>
              <S.CalendarInput
                type="text"
                id={id}
                placeholder={placeholder}
                width={width}
                height={height}
                disabled={disabled}
                onFocus={handleFocusDefault}
                value={value || showingValue}
                onChange={(event) => handleDateChangeValue(event)}
              />
            </S.CalendarInputContainer>
          </S.LabelInputContainer>
        </div>
      );
    default:
      return null;
  }
};

export default Input;
