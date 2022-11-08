/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/require-default-props */
import CommentInfos from '@components/CommentInfos';
import CommentManageMenu from '@components/CommentManageMenu';
import CommentContent from '@components/CommentContent';
import CommentWrite from '@components/CommentWrite';
import emojisType from '@components/types/ReactionList';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
// import timeForToday from '@pages/Detail/util';
import { useNavigate } from 'react-router-dom';
import useLogOut from '@hooks/useLogout';
import Modal from '@components/Modal';
import Portal from '@components/Modal/Portal';
import DoubleButtonModalArea from '@components/Modal/DoubleButtonModalArea';
import { BUTTON_CONFIRM, BUTTON_CANCEL } from '@components/Modal/constants';
import replyState, { replyType } from '@store/Reply';
import { Cookies } from 'react-cookie';
import reactionModalInfoState from '@store/ReactionModal';
import items from '@components/CommentManageMenu/constants';
import { getHeaders } from '@pages/util';
import { ETC_PATH, LANDING_PATH, SERVER_ERROR_PATH, LOGIN_PATH } from '../../constants/route';
import * as S from './style';

type CommentReplyProps = {
  className?: string;
  nickname: string;
  time: string;
  isEditied: boolean;
  // commentId: number;
  content: string;
  avatorSrc: string;
  avatorAlt: string;
  emojis: emojisType[];
  isAuthorized: boolean;
  // writer: string;
  studyOrganizer: string;
  id?: number;
  studyId?: number;
  writerId: number;
  parentId?: number;
  isMyComment: boolean;
  // eslint-disable-next-line react/no-unused-prop-types
  myMemberId: number;
  currentCommentId: number;
  isStudyOrganizer: boolean;
  isDeleted: boolean;
  deleteTargetReply?: (id: number, deletedReply: replyType) => void;
  editReply?: (value: string, currentCommentId: number | undefined) => void;
  handleCurrentReplies?: (id: number, emojis: emojisType[]) => void;
  doingHoverLoading?: () => void;
  doneHoverLoading?: () => void;
  isHoverLoading?: boolean;
};

