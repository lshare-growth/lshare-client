/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import CommentTextArea from '@components/CommentTextArea';
import { useState } from 'react';
import sizeType from '@components/types/CommentWrite';
import { useRecoilState } from 'recoil';
import commentState from '@store/Comment';
import axios from 'axios';
import { getDate, sizes, ERROR_MSG } from './constants';
import * as S from './style';

type CommentWriteProps = {
  className?: string;
  id: string;
  isAuthorized: boolean;
  placeholder?: string;
  size?: sizeType;
  avatorSrc: string;
  avatorAlt: string;
  typedValue?: string;
  handleClickEdit?: () => void;
  commentId?: number;
  isEditing?: boolean;
  nickname?: string;
  currentCommentId?: number;
};

const CommentWrite = ({
  className,
  id,
  isAuthorized,
  placeholder = '댓글을 작성해보세요!',
  size = 'medium',
  avatorSrc,
  avatorAlt,
  typedValue = '',
  handleClickEdit,
  commentId,
  isEditing,
  nickname,
  currentCommentId,
}: CommentWriteProps) => {
  const [comments, setComments] = useRecoilState(commentState);
  const [value, setValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [showingValue, setShowingValue] = useState(typedValue);

  const handleChangeValue = (currentValue: string) => {
    // TODO: commentState를 이용하기
    setValue(currentValue);
  };

  const handleClickCancelComment = () => {
    setValue('');

    if (!handleClickEdit) {
      return;
    }

    handleClickEdit();
  };

  const handleClickRegisterComment = () => {
    // TODO: 서버에 value로 댓글 요청
    const postAddComment = async () => {
      const token = localStorage.getItem('token');
      const data = {
        content: value,
      };
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      try {
        const response = await axios.post(`${process.env.END_POINT}api/studies/${commentId}/comments`, data, {
          headers,
        });
        if (response.status === 404) {
          console.log('404 error');
          return;
        }
        if (response.status === 500) {
          console.log('500 error');
        }

        setComments([
          ...comments,
          {
            id: response.data.id,
            nickname,
            time: '10분',
            isEditied: false,
            replyNum: 0,
            commentId,
            content: value,
            avatorSrc: '',
            avatorAlt: '',
            emojis: [],
            isAuthorized,
          },
        ]);
      } catch (error: any) {
        console.log(error);
      }
    };

    const putEditComment = async () => {
      try {
        const token = localStorage.getItem('token');

        const data = {
          content: value,
        };
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        const response = await axios.put(`${process.env.END_POINT}api/studies/${commentId}/comments/${currentCommentId}`, data, { headers });
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

    // TODO: 서버 성공시 comment store에 저장하는 내용은 추후 서버가 댓글 목록 조회시 주는 데이터를 참고하여 수정, 아래는 임시 key, value
    if (isEditing) {
      putEditComment();
    } else {
      postAddComment();
    }
    if (nickname && !isEditing) {
      // TODO: API요청후에 상태 업데이트
      setComments([
        ...comments,
        {
          id: comments.length,
          nickname,
          time: getDate(),
          isEditied: false,
          replyNum: 0,
          commentId,
          content: value,
          avatorSrc,
          avatorAlt,
          emojis: [],
          isAuthorized: true,
        },
      ]);
      return;
    }

    const targetComment = comments.find((comment) => comment.id === commentId);
    const remainComments = comments.filter((comment) => comment.id !== commentId);

    if (!targetComment) {
      return;
    }

    const newComment = [
      ...remainComments,
      {
        id: commentId,
        nickname: targetComment.nickname,
        time: targetComment.time,
        isEditied: true,
        replyNum: 0,
        commentId: targetComment.commentId,
        content: value,
        avatorSrc: targetComment.avatorSrc,
        avatorAlt: targetComment.avatorSrc,
        emojis: targetComment.emojis,
        isAuthorized: targetComment.isAuthorized,
      },
    ];

    newComment.sort((commentA, commentB) => commentA.id - commentB.id);
    setComments(() => newComment);
    // TODO: 서버 성공시 value ''으로 초기화 후에 리턴
    setShowingValue(value);
    setValue('');

    setIsError(true);

    if (!handleClickEdit) {
      return;
    }

    handleClickEdit();
  };

  return (
    <>
      <S.Container className={className}>
        <S.CustomAvatar src={avatorSrc} alt={avatorAlt} size={sizes[size].avatarSize} />
        <S.ContentContainer>
          <CommentTextArea id={id} isAuthorized={isAuthorized} size={sizes[size].commentSize} placeholder={placeholder} value={value || showingValue} handleChangeValue={handleChangeValue} />
        </S.ContentContainer>
      </S.Container>

      <S.ButtonContainer size={size}>
        <S.ErrorMsg>{isError ? ERROR_MSG : ''}</S.ErrorMsg>
        <div>
          <S.CustomButton size={sizes[size].buttonSize} handleClick={handleClickCancelComment}>
            취소
          </S.CustomButton>
          <S.CustomButton mode="accent" size={sizes[size].buttonSize} handleClick={handleClickRegisterComment} disabled={!value}>
            댓글 등록
          </S.CustomButton>
        </div>
      </S.ButtonContainer>
    </>
  );
};

export default CommentWrite;
