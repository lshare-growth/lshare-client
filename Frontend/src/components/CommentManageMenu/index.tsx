/* eslint-disable react/require-default-props */
import Icon from '@components/common/Icon';
import Button from '@components/common/Button';
import useMouse from '@hooks/useMouse';
import { useRecoilState } from 'recoil';
import reactionsState, { reactionsType } from '@store/Reactions';
import { useState, useRef, useEffect } from 'react';
import * as S from './style';
import items from './constants';

type CommentManageMenuProps = {
  className?: string;
  isCommentWriter: boolean;
  handleClickEdit: () => void;
  handleClickDelete: () => void;
  // eslint-disable-next-line no-unused-vars
  handleClickEmoji: (newEmoji: string) => void;
  isLoading?: boolean;
};

const ITEM_NUM = 3;
const skeletonItems = Array.from({ length: ITEM_NUM }, (_, index) => index + 1);

const CommentManageMenu = ({ className, isLoading, isCommentWriter, handleClickEdit, handleClickDelete, handleClickEmoji }: CommentManageMenuProps) => {
  const { isClicked, handleClick } = useMouse(false);
  // isMouseOvered, handleMouseOver, handleMouseOut, handleKeep,
  // type reactionsKeyType = 'id' | 'type' | 'value';
  // type reactionsType = Record<reactionsKeyType, any>;
  // eslint-disable-next-line no-unused-vars
  const [reactions] = useRecoilState<reactionsType[]>(reactionsState);
  const [isClickAway, setIsClickAway] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      setIsClickAway(!ref.current?.contains(event.target as Node));
    };

    document.addEventListener('click', handleClickAway);
  }, []);

  useEffect(() => {
    if (isClicked && isClickAway) {
      handleClick();
    }
  }, [isClickAway]);

  return isLoading ? (
    <S.Container>
      <ul style={{ display: 'flex' }}>
        {skeletonItems.map((skeletonItemIndex) => (
          <S.SkeletonItem key={`CommentInfos-skeleton-${skeletonItemIndex}`}>
            <S.SkeletonSmallLabel />
          </S.SkeletonItem>
        ))}
      </ul>
    </S.Container>
  ) : (
    <div ref={ref}>
      <S.Container className={className}>
        <S.Item key="CommentManageMenu-menu-emoji">
          <S.PopUp isClicked={isClicked}>
            {items.map(({ id, value }) => (
              <S.EmojiItem className="reaction" key={`CommentManageMenu-items-${id}`} onClick={() => handleClickEmoji(value)}>
                <Button className="reaction" mode="tiny" size="tiny">
                  {value}
                </Button>
              </S.EmojiItem>
            ))}
          </S.PopUp>
          <Button mode="tiny" size="tiny" handleClick={handleClick}>
            <Icon mode="emoji" />
          </Button>
        </S.Item>
        {isCommentWriter && (
          <>
            <S.Item key="CommentManageMenu-menu-edit">
              <Button size="small" handleClick={handleClickEdit}>
                수정
              </Button>
            </S.Item>
            <S.Item key="CommentManageMenu-menu-cancel">
              <Button size="small" handleClick={handleClickDelete}>
                삭제
              </Button>
            </S.Item>
          </>
        )}
      </S.Container>
    </div>
  );
};

export default CommentManageMenu;
