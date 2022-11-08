/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import CommentTextArea from '@components/CommentTextArea';
import { useEffect, useState } from 'react';
import sizeType from '@components/types/CommentWrite';
import { useRecoilState } from 'recoil';
import commentState from '@store/Comment';
import axios from 'axios';
import replyState, { replyType } from '@store/Reply';
import timeForToday from '@pages/Detail/util';
import { useNavigate } from 'react-router-dom';
import userInfosState from '@store/UserInfos';
import useLogOut from '@hooks/useLogout';
import { Cookies } from 'react-cookie';
import { getHeaders } from '@pages/util';
import { getDate, sizes, ERROR_MSG } from './constants';
import * as S from './style';
import { ETC_PATH, LANDING_PATH, SERVER_ERROR_PATH, LOGIN_PATH } from '../../constants/route';

type CommentWriteProps = {
  id: string;
  studyId?: number;
  parentId?: number;
  writerId: number;
  currentCommentId?: number;
  className?: string;
  isAuthorized: boolean;
  placeholder?: string;
  size?: sizeType;
  avatorSrc: string;
  avatorAlt: string;
  typedValue?: string;
  handleClickEdit?: () => void;
  isEditing?: boolean;
  nickname?: string;
  studyOrganizer: string;
  addReply?: (newReply: replyType) => void;
  editReply?: (value: string, currentCommentId: number | undefined) => void;
  showReplies?: () => void;
  handleClickToggle?: () => void;
  isReply?: boolean;
};

const maxCommentLength = 500;

