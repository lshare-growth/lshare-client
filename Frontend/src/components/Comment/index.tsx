/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/require-default-props */
import CommentInfos from '@components/CommentInfos';
import CommentManageMenu from '@components/CommentManageMenu';
import CommentContent from '@components/CommentContent';
import CommentWrite from '@components/CommentWrite';
import emojisType from '@components/types/ReactionList';
// import replys from '@components/Comment/constants';
import TextButton from '@components/common/TextButton';
// import replyType from '@components/types/Comment';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import commentState from '@store/Comment';
import Modal from '@components/Modal';
import Portal from '@components/Modal/Portal';
import DoubleButtonModalArea from '@components/Modal/DoubleButtonModalArea';
import { BUTTON_CONFIRM, BUTTON_CANCEL } from '@components/Modal/constants';
import CommentReply from '@components/CommentReply';
// import replyType from '@components/types/Comment';
import replyState, { replyType } from '@store/Reply';
import { Cookies } from 'react-cookie';
import timeForToday from '@pages/Detail/util';
import userInfosState from '@store/UserInfos';
import { useNavigate, useLocation } from 'react-router-dom';
import useLogOut from '@hooks/useLogout';
import reactionModalInfoState from '@store/ReactionModal';
import items from '@components/CommentManageMenu/constants';
import * as S from './style';
import { ETC_PATH, LANDING_PATH, LOGIN_PATH, SERVER_ERROR_PATH } from '../../constants/route';

type CommentProps = {
  className?: string;
  replySize?: 'medium' | 'small';
  nickname: string;
  time: string;
  isEditied: boolean;
  replyNum: number;
  studyId: number;
  content: string;
  avatorSrc: string;
  avatorAlt: string;
  emojis: emojisType[];
  isAuthorized: boolean;
  // writer: string;
  studyOrganizer: string;
  id?: number;
  writerId: number;
  myMemberId: number;
  // eslint-disable-next-line react/no-unused-prop-types
  isStudyOrganizer: boolean;
  isMyComment: boolean;
  isDeleted?: boolean;
};

