/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import Tag from '@common/Tag';
import { ChangeEvent, useState } from 'react';
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
  // eslint-disable-next-line no-unused-vars
  handleClick?: (tag: string) => void;
  handleChangeValue?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const INPUT_SIZE = 'medium';

const SearchTag = ({ className, mode = DEFAULT_MODE, id, size, isTagSingly = true, tags, label, handleFocusDefault, handleClick, handleChangeValue }: SearchTagType) => {
  const [isResetTag, setIsResetTag] = useState(false);

  const initializeIsRestTag = () => {
    setIsResetTag(false);
  };

  const handleClickReset = () => {
    setIsResetTag(true);
  };

  const handleClickTag = (selectedTag: string) => {};
  switch (mode) {
    case 'default':
      return (
        <S.DefaultTagBox className={className}>
          <S.DefaultTagContainer>
            {tags?.map((tag) => (
              // eslint-disable-next-line react/no-array-index-key
              <S.Item key={`serachTag-${tag?.id}`}>
                <Tag handleClick={handleClick || handleClickTag}>{tag?.content}</Tag>
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
            handleChangeValue={handleChangeValue}
          />
          <S.CustomButton size="medium" handleClick={handleClickReset}>
            초기화
          </S.CustomButton>
        </S.Container>
      );
    default:
      return null;
  }
};

export default SearchTag;