const CommentWrite = ({
  className,
  id,
  studyId,
  currentCommentId,
  parentId,
  writerId,
  isAuthorized,
  placeholder = '댓글을 작성해보세요!',
  size = 'medium',
  avatorSrc,
  avatorAlt,
  typedValue = '',
  handleClickEdit,
  isEditing,
  nickname,
  studyOrganizer,
  addReply,
  editReply,
  showReplies,
  isReply,
  handleClickToggle,
}: CommentWriteProps) => {
  const navigate = useNavigate();

  const [comments, setComments] = useRecoilState(commentState);
  const [value, setValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [showingValue, setShowingValue] = useState(isEditing ? typedValue : '');
  const [replies, setReplies] = useRecoilState(replyState);
  const [userInfos] = useRecoilState(userInfosState);
  const [errorMsg, setErrorMsg] = useState('');
  const { logout } = useLogOut();
  const cookies = new Cookies();

  const handleChangeValue = (currentValue: string) => {
    // TODO: commentState를 이용하기
    setValue(currentValue);
  };

  const handleClickCancelComment = () => {
    setValue('');

    if (handleClickToggle) {
      handleClickToggle();
    }

    if (handleClickEdit) {
      handleClickEdit();
    }
  };

  const handleClickRegisterComment = () => {
    // TODO: 서버에 value로 댓글 요청
    const postAddComment = async () => {
      if (value.length > maxCommentLength) {
        setErrorMsg('최대 500자까지 입력가능합니다.');
        return;
      }
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);

      // const data = {
      //   content: value,
      // };
      const headers = getHeaders();

      // const newReplies = [
      //   {
      //     id: replies.length, // replies[0].id + 1,
      //     commentId: replies.length, // replies[0].id + 1, // sameParentReplies.length,
      //     writerId: userInfos.memberId,
      //     parentId,
      //     nickname,
      //     time: '1초전',
      //     isEditied: false,
      //     replyNum: 0,
      //     // commentId,
      //     content: value,
      //     avatorSrc,
      //     avatorAlt,
      //     emojis: [],
      //     isAuthorized,
      //     isStudyOrganizer: userInfos.nickName === studyOrganizer,
      //     isMyComment: true,
      //   },
      //   ...replies,
      // ];
      // console.log('===newReplies===');
      // console.log(newReplies);
      // setReplies([...newReplies]);
      // setShowingValue('');
      // setValue('');

      try {
        // const response = await axios.post(`${process.env.END_POINT}api/comments`, {
        //   content: value,
        // }, {
        //   headers,
        // });
        // const response = await axios.post(
        //   `${process.env.END_POINT}api/comments/${parentId}/recomments`,
        //   {
        //     content: value,
        //   },
        //   {
        //     headers,
        //   }
        // );
        const isRecomment = !!parentId;
        // const isRecomment = true;
        const currentParentId = parentId || studyId;
        const data =
          // currentParentId && currentCommentId && currentParentId !== currentCommentId
          isRecomment
            ? {
                content: value,
              }
            : {
                studyId,
                content: value,
              };
        const URL = isRecomment ? `${process.env.END_POINT}api/comments/${parentId}/recomments` : `${process.env.END_POINT}api/comments`;

        // const response = {
        //   data: {
        //     reCommentId: 200,
        //     commentId: 16,
        //   },
        // };
        const body = token
          ? {
              headers,
            }
          : {};
        const response = await axios.post(URL, data, body);

        // const targetComments = parentId && parentId !== currentCommentId ? replies : comments;
        // const setTargetComments = parentId && parentId !== currentCommentId ? setReplies : setComments;

        // setTargetComments([...targetComments, newComment]);

        if (isRecomment) {
          const sameParentReplies = replies.filter((comment) => comment.parentId === parentId);

          // TODO 배포 순서상관없는지.
          const newReplies = [
            {
              id: response.data.commentId, // replies[0].id + 1,
              commentId: response.data.commentId, // replies[0].id + 1, // sameParentReplies.length,
              writerId: userInfos.memberId,
              parentId,
              nickname,
              time: timeForToday(new Date().toUTCString()),
              isEditied: false,
              replyNum: 0,
              // commentId,
              content: value,
              avatorSrc,
              avatorAlt,
              emojis: [],
              isAuthorized,
              isStudyOrganizer: userInfos.nickName === studyOrganizer,
              isMyComment: true,
              isDeleted: false,
            },
            ...replies,
          ];
          // TODO 배포 필요없는지 api확인시
          newReplies.sort((commentA, commentB) => commentB.id - commentA.id);

          setReplies([...newReplies]);
          setShowingValue('');
          setValue('');
          if (!addReply) {
            return;
          }
          addReply({
            id: response.data.commentId, // replies[0].id + 1,
            commentId: response.data.commentId, // replies[0].id + 1, // sameParentReplies.length,
            writerId: userInfos.memberId,
            parentId,
            nickname,
            time: timeForToday(new Date().toUTCString()),
            isEditied: false,
            replyNum: 0,
            // commentId,
            content: value,
            avatorSrc,
            avatorAlt,
            emojis: [],
            isAuthorized,
            isStudyOrganizer: userInfos.nickName === studyOrganizer,
            isMyComment: true,
            isDeleted: false,
          });
        } else {
          // TODO 배포 순서상관없는지. 밑에 코드가 원래 프론트쪽 순서
          const newComments = [
            {
              id: response.data.commentId, // comments[0].id - 1, // response.data.commentId,
              commentId: response.data.commentId, // comments[0].id - 1, // comments.length,
              writerId,
              nickname,
              time: timeForToday(new Date().toUTCString()),
              isEditied: false,
              replyNum: 0,
              content: value,
              avatorSrc,
              avatorAlt,
              emojis: [],
              isAuthorized,
              isStudyOrganizer: true,
              isMyComment: true,
              isDeleted: false,
            },
            ...comments,
          ];

          // const newComments = [
          //   ...comments,
          //   {
          //     id: response.data.commentId, // comments[0].id - 1, // response.data.commentId,
          //     commentId: response.data.commentId, // comments[0].id - 1, // comments.length,
          //     writerId,
          //     nickname,
          //     time: '1초전',
          //     isEditied: false,
          //     replyNum: 0,
          //     content: value,
          //     avatorSrc: '',
          //     avatorAlt: '',
          //     emojis: [],
          //     isAuthorized,
          //     isStudyOrganizer: true,
          //     isMyComment: true,
          //   },
          // ];
          // TODO 배포 필요없는지 api확인시
          newComments.sort((commentA, commentB) => commentA.id - commentB.id);
          setComments([...newComments]);
          // setShowingValue(value);
          setValue('');
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          logout();
          navigate(`${LOGIN_PATH}`, { state: { previousPathname: location.pathname } });
          // TODO: 분리
          setErrorMsg('내용을 게시하지 못했습니다.');
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

    const putEditComment = async () => {
      if (value.length > maxCommentLength) {
        setErrorMsg('최대 500자까지 입력가능합니다.');
        return;
      }
      // parentId && currentCommentId && parentId !== currentCommentId
      // 대댓글

      // const isRecomment = parentId !== currentCommentId;
      const isRecomment = parentId !== currentCommentId;

      if (isRecomment) {
        try {
          const data = {
            studyId,
            content: value,
          };
          const token = localStorage.getItem('accessToken');
          const refreshToken = cookies.get(`SEC_EKIL15`);
          const headers = getHeaders();

          // const URL = parentId ?  : `${process.env.END_POINT}api/comments/${currentCommentId}`;
          const body = token
            ? {
                headers,
              }
            : {};
          const response = await axios.put(`${process.env.END_POINT}api/comments/${parentId}/recomments/${currentCommentId}`, data, body);
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

        if (editReply) {
          editReply(value, currentCommentId);
        }

        const sameParentReplies = replies.filter((comment) => comment.parentId === parentId);
        const targetComment = sameParentReplies.find((comment) => comment.id === currentCommentId);
        const remainComments = sameParentReplies.filter((comment) => comment.id !== currentCommentId);
        if (!targetComment) {
          return;
        }

        const newComment = [
          ...remainComments,
          {
            id: currentCommentId, // commentId,
            nickname: targetComment.nickname,
            parentId: targetComment.parentId,
            writerId: targetComment.writerId,
            time: timeForToday(new Date().toUTCString()),
            isEditied: true,
            replyNum: 0,
            commentId: currentCommentId, // targetComment.commentId,
            content: value,
            avatorSrc: targetComment.avatorSrc,
            avatorAlt: targetComment.avatorAlt,
            emojis: targetComment.emojis,
            isAuthorized: targetComment.isAuthorized,
            isStudyOrganizer: nickname === studyOrganizer,
            isMyComment: true,
            isDeleted: false,
          },
        ];

        newComment.sort((commentA, commentB) => commentB.id - commentA.id);

        setReplies([...newComment]);
        setShowingValue('');
        setValue('');
        return;
      }

      try {
        const data = {
          content: value,
        };
        const token = localStorage.getItem('accessToken');
        const refreshToken = cookies.get(`SEC_EKIL15`);
        const headers = getHeaders();

        const body = token
          ? {
              headers,
            }
          : {};
        // const URL = parentId ?  : `${process.env.END_POINT}api/comments/${currentCommentId}`;
        const response = await axios.put(`${process.env.END_POINT}api/comments/${currentCommentId}`, data, body);
      } catch (error: any) {
        if (error.response.status === 401) {
          logout();
          navigate(`${LOGIN_PATH}`, { state: { previousPathname: location.pathname } });
          // TODO : 분리
          setErrorMsg('내용을 게시하지 못했습니다.');
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

      const targetComment = comments.find((comment) => comment.id === currentCommentId);
      const remainComments = comments.filter((comment) => comment.id !== currentCommentId);

      if (!targetComment) {
        return;
      }

      const newComment = [
        ...remainComments,
        {
          id: currentCommentId, // commentId,
          nickname: targetComment.nickname,
          writerId,
          time: targetComment.time,
          isEditied: true,
          replyNum: targetComment.replyNum,
          commentId: currentCommentId, // targetComment.commentId,
          content: value,
          avatorSrc: targetComment.avatorSrc,
          avatorAlt: targetComment.avatorSrc,
          emojis: targetComment.emojis,
          isAuthorized: targetComment.isAuthorized,
          isStudyOrganizer: nickname === studyOrganizer,
          isMyComment: true,
          isDeleted: false,
        },
      ];
      newComment.sort((commentA, commentB) => commentA.id - commentB.id);
      // setComments(() => newComment);
      setComments([...newComment]);
      setShowingValue(value);
      setValue('');
    };

    const targetComments = parentId && parentId !== currentCommentId ? replies : comments;
    // const setTargetComments = parentId && parentId !== currentCommentId ? setReplies : setComments;
    // TODO: 서버 성공시 comment store에 저장하는 내용은 추후 서버가 댓글 목록 조회시 주는 데이터를 참고하여 수정, 아래는 임시 key, value

    if (isEditing) {
      putEditComment();
    } else {
      postAddComment();

      if (!showReplies) {
        return;
      }
      showReplies();
    }

    setShowingValue('');
    setValue('');
    // if (!handleClickEdit) {
    //   return;
    // }

    // handleClickEdit();
    if (nickname && !isEditing) {
      // TODO: API요청후에 상태 업데이트
      // if (parentId && parentId !== currentCommentId) {
      // }
      // setTargetComments([
      //   ...targetComments,
      //   {
      //     id: targetComments.length,
      //     nickname,
      //     writerId,
      //     time: getDate(),
      //     isEditied: false,edit
      //     replyNum: 0,
      //     commentId,
      //     content: value,
      //     avatorSrc,
      //     avatorAlt,
      //     emojis: [],
      //     isAuthorized: true,
      //     isStudyOrganizer: nickname === studyOrganizer,
      //     isMyComment: true,
      //   },
      // ]);
      // return;
    }

    // const targetComment = targetComments.find((comment) => comment.id === currentCommentId);
    // const remainComments = targetComments.filter((comment) => comment.id !== currentCommentId);

    // if (!targetComment) {
    //   return;
    // }
    // console.log('value');
    // console.log(value);
    // const newComment = [
    //   ...remainComments,
    //   {
    //     id: currentCommentId, // commentId,
    //     nickname: targetComment.nickname,
    //     writerId,
    //     time: targetComment.time,
    //     isEditied: true,
    //     replyNum: 0,
    //     commentId, // targetComment.commentId,
    //     content: value,
    //     avatorSrc: targetComment.avatorSrc,
    //     avatorAlt: targetComment.avatorSrc,
    //     emojis: targetComment.emojis,
    //     isAuthorized: targetComment.isAuthorized,
    //     isStudyOrganizer: nickname === studyOrganizer,
    //     isMyComment: true,
    //   },
    // ];

    // newComment.sort((commentA, commentB) => commentA.id - commentB.id);
    // setTargetComments(() => newComment);
    // TODO: 서버 성공시 value ''으로 초기화 후에 리턴

    // setIsError(true);

    if (!handleClickEdit) {
      return;
    }

    handleClickEdit();
  };

  return (
    <>
      <S.Container className={className}>
        {avatorSrc ? (
          <S.CustomAvatar src={avatorSrc} alt={avatorAlt} size={sizes[size].avatarSize} />
        ) : (
          <S.AvatarContainer>
            <S.IconAvatar mode="avatar" />
          </S.AvatarContainer>
        )}
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
