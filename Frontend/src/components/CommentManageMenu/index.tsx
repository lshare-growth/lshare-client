/* eslint-disable react/require-default-props */
import Icon from '@components/common/Icon';
import Button from '@components/common/Button';
import useMouse from '@hooks/useMouse';
import * as S from './style';
import items from './constants';

type CommentManageMenuProps = {
  className?: string;
  isCommentWriter: boolean;
  handleClickEdit: () => void;
  handleClickDelete: () => void;
  // eslint-disable-next-line no-unused-vars
  handleClickEmoji: (newEmoji: string) => void;
};

const CommentManageMenu = ({ className, isCommentWriter, handleClickEdit, handleClickDelete, handleClickEmoji }: CommentManageMenuProps) => {
  const { isMouseOvered, handleMouseOver, handleMouseOut } = useMouse(false);

  return (
    <S.Container className={className}>
      <S.Item key="CommentManageMenu-menu-emoji" onFocus={handleMouseOver} onBlur={handleMouseOut} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <S.PopUp isHovered={isMouseOvered}>
          {items.map(({ id, value }) => (
            <S.EmojiItem key={`CommentManageMenu-items-${id}`} onClick={() => handleClickEmoji(value)}>
              <Button mode="tiny" size="tiny">
                {value}
              </Button>
            </S.EmojiItem>
          ))}
        </S.PopUp>
        <Button mode="tiny" size="tiny">
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
  );
};

export default CommentManageMenu;
