/* eslint-disable no-shadow */
/* eslint-disable react/require-default-props */
import CommentInfos from '@components/CommentInfos';
import CommentManageMenu from '@components/CommentManageMenu';
import CommentContent from '@components/CommentContent';
import CommentWrite from '@components/CommentWrite';
import emojisType from '@components/types/ReactionList';
import replys from '@components/Comment/constants';
import TextButton from '@components/common/TextButton';
import replyType from '@components/types/Comment';
import axios from 'axios';
import { useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import commentState from '@store/Comment';
import Modal from '@components/Modal';
import Portal from '@components/Modal/Portal';
import DoubleButtonModalArea from '@components/Modal/DoubleButtonModalArea';
import { BUTTON_CONFIRM, BUTTON_CANCEL } from '@components/Modal/constants';
import * as S from './style';

type CommentProps = {
  className?: string;
  replySize?: 'medium' | 'small';
  nickname: string;
  time: string;
  isEditied: boolean;
  replyNum: number;
  commentId: number;
  content: string;
  avatorSrc: string;
  avatorAlt: string;
  emojis: emojisType[];
  isAuthorized: boolean;
  writer: string;
  id?: number;
};

const Comment = ({ className, id, replySize = 'medium', nickname, time, isEditied, replyNum, commentId, content, avatorSrc, avatorAlt, emojis, isAuthorized, writer }: CommentProps) => {
  const [isToggled, setIsToggled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isToggledComments, setIsToggledComments] = useState(false);
  const [replyState, setReplyState] = useState<replyType[]>([]);
  const [comments, setComments] = useRecoilState(commentState);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickToggle = () => {
    setIsToggled(!isToggled);
  };

  const handleClickEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleClickDelete = () => {
    setIsModalVisible(true);
  };

  const handleClickToggleComments = () => {
    setIsToggledComments(!isToggledComments);

    // TODO: 서버요청 후 받은 데이터로 replyState갱신
    setReplyState(replys);
  };

  const [showingEmojis, setShowingEmojis] = useState(emojis);

  const handleClickEmoji = (newEmoji: string) => {
    const postEmoji = async () => {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      try {
        const data = {
          emotion: newEmoji,
        };
        const response = await axios.post(`${process.env.END_POINT}api/studies/${commentId}/comments/${id}/reactions`, data, { headers });
        if (response.status === 404) {
          console.log('404 error');
          return;
        }
        if (response.status === 500) {
          console.log('500 error');
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    postEmoji();

    setShowingEmojis([
      ...showingEmojis,
      {
        id: showingEmojis.length,
        type: 'new emoji',
        value: newEmoji,
        count: 1,
        isSelected: true,
      },
    ]);

    // TODO: 이모티콘 추가 API
  };

  const handleToggleEmoji = (selectedId: number) => {
    const selectedEmoji = showingEmojis.find(({ id }) => id === selectedId);
    if (!selectedEmoji) {
      return;
    }
    const postEmoji = async () => {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      try {
        const data = {
          emotion: selectedEmoji.value,
        };
        const response = await axios.post(`${process.env.END_POINT}api/studies/${commentId}/comments/${id}/reactions`, data, { headers });
        if (response.status === 404) {
          console.log('404 error');
          return;
        }
        if (response.status === 500) {
          console.log('500 error');
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    postEmoji();

    const remainEmojis = showingEmojis.filter(({ id }) => id !== selectedId);

    const isSelectOnlyByMe = selectedEmoji.isSelected && selectedEmoji.count === 1;
    const newEmojis = isSelectOnlyByMe
      ? [...remainEmojis]
      : [
          ...remainEmojis,
          {
            id: selectedEmoji.id,
            type: selectedEmoji.type,
            value: selectedEmoji.value,
            count: selectedEmoji.isSelected ? selectedEmoji.count - 1 : selectedEmoji.count + 1,
            isSelected: !selectedEmoji.isSelected,
          },
        ];
    newEmojis.sort((aEmoji, bEmoji) => bEmoji.id - aEmoji.id);
    setShowingEmojis(newEmojis);

    // TODO: 이모티콘 토글 API
  };

  const handleModal = () => {
    setIsModalVisible(false);
  };

  const handleClickCancel = () => {};

  const handleClickConfirm = () => {
    const deleteStudy = async () => {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      try {
        const response = await axios.delete(`${process.env.END_POINT}api/studies/${commentId}/comments/${id}`, { headers });
        if (response.status === 404) {
          console.log('404 error');
          return;
        }
        if (response.status === 500) {
          console.log('500 error');
          return;
        }
      } catch (error: any) {
        console.log(error);
      }

      const remainComments = comments.filter((comment) => comment.id !== id);
      setComments(remainComments);
    };

    deleteStudy();
  };

  return (
    <div className={className}>
      {isEditing ? (
        <CommentWrite
          id="editing-comment"
          currentCommentId={id}
          avatorSrc={avatorSrc}
          avatorAlt={avatorAlt}
          typedValue={content}
          isAuthorized={isAuthorized}
          handleClickEdit={handleClickEdit}
          commentId={commentId}
          isEditing={isEditing}
          nickname={nickname}
        />
      ) : (
        <>
          <S.CommentInfosMenuContainer>
            <CommentInfos avatorSrc={avatorSrc} avatorAlt={avatorAlt} nickname={nickname} time={time} isEdited={isEditied} isWriter={writer === nickname} />
            <CommentManageMenu isCommentWriter handleClickEdit={handleClickEdit} handleClickDelete={handleClickDelete} handleClickEmoji={handleClickEmoji} />
          </S.CommentInfosMenuContainer>
          <S.CommentContainer>
            <CommentContent content={content} />
            <S.FlexBox>
              <TextButton handleClick={handleClickToggle}>답글 적기</TextButton>
              <S.CustomReactionList emojis={showingEmojis} commentId={commentId} handleClick={handleToggleEmoji} />
            </S.FlexBox>
            {isToggled && (
              <S.CustomCommentWrite id="commentWrite" currentCommentId={id} isAuthorized={isAuthorized} avatorSrc={avatorSrc} avatorAlt={avatorAlt} size={replySize} commentId={commentId} />
            )}
            <TextButton handleClick={handleClickToggleComments} mode="accent">
              {`답글 ${replyNum}개`}
            </TextButton>
            {isToggledComments && (
              <S.ReplyContainer>
                {replyState.map((reply) => (
                  <S.ReplyItem key={`comment-reply-${reply.id}`}>
                    <Comment
                      replySize="small"
                      nickname={reply.nickname}
                      time={reply.time}
                      isEditied={reply.isEditied}
                      replyNum={reply.replyNum}
                      commentId={reply.commentId}
                      content={reply.content}
                      avatorSrc={reply.avatorSrc}
                      avatorAlt={reply.avatorAlt}
                      emojis={reply.emojis}
                      isAuthorized={reply.isAuthorized}
                      writer={writer}
                    />
                  </S.ReplyItem>
                ))}
              </S.ReplyContainer>
            )}
          </S.CommentContainer>
        </>
      )}
      <Portal>
        {isModalVisible && (
          <Modal onClose={handleModal} ref={modalRef}>
            <DoubleButtonModalArea handleClickLeftButton={handleClickCancel} handleClickRightButton={handleClickConfirm}>
              댓글 삭제
              <h3>댓글을 삭제하시겠습니까?</h3>
              {BUTTON_CANCEL}
              {BUTTON_CONFIRM}
            </DoubleButtonModalArea>
          </Modal>
        )}
      </Portal>
    </div>
  );
};

export default Comment;