const CommentReply = ({
  className,
  id,
  studyOrganizer,
  nickname,
  time,
  isEditied,
  // commentId,
  content,
  avatorSrc,
  avatorAlt,
  emojis,
  isAuthorized,
  // writer,
  writerId,
  // myMemberId,
  parentId,
  isMyComment,
  isStudyOrganizer,
  currentCommentId,
  studyId,
  isDeleted,
  deleteTargetReply,
  editReply,
  handleCurrentReplies,
  doingHoverLoading,
  doneHoverLoading,
  isHoverLoading,
}: CommentReplyProps) => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  // const [comments, setComments] = useState<replyType[]>([]);
  const [comments, setComments] = useRecoilState(replyState);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { logout } = useLogOut();
  const cookies = new Cookies();
  const [reactionModalInfo, setReactionModalInfo] = useRecoilState(reactionModalInfoState);

  const handleClickEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleClickDelete = () => {
    setIsModalVisible(true);
  };

  const handleClickConfirm = () => {
    const deleteReply = async () => {
      const data = {
        studyId,
      };
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();
      try {
        // const response = await axios.delete(`${process.env.END_POINT}api/comments/${parentId}/recomments/${id}`, { headers });

        const body = token
          ? {
              data,
              headers,
            }
          : { data };
        // const response = await axios.delete(`${process.env.END_POINT}api/comments/${parentId}/recomments/${id}`, { data, headers });
        const response = await axios.delete(`${process.env.END_POINT}api/comments/${parentId}/recomments/${id}`, body);

        if (!deleteTargetReply || !id) {
          return;
        }
        // const remainComments = comments.filter((comment) => comment.id !== id);
        // setComments([...remainComments]);
        // const targetComment = comments.find((comment) => comment.id === id);

        // console.log(targetComment, comments, id);
        // console.log(targetComment);
        // if (!targetComment) {
        //   return;
        // }
        deleteTargetReply(id, {
          id,
          nickname: '(삭제)',
          parentId,
          writerId,
          time,
          isEditied: false,
          replyNum: 0,
          commentId: id,
          content: '삭제된 댓글입니다.',
          avatorSrc: '',
          avatorAlt: '',
          emojis: [],
          isAuthorized: false,
          isStudyOrganizer: false,
          isMyComment: false,
          isDeleted: true,
        });
      } catch (error: any) {
        if (error.response.status === 401) {
          logout();
          navigate(`${LOGIN_PATH}`, { state: { previousPathname: location.pathname } });
          return;
        }

        if (error.response.status === 404) {
          navigate(`${ETC_PATH}`);
          return;
        }

        if (error.response.status === 500) {
          navigate(`${SERVER_ERROR_PATH}`);
        }
      }

      // const remainComments = comments.filter((comment) => comment.id !== id);
      // setComments([
      //   {
      //     id: targetComment.id,
      //     nickname: '(삭제)',
      //     parentId,
      //     writerId: targetComment.writerId,
      //     time: targetComment.time,
      //     isEditied: targetComment.isEditied,
      //     replyNum: targetComment.replyNum,
      //     commentId: targetComment.commentId,
      //     content: '삭제된 댓글입니다.',
      //     avatorSrc: '',
      //     avatorAlt: '',
      //     emojis: [],
      //     isAuthorized: false,
      //     isStudyOrganizer: false,
      //     isMyComment: false,
      //     isDeleted: true,
      //   },
      //   ...remainComments,
      // ]);
    };

    deleteReply();
  };

  const [showingEmojis, setShowingEmojis] = useState(emojis);

  useEffect(() => {
    setShowingEmojis(emojis);
  }, [emojis]);

  const handleToggleEmoji = (selectedContent: string) => {
    const selectedEmoji = showingEmojis.find(({ value }) => value === selectedContent);

    if (!selectedEmoji) {
      return;
    }

    const toggleEmoji = () => {
      const remainEmojis = showingEmojis.filter(({ value }) => value !== selectedContent);

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
      newEmojis.sort((aEmoji, bEmoji) => aEmoji.id - bEmoji.id);
      setShowingEmojis(newEmojis);
    };

    const postEmoji = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();
      try {
        const data = {
          emotion: selectedEmoji.value,
        };

        const body = token
          ? {
              headers,
            }
          : {};

        const response = await axios.post(`${process.env.END_POINT}api/reactions/studies/${studyId}/comments/${id}`, data, body);
        toggleEmoji();
        setReactionModalInfo({
          studyId,
          isVisible: false,
        });
      } catch (error: any) {
        if (error.response.status === 401) {
          logout();
          setReactionModalInfo({
            studyId,
            isVisible: true,
          });
          // navigate(`${LOGIN_PATH}`, { state: { previousPathname: location.pathname } });
          return;
        }

        if (error.response.status === 404) {
          navigate(`${ETC_PATH}`);
          return;
        }

        if (error.response.status === 500) {
          navigate(`${SERVER_ERROR_PATH}`);
        }
      }
    };

    postEmoji();

    // TODO: 이모티콘 토글 API
  };

  const handleModal = () => {
    setIsModalVisible(false);
  };

  const handleClickCancel = () => {};

  const handleClickEmoji = (newEmoji: string) => {
    const addEmoji = () => {
      const selectedEmoji = showingEmojis.find(({ value }) => value === newEmoji);

      if (selectedEmoji) {
        const remainEmojis = showingEmojis.filter(({ value }) => value !== newEmoji);

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
        newEmojis.sort((aEmoji, bEmoji) => aEmoji.id - bEmoji.id);
        setShowingEmojis(newEmojis);
        if (handleCurrentReplies && id) {
          handleCurrentReplies(id, newEmojis);
        }
        return;
      }

      const targetEmoji = items.find(({ value }) => value === newEmoji);
      const newEmojis = [
        ...showingEmojis,
        {
          id: targetEmoji?.id ? targetEmoji?.id : showingEmojis.length,
          type: 'new emoji',
          value: newEmoji,
          count: 1,
          isSelected: true,
        },
      ];
      newEmojis.sort((aEmoji, bEmoji) => aEmoji.id - bEmoji.id);
      if (handleCurrentReplies && id) {
        handleCurrentReplies(id, newEmojis);
      }
      setShowingEmojis(() => [...newEmojis]);
    };

    const postEmoji = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();
      try {
        const data = {
          emotion: newEmoji,
        };

        const body = token
          ? {
              headers,
            }
          : {};
        const response = await axios.post(`${process.env.END_POINT}api/reactions/studies/${studyId}/comments/${id}`, data, body);
        addEmoji();
        setReactionModalInfo({
          studyId,
          isVisible: false,
        });
      } catch (error: any) {
        if (error.response.status === 401) {
          logout();
          setReactionModalInfo({
            studyId,
            isVisible: true,
          });
          // navigate(`${LOGIN_PATH}`, { state: { previousPathname: location.pathname } });
          return;
        }

        if (error.response.status === 404) {
          navigate(`${ETC_PATH}`);
          return;
        }

        if (error.response.status === 500) {
          navigate(`${SERVER_ERROR_PATH}`);
        }
      }
    };

    postEmoji();
  };
  //      {isDeleted && (
  return (
    <>
      {/* <>
        <S.CommentInfosMenuContainer>
          <CommentInfos isMyComment={isMyComment} avatorSrc={avatorSrc} avatorAlt={avatorAlt} nickname={nickname} time={time} isEdited={isEditied} isStudyOrganizer={isStudyOrganizer} />
          <CommentManageMenu isCommentWriter={isMyComment} handleClickEdit={handleClickEdit} handleClickDelete={handleClickDelete} handleClickEmoji={handleClickEmoji} />
        </S.CommentInfosMenuContainer>
        <S.CommentContainer>
          <CommentContent content="삭제된 댓글입니다." />
        </S.CommentContainer>
      </> */}
      {isDeleted && (
        <S.ReplyContainer>
          <S.CommentInfosMenuContainer>
            <CommentInfos isDeleted isMyComment={isMyComment} avatorSrc={avatorSrc} avatorAlt={avatorAlt} nickname={nickname} time={time} isEdited={isEditied} isStudyOrganizer={isStudyOrganizer} />
          </S.CommentInfosMenuContainer>
          <S.CommentContainer>
            <CommentContent content={content} />
          </S.CommentContainer>
        </S.ReplyContainer>
      )}
      {!isDeleted && (
        <div className={className}>
          {isEditing ? (
            <CommentWrite
              id="editing-comment-reply"
              size="small"
              writerId={writerId}
              currentCommentId={currentCommentId}
              avatorSrc={avatorSrc}
              avatorAlt={avatorAlt}
              typedValue={content}
              isAuthorized={isAuthorized}
              handleClickEdit={handleClickEdit}
              isEditing={isEditing}
              nickname={nickname}
              studyOrganizer={studyOrganizer}
              parentId={parentId}
              studyId={studyId}
              editReply={editReply}
            />
          ) : (
            <S.ReplyContainer>
              <S.CommentInfosMenuContainer>
                <CommentInfos
                  writerId={writerId}
                  isDeleted={false}
                  isMyComment={isMyComment}
                  avatorSrc={avatorSrc}
                  avatorAlt={avatorAlt}
                  nickname={nickname}
                  time={time}
                  isEdited={isEditied}
                  isStudyOrganizer={isStudyOrganizer}
                  doingHoverLoading={doingHoverLoading}
                  doneHoverLoading={doneHoverLoading}
                  isHoverLoading={isHoverLoading}
                />
                {!isDeleted && <CommentManageMenu isCommentWriter={isMyComment} handleClickEdit={handleClickEdit} handleClickDelete={handleClickDelete} handleClickEmoji={handleClickEmoji} />}
              </S.CommentInfosMenuContainer>
              <S.CommentContainer>
                <CommentContent content={content} />
                <S.FlexBox>
                  <S.CustomReactionList emojis={showingEmojis} handleClick={handleToggleEmoji} />
                </S.FlexBox>
              </S.CommentContainer>
            </S.ReplyContainer>
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
      )}
    </>
  );
};

export default CommentReply;