const Comment = ({
  className,
  id,
  studyOrganizer,
  replySize = 'small',
  nickname,
  time,
  isEditied,
  replyNum,
  studyId,
  content,
  avatorSrc,
  avatorAlt,
  emojis,
  isAuthorized,
  // writer,
  isStudyOrganizer,
  isMyComment,
  writerId,
  myMemberId,
  isDeleted,
}: CommentProps) => {
  const [isToggled, setIsToggled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isToggledComments, setIsToggledComments] = useState(false);
  // const [replyState, setReplyState] = useState<replyType[]>([]);
  const [comments, setComments] = useRecoilState(commentState);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [replies, setReplies] = useState<replyType[]>([]);
  const [currentReplies, setCurrentReplies] = useState<replyType[]>([]);
  const [previousReplies, setPreviousReplies] = useState<replyType[]>([]);
  const [newReply, setNewReply] = useState<replyType>();
  const [showingReplies, setShowingReplies] = useState<replyType[]>([]);
  type CotnentControlsKeyType = 'sorted' | 'first' | 'last' | 'empty' | 'hasNext';
  type CotnentControlsType = Record<CotnentControlsKeyType, any>;
  // eslint-disable-next-line no-unused-vars
  const [contentControls, setContentControls] = useState<CotnentControlsType>();
  const nextIndex = 0;
  const [contentPageIdx, setContentPageIdx] = useState(nextIndex);
  type usreInfokeyType = 'memberId' | 'nickName' | 'notification' | 'profileImage';

  type userInfoType = Record<usreInfokeyType, any>;
  const [userInfos] = useRecoilState<userInfoType>(userInfosState);
  const [currentUserInfos, setCurrentUserInfos] = useState<userInfoType>(userInfos);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { logout } = useLogOut();
  const cookies = new Cookies();
  const [newAddingReply, setNewAddingReply] = useState<replyType>();
  const [deletedReply, setDeletedReply] = useState<replyType>();
  const [remainReplies, setRemainReplies] = useState<replyType[]>();
  const location = useLocation();
  const [reactionModalInfo, setReactionModalInfo] = useRecoilState(reactionModalInfoState);
  const [editedReplies, setEditiedReplies] = useState<replyType[]>([]);
  const [showingReplyNum, setShowingReplyNum] = useState(0);
  const [isHoverLoading, setIsHoverLoading] = useState(false);

  const doingHoverLoading = () => {
    setIsHoverLoading(true);
  };

  const doneHoverLoading = () => {
    setIsHoverLoading(false);
  };

  const handleCurrentReplies = (replyId: number, newEmojis: emojisType[]) => {
    const targetReply = currentReplies?.find((comment) => comment.id === replyId);
    const remainReplies = currentReplies?.filter((comment) => comment.id !== replyId);

    if (!targetReply) {
      return;
    }

    const newTargetReply = {
      id: targetReply.id,
      nickname: targetReply.nickname,
      parentId: targetReply.parentId,
      writerId: targetReply.writerId,
      time: targetReply.time,
      isEditied: targetReply.isEditied,
      replyNum: targetReply.replyNum,
      commentId: targetReply.commentId,
      content: targetReply.content,
      avatorSrc: targetReply.avatorSrc,
      avatorAlt: targetReply.avatorAlt,
      emojis: newEmojis,
      isAuthorized: targetReply.isAuthorized,
      isStudyOrganizer: targetReply.isStudyOrganizer,
      isMyComment: targetReply.isMyComment,
      isDeleted: targetReply.isDeleted,
    };
    const newReplies = [...remainReplies, newTargetReply];
    newReplies.sort((replyA, replyB) => replyA.id - replyB.id);
    setCurrentReplies([...newReplies]);
  };

  const handleClickToggle = () => {
    setIsToggled(!isToggled);
  };

  const deleteTargetReply = (selectedId: number, currentDeletedReply: replyType) => {
    const currentRemainReplies = currentReplies.filter((comment) => comment.id !== selectedId);
    const targetReply = currentReplies.find((comment) => comment.id === selectedId);
    if (!targetReply) {
      return;
    }
    const newDeletedReply = {
      id: targetReply.id,
      nickname: '(삭제)',
      parentId: targetReply.parentId,
      writerId: targetReply?.writerId,
      time: targetReply.time,
      isEditied: false,
      replyNum: 0,
      commentId: targetReply.commentId,
      content: '삭제된 댓글입니다.',
      avatorSrc: '',
      avatorAlt: '',
      emojis: [],
      isAuthorized: false,
      isStudyOrganizer: false,
      isMyComment: false,
      isDeleted: true,
    };

    if (!currentRemainReplies) {
      return;
    }
    setRemainReplies([...currentRemainReplies]);

    const newReplies = [...currentRemainReplies, targetReply];
    setDeletedReply(newDeletedReply);
    // if (!newReplies) {
    //   return;
    // }
    // newReplies?.sort((replyA, replyB) => replyB.id - replyA.id);
    // setCurrentReplies([...newReplies]);
    setCurrentReplies([]);
  };

  useEffect(() => {
    if (!remainReplies) {
      return;
    }

    if (!deletedReply) {
      return;
    }
    const newReplies = [...remainReplies, deletedReply];
    setShowingReplyNum(showingReplyNum - 1);
    newReplies.sort((replyA, replyB) => replyA.id - replyB.id);
    setCurrentReplies([...newReplies]);
  }, [deletedReply]);

  useEffect(() => {
    setCurrentUserInfos(userInfos);
  }, [userInfos]);

  const handleClickEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleClickDelete = () => {
    setIsModalVisible(true);
  };

  const getReplies = async () => {
    if (replyNum <= 0 || !isToggledComments) {
      return;
    }

    const token = localStorage.getItem('accessToken');
    const refreshToken = cookies.get(`SEC_EKIL15`);
    const headers = {
      Authorization: `Bearer ${token}`,
      RefreshToken: `Bearer ${refreshToken}`,
      'Content-Type': 'app lication/json',
    };

    // const currentPageIdx = isToggledComments ? contentPageIdx : 0;

    const body = token
      ? {
          headers,
        }
      : {};
    const response = await axios.get(`${process.env.END_POINT}api/comments/commentParent/${id}?page=${contentPageIdx}&size=10`, body);
    // setContentPageIdx(contentPageIdx + 1);
    type apiReplyType = typeof response.data.content[0];

    const newReplys: apiReplyType[] = response.data.content.map((reply: any) => {
      const { deleted, createdAt, commentParentId, commentId, writerId, writer, profileImage, content, lastModifiedAt, reCommentCount } = reply;
      // eslint-disable-next-line prefer-destructuring
      // const reactions: reactionType[] = reply.reactions;

      // const targetReactions = newReplys[0]?.reactions[0];

      type reactionType = {
        emotion: string;
        count: number;
        reactionClicked: string;
      };
      // type reactionType = typeof targetReactions;
      const reactions: reactionType[] = reply.reactions;
      // TODO: any 타입 구체화
      // const { reactions } = reply;
      // type reactionType = {
      //   emotion: string;
      //   count: number;
      //   reactionClicked: string;
      // };
      return {
        id: commentId,
        nickname: deleted === 'TRUE' ? '(삭제)' : writer,
        writerId,
        parentId: commentParentId,
        time: timeForToday(createdAt),
        isEditied: deleted === 'TRUE' ? '' : new Date(createdAt).getTime() < new Date(lastModifiedAt).getTime(),
        replyNum: reCommentCount,
        commentId: id,
        content: deleted === 'TRUE' ? '삭제된 댓글입니다.' : content,
        avatorSrc: deleted === 'TRUE' ? '' : profileImage,
        avatorAlt: `${writer}-profile-image`,
        // eslint-disable-next-line no-shadow
        emojis: reactions
          .map(({ emotion, count, reactionClicked }: reactionType, index: number) => ({
            id: items?.find(({ value }) => value === emotion)?.id || index + 1,
            type: emotion,
            value: emotion,
            count,
            isSelected: reactionClicked !== 'FALSE',
          }))
          .sort((aEmoji, bEmoji) => aEmoji.id - bEmoji.id),
        isAuthorized: deleted === 'TRUE' ? false : !!userInfos?.memberId,
        isStudyOrganizer: deleted === 'TRUE' ? false : isStudyOrganizer,
        isMyComment: writer === userInfos?.nickName,
        isDeleted: deleted === 'TRUE',
      };
    });
    // setReplyState(replys);

    const { sorted, first, last, empty, hasNext } = response.data;

    setContentControls({
      sorted,
      first,
      last,
      empty,
      hasNext,
    });

    // setReplies([...replies, ...newReplys]);
    // setReplies([...currentReplies, ...newReplys]);
    // setCurrentReplies([...replies, ...newReplys]);
    const currentNewReplise = [...currentReplies, ...newReplys];
    currentNewReplise.sort((replyA, replyB) => replyA.id - replyB.id);
    // setCurrentReplies([...currentReplies, ...newReplys]);
    setCurrentReplies([...currentNewReplise]);
    setContentPageIdx(contentPageIdx + 1);
    setShowingReplies(newReplys);
    setReplies(newReplys);
    // setReplies([...replies, ...newReplys]);
  };

  // useEffect(() => {
  //   if (currentReplies.length > 0) {
  //     setReplies(currentReplies);
  //   }
  // }, [currentReplies]);

  // useEffect(() => {
  //   setCurrentReplies(replies);
  // }, [replies]);
  // useEffect(() => {
  //   console.log('showingReplies');
  //   console.log(showingReplies);
  //   console.log(replies, currentReplies);
  //   if (replies.length > currentReplies.length) {
  //     setShowingReplies([...replies]);
  //   }
  // }, [replies, currentReplies]);

  useEffect(() => {
    // if (replies.length === 0 && !isToggledComments) {
    //   console.log('<<=====getReplies!!!!!!!=====');
    //   return;
    // }
    if (currentReplies.length > 0) {
      return;
    }

    if (isToggledComments) {
      setIsLoading(true);
      getReplies();
      setIsLoading(false);
    }
  }, [isToggledComments]);

  const handleClickToggleComments = () => {
    setIsToggledComments(!isToggledComments);
    // addReplies();
    // TODO: 서버요청 후 받은 데이터로 replyState갱신

    // const apiReplys = [
    //   {
    //     id: 3,
    //     githubId: 'devjun10',
    //     profileImage: null,
    //     content: 'sdf',
    //     reactions: [
    //       {
    //         memberIds: [2, 3, 100],
    //         commentReactionId: '1',
    //         emotion: '::heart::',
    //         reactionCount: 1,
    //       },
    //     ],
    //     createdAt: '2022-09-08T20:44:45',
    //     lastModifiedAt: '2022-09-08T20:44:46',
    //     reCommentCount: 0,
    //   },
    // ];

    // const apiReplys2 = [
    //   {
    //     id: 3,
    //     githubId: '22devjun10',
    //     profileImage: null,
    //     content: '22sdf',
    //     reactions: [
    //       {
    //         memberIds: [2, 3, 100],
    //         commentReactionId: '1',
    //         emotion: '::heart::',
    //         reactionCount: 1,
    //       },
    //     ],
    //     createdAt: '2022-09-08T20:44:45',
    //     lastModifiedAt: '2022-09-08T20:44:46',
    //     reCommentCount: 0,
    //   },
    // ];

    // const apliReplyList = [apiReplys, apiReplys2];
    // console.log('==============');
    // console.log(replyIndex);
    // console.log(apliReplyList[replyIndex]);
    // type reactionType = typeof apiReplys[0];
    // const newReplys = apliReplyList[replyIndex].map((reply) => {
    //   const { githubId, profileImage, content, lastModifiedAt } = reply;
    //   // eslint-disable-next-line prefer-destructuring
    //   // const reactions: reactionType[] = reply.reactions;
    //   // TODO: any 타입 구체화
    //   const { reactions } = reply;

    //   return {
    //     id: reply.id,
    //     nickname: githubId,
    //     time: '',
    //     isEditied: !!lastModifiedAt,
    //     replyNum: 0,
    //     commentId: id,
    //     content,
    //     avatorSrc: profileImage,
    //     avatorAlt: `${githubId}-profile-image`,
    //     // eslint-disable-next-line no-shadow
    //     emojis: reactions.map(({ commentReactionId, emotion, reactionCount, memberIds }) => ({
    //       id: commentReactionId,
    //       type: emotion,
    //       value: emotion,
    //       count: reactionCount,
    //       isSelected: !!memberIds.find((memberId) => memberId === myId),
    //     })),
    //     isAuthorized: !!githubId,
    //     isWriter: myNickName === studyOrganizer,
    //     isMyComment: myNickName === githubId,
    //   };
    // });
    // // setReplyState(replys);
    // setReplyState([...newReplys]);
  };

  const [showingEmojis, setShowingEmojis] = useState(emojis);

  useEffect(() => {
    setShowingEmojis(emojis);
  }, [emojis]);

  const handleClickEmoji = (newEmoji: string) => {
    // if (!isAuthorized) {
    //   // TODO: 로그인 모달
    //   return;
    // }

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
      setShowingEmojis(() => [...newEmojis]);
    };

    const postEmoji = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = {
        Authorization: `Bearer ${token}`,
        RefreshToken: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      };

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

    // TODO: 이모티콘 추가 API
  };

  const handleToggleEmoji = (selectedContent: string) => {
    // if (!isAuthorized) {
    //   // TODO: 로그인 모달
    //   return;
    // }
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
      const headers = {
        Authorization: `Bearer ${token}`,
        RefreshToken: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      };
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

  const handleClickConfirm = () => {
    const deleteComment = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = {
        Authorization: `Bearer ${token}`,
        RefreshToken: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      };
      try {
        // const response = await axios.delete(`${process.env.END_POINT}api/studies/${studyId}/comments/${id}`, { headers });

        const data = {
          studyId,
        };

        const body = token
          ? {
              headers,
            }
          : {};

        const response = await axios.delete(`${process.env.END_POINT}api/comments/${id}`, body);
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

      const targetComment = comments.find((comment) => comment.id === id);
      if (!targetComment) {
        return;
      }
      const remainComments = comments.filter((comment) => comment.id !== id);
      const newComments = [
        ...remainComments,
        {
          id: targetComment.id,
          nickname: '(삭제)',
          writerId: targetComment.writerId,
          time: targetComment.time,
          isEditied: targetComment.isEditied,
          replyNum: targetComment.replyNum,
          commentId: targetComment.commentId,
          content: '삭제된 댓글입니다.',
          avatorSrc: '',
          avatorAlt: '',
          emojis: [],
          isAuthorized: false,
          isStudyOrganizer: false,
          isMyComment: false,
          isDeleted: true,
        },
      ];
      newComments.sort((commentA, commentB) => commentA.id - commentB.id);
      setComments([...newComments]);
    };

    deleteComment();
  };

  // TODO : custom hook으로 수정하기
  const onIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    if (!target) {
      return;
    }

    if (!contentControls?.hasNext) {
      return;
    }
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.unobserve(target);

        setIsLoading(true);
        getReplies();
        setIsLoading(false);

        setContentPageIdx(contentPageIdx + 1);

        observer.observe(target);
      }
    });
  };

  const observer = new IntersectionObserver(onIntersect, { threshold: 0 });

  // TODO : custom hook으로 수정하기
  // useEffect(() => {
  //   if (!target) {
  //     return;
  //   }

  //   observer.observe(target);

  //   // eslint-disable-next-line consistent-return
  //   return () => observer.unobserve(target);
  // }, [target, onIntersect, observer]);

  const handleClickMoreComment = () => {
    // TODO: 주석풀고 아래 lastPageIdx와 비교 삭제
    if (!contentControls?.hasNext) {
      return;
    }

    setContentPageIdx(contentPageIdx + 1);
    setIsLoading(true);
    getReplies();
    setIsLoading(false);
  };

  const ITEM_NUM = 3;
  const skeletonItems = Array.from({ length: ITEM_NUM }, (_, index) => index + 1);

  // useEffect(() => {
  //   setCurrentReplies([...replies]);
  // }, [replies]);

  const addReply = (newReply: replyType) => {
    // const newReplies = [...currentReplies, newReply];
    const newReplies = [newReply];
    newReplies.sort((replyA, replyB) => replyB.id - replyA.id);
    // setNewReply(newReply);
    // const currentNewReplies = [...currentReplies, ...newReplies];
    // const showingReplies = currentNewReplies.map(({ isDeleted }) => isDeleted);
    // setShowingReplyNum(showingReplies.length);

    setCurrentReplies([...currentReplies, ...newReplies]);
    setShowingReplyNum(showingReplyNum + 1);
    // setNewAddingReply(newReply);
    // setPreviousReplies([...currentReplies]);
    // setCurrentReplies([]);
    handleClickToggle();
  };

  // useEffect(() => {
  //   const showingReplies = currentReplies.filter(({ isDeleted }) => !isDeleted);
  //   setShowingReplyNum(showingReplies.length);
  // }, [deletedReply, newReply]);

  // useEffect(() => {
  //   if (!newAddingReply) {
  //     return;
  //   }
  //   setCurrentReplies([newAddingReply, ...previousReplies]);
  // }, [newAddingReply]);

  const editReply = (value: string, currentCommentId: number | undefined) => {
    // setCurrentReplies([]);

    // const sameParentReplies = currentReplies.filter((comment) => comment.parentId === id);
    // const targetComment = sameParentReplies.find((comment) => comment.id === currentCommentId);
    // const remainComments = sameParentReplies.filter((comment) => comment.id !== currentCommentId);

    // const sameParentReplies = currentReplies.filter((comment) => comment.parentId === id);
    const targetComment = currentReplies.find((comment) => comment.id === currentCommentId);
    const remainComments = currentReplies.filter((comment) => comment.id !== currentCommentId);

    // console.log(sameParentReplies, targetComment, remainComments, currentCommentId);
    if (!targetComment) {
      return;
    }

    const newReply = {
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
    };
    const newReplies = [...remainComments, newReply];

    newReplies.sort((commentA, commentB) => commentB.id - commentA.id);
    setNewReply(newReply);
    // setCurrentReplies([newReply]);
  };

  useEffect(() => {
    if (!newReply) {
      return;
    }
    const remainComments = currentReplies.filter((comment) => comment.id !== newReply?.id);
    const newReplies = [...remainComments, newReply];
    // const newReplies = [newReply, ...remainComments];
    newReplies.sort((commentA, commentB) => commentA.id - commentB.id);
    // newReplies.sort((commentA, commentB) => commentA.id - commentB.id);
    setEditiedReplies([...newReplies]);
    setCurrentReplies([]);
    // setCurrentReplies([...newReplies]);
  }, [newReply]);

  useEffect(() => {
    setCurrentReplies([...editedReplies]);
  }, [editedReplies]);

  const showReplies = () => {
    setIsToggledComments(true);
  };

  useEffect(() => {
    if (userInfos?.memberId) {
      return;
    }
    const currentReplys = currentReplies.map((reply) => {
      // eslint-disable-next-line no-shadow
      // const { writer, writerId, commentId, profileImage, content, lastModifiedAt, reCommentCount, createdAt } = reply;
      const { id, parentId, nickname, writerId, time, isEditied, replyNum, commentId, content, avatorSrc, avatorAlt, isDeleted, emojis } = reply;
      // eslint-disable-next-line prefer-destructuring
      // type reactionType = typeof reply.emojis;
      type reactionKeyType = 'id' | 'type' | 'value' | 'count';
      type reactionType = Record<reactionKeyType, any>;
      const reactions: reactionType[] = emojis;

      return {
        id,
        // nickname: currentStudy.nickName,
        nickname,
        writerId,
        parentId,
        time,
        isEditied,
        replyNum,
        commentId,
        content,
        avatorSrc,
        avatorAlt: `${currentUserInfos.nickName}-profile-image`,
        // eslint-disable-next-line no-shadow
        emojis: reactions.map(({ id, type, value, count }) => ({
          id,
          type,
          value,
          count,
          isSelected: false,
        })),
        // sAuthorized: currentStudy.nickName === writerGithubId,
        isAuthorized: isDeleted ? false : !!userInfos?.memberId,
        isStudyOrganizer: isDeleted ? false : isAuthorized, // study?.nickName === study?.studyOrganizer,
        isMyComment: isDeleted ? false : nickname === userInfos?.nickName, // writerId === study?.memberId, // study?.nickName === writerGithubId, // TODO: study?.nickName이 댓글쪽에서 주는걸로 백엔드에서 변경해주심
        isDeleted,
      };
    });
    setCurrentReplies([...currentReplys]);
  }, [userInfos?.memberId]);

  useEffect(() => {
    setShowingReplyNum(replyNum);
  }, [replyNum]);

  return (
    <>
      {isLoading &&
        skeletonItems.map((skeletonItemIndex) => (
          <li key={`comment-skeleton-${skeletonItemIndex}`}>
            <S.SkeletonPosting>
              <S.CommentInfosMenuContainer>
                <CommentInfos
                  isLoading
                  isDeleted
                  isMyComment={isMyComment}
                  avatorSrc={avatorSrc}
                  avatorAlt={avatorAlt}
                  nickname={nickname}
                  time={time}
                  isEdited={isEditied}
                  isStudyOrganizer={isStudyOrganizer}
                />
                <CommentManageMenu isLoading isCommentWriter={isMyComment} handleClickEdit={handleClickEdit} handleClickDelete={() => {}} handleClickEmoji={() => {}} />
              </S.CommentInfosMenuContainer>
              <S.CommentContainer>
                <CommentContent isLoading content="" />
              </S.CommentContainer>
            </S.SkeletonPosting>
          </li>
        ))}
      {!isLoading && isDeleted && (
        <>
          <S.CommentInfosMenuContainer>
            <CommentInfos
              isDeleted
              isHighlighting={!isDeleted}
              isMyComment={isMyComment}
              avatorSrc={avatorSrc}
              avatorAlt={avatorAlt}
              nickname={nickname}
              time={time}
              isEdited={isEditied}
              isStudyOrganizer={isStudyOrganizer}
            />
          </S.CommentInfosMenuContainer>
          <S.CommentContainer>
            <CommentContent content="삭제된 댓글입니다." />
            {replyNum > 0 && (
              <TextButton handleClick={handleClickToggleComments} mode="accent">
                {`답글 ${replyNum}개`}
              </TextButton>
            )}
            {/* {isToggledComments && replyNum > 0 && studyId && ( */}
            {/* {replyNum > 0 && ( */}
            {isToggledComments && studyId && (
              <S.ReplyContainer>
                {currentReplies.map((reply) => (
                  <S.ReplyItem key={`comment-reply-${id}-${reply.commentId}`}>
                    <CommentReply
                      isDeleted={reply.isDeleted}
                      nickname={reply.nickname}
                      time={reply.time}
                      isEditied={reply.isEditied}
                      // commentId={reply.id}
                      content={reply.content}
                      avatorSrc={reply.avatorSrc}
                      avatorAlt={reply.avatorAlt}
                      emojis={reply.emojis}
                      isAuthorized={reply.isAuthorized}
                      isMyComment={reply.isMyComment}
                      // writer={writer}
                      studyOrganizer={studyOrganizer}
                      id={reply.id}
                      parentId={id}
                      writerId={writerId}
                      isStudyOrganizer={isStudyOrganizer}
                      myMemberId={myMemberId}
                      currentCommentId={reply.id}
                      studyId={studyId}
                      editReply={editReply}
                    />
                  </S.ReplyItem>
                ))}
                {contentControls?.hasNext && <S.CustomTextButton handleClick={handleClickMoreComment}>답글 더보기</S.CustomTextButton>}
                <div ref={(currentTarget) => setTarget(currentTarget)} />
              </S.ReplyContainer>
            )}
          </S.CommentContainer>
        </>
      )}
      {!isLoading && !isDeleted && (
        <div className={className}>
          {isEditing ? (
            <CommentWrite
              id="editing-comment"
              size="small"
              currentCommentId={id}
              avatorSrc={avatorSrc}
              avatorAlt={avatorAlt}
              typedValue={content}
              isAuthorized={isAuthorized}
              handleClickEdit={handleClickEdit}
              studyId={studyId}
              isEditing={isEditing}
              nickname={nickname}
              studyOrganizer={studyOrganizer}
              parentId={id}
              writerId={writerId}
              editReply={editReply}
            />
          ) : (
            <>
              <S.CommentInfosMenuContainer>
                <CommentInfos
                  writerId={writerId}
                  isDeleted={false}
                  isHighlighting={!isDeleted}
                  isMyComment={isMyComment}
                  avatorSrc={avatorSrc}
                  avatorAlt={avatorAlt}
                  nickname={nickname}
                  time={time}
                  isEdited={isEditied}
                  isStudyOrganizer={isStudyOrganizer}
                  isHoverLoading={isHoverLoading}
                  doingHoverLoading={doingHoverLoading}
                  doneHoverLoading={doneHoverLoading}
                />
                <CommentManageMenu isCommentWriter={isMyComment} handleClickEdit={handleClickEdit} handleClickDelete={handleClickDelete} handleClickEmoji={handleClickEmoji} />
              </S.CommentInfosMenuContainer>
              <S.CommentContainer>
                <CommentContent content={content} />
                <S.FlexBox>
                  <TextButton handleClick={handleClickToggle}>답글 적기</TextButton>
                  <S.CustomReactionList className="reaction" emojis={showingEmojis} handleClick={handleToggleEmoji} />
                </S.FlexBox>
                {isToggled && studyId && (
                  <S.CustomCommentWrite
                    id="commentWrite"
                    parentId={id}
                    currentCommentId={id}
                    isAuthorized={isAuthorized}
                    avatorSrc={currentUserInfos?.profileImage}
                    nickname={currentUserInfos?.nickName}
                    avatorAlt={avatorAlt}
                    size={replySize}
                    studyId={studyId}
                    studyOrganizer={studyOrganizer}
                    writerId={writerId}
                    addReply={addReply}
                    editReply={editReply}
                    showReplies={showReplies}
                    handleClickToggle={handleClickToggle}
                    isReply
                  />
                )}
                {/* {replies.map(({ replyNum }) => (
                  <TextButton handleClick={handleClickToggleComments} mode="accent">
                    {`답글 ${replyNum}개`}
                  </TextButton>
                ))} */}
                {(replyNum > 0 || showingReplyNum > 0) && (
                  <TextButton handleClick={handleClickToggleComments} mode="accent">
                    {`답글 ${showingReplyNum}개`}
                  </TextButton>
                )}
                {isToggledComments && studyId && (
                  <S.ReplyContainer>
                    {currentReplies.map((reply) => (
                      <S.ReplyItem key={`comment-reply-${id}-${reply.commentId}`}>
                        <CommentReply
                          isDeleted={reply.isDeleted}
                          deleteTargetReply={deleteTargetReply}
                          nickname={reply.nickname}
                          time={reply.time}
                          isEditied={reply.isEditied}
                          // commentId={reply.id}
                          content={reply.content}
                          avatorSrc={reply.avatorSrc}
                          avatorAlt={reply.avatorAlt}
                          emojis={reply.emojis}
                          isAuthorized={reply.isAuthorized}
                          isMyComment={reply.isMyComment}
                          // writer={writer}
                          studyOrganizer={studyOrganizer}
                          id={reply.id}
                          parentId={id}
                          writerId={reply.writerId}
                          isStudyOrganizer={isStudyOrganizer}
                          myMemberId={myMemberId}
                          currentCommentId={reply.id}
                          studyId={studyId}
                          editReply={editReply}
                          handleCurrentReplies={handleCurrentReplies}
                          doneHoverLoading={doneHoverLoading}
                          doingHoverLoading={doingHoverLoading}
                          isHoverLoading={isHoverLoading}
                        />
                      </S.ReplyItem>
                    ))}
                    {contentControls?.hasNext && <S.CustomTextButton handleClick={handleClickMoreComment}>답글 더보기</S.CustomTextButton>}
                    {/* <div ref={(currentTarget) => setTarget(currentTarget)} /> */}
                  </S.ReplyContainer>
                )}
              </S.CommentContainer>
            </>
          )}
          {/* <S.SkeletonPosting>
            <S.CommentInfosMenuContainer>
              <CommentInfos isLoading isMyComment={isMyComment} avatorSrc={avatorSrc} avatorAlt={avatorAlt} nickname={nickname} time={time} isEdited={isEditied} isStudyOrganizer={isStudyOrganizer} />
              <CommentManageMenu isLoading isCommentWriter={isMyComment} handleClickEdit={handleClickEdit} handleClickDelete={() => {}} handleClickEmoji={() => {}} />
            </S.CommentInfosMenuContainer>
            <S.CommentContainer>
              <CommentContent isLoading content="삭제된 댓글입니다." />
            </S.CommentContainer>
          </S.SkeletonPosting> */}
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

export default Comment;
