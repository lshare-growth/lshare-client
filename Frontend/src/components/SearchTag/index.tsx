/* eslint-disable react/require-default-props */
import Tag from '@common/Tag';
import { useState } from 'react';
import tagType from '@components/types/Tags';
import * as S from './style';
import { DEFAULT_MODE } from './constants';

type SearchTagType = {
  className?: string;
  mode?: 'default' | 'tag';
  id: string;
  size?: string;
  isTagSingly?: boolean;
  tags?: tagType[];
  label?: string;
  handleFocusDefault?: () => void;
};

const INPUT_SIZE = 'medium';

const SearchTag = ({ className, mode = DEFAULT_MODE, id, size, isTagSingly = true, tags, label, handleFocusDefault }: SearchTagType) => {
  const handleClick = () => {};

  const [isResetTag, setIsResetTag] = useState(false);

  const initializeIsRestTag = () => {
    setIsResetTag(false);
  };

  const handleClickReset = () => {
    setIsResetTag(true);
  };

  switch (mode) {
    case 'default':
      return (
        <S.DefaultTagBox className={className}>
          <S.DefaultTagContainer>
            {tags?.map((tag) => (
              <S.Item key={`serachTag-${tag.id}`}>
                <Tag handleClick={handleClick}>{tag.content}</Tag>
              </S.Item>
            ))}
          </S.DefaultTagContainer>
        </S.DefaultTagBox>
      );
    case 'tag':
      return (
        <S.Container className={className}>
          <S.CustomInput
            mode={mode}
            id={id}
            label={label}
            size={size || INPUT_SIZE}
            handleFocusDefault={handleFocusDefault}
            isResetTag={isResetTag}
            initializeIsRestTag={initializeIsRestTag}
            isTagSingly={isTagSingly}
            tags={tags}
          />
          <S.CustomButton size="small" handleClick={handleClickReset}>
            초기화
          </S.CustomButton>
        </S.Container>
      );
    default:
      return null;
  }
};

export default SearchTag;
