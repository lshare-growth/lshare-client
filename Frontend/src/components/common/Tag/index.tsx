/* eslint-disable react/require-default-props */
import React from 'react';
import Icon from '@common/Icon';
import * as S from './style';

type modeType = 'default' | 'custom';

type TagProps = {
  children: React.ReactNode;
  mode?: modeType;
  className?: string;
  // eslint-disable-next-line no-unused-vars
  handleClick: (params: string) => void;
};

type TagModeType = Record<modeType, any>;
const DEFAULT_MODE = 'default';
const TAG = '# ';

const Tag = ({
  children,
  mode = DEFAULT_MODE,
  className,
  handleClick,
}: TagProps) => {
  const TagMode: TagModeType = {
    default: TAG + children,
    custom: children,
  };

  switch (mode) {
    case 'default':
      return <S.Tag className={className}>{TagMode[mode]}</S.Tag>;
    case 'custom':
      return (
        <S.CustomTag
          className={className}
          onClick={() => handleClick(children as string)}
        >
          <S.Container>{`${TagMode[mode]} `}</S.Container>
          <S.Container>
            <Icon mode="cancel" />
          </S.Container>
        </S.CustomTag>
      );
    default:
      return null;
  }
};

export default Tag;
