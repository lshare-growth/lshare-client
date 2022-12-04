/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import Layout from '@components/Layout';
import Comment from '@components/Comment';
import useMouse from '@hooks/useMouse';
import Title from '@components/common/Title';
import Icon from '@components/common/Icon';
import Button from '@components/common/Button';
// eslint-disable-next-line camelcase
import { useParams, useNavigate, UNSAFE_NavigationContext, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useEffect, useState, useRef, useContext } from 'react';
import replyType from '@components/types/Comment';
import commentState from '@store/Comment';
import studyType from '@components/types/Studies';
import LoadingSpinner from '@components/common/LoadingSpinner';
import axios from 'axios';
import Modal from '@components/Modal';
import Portal from '@components/Modal/Portal';
import DoubleButtonModalArea from '@components/Modal/DoubleButtonModalArea';
import { BUTTON_CONFIRM, BUTTON_CANCEL } from '@components/Modal/constants';
import userInfosState from '@store/UserInfos';
import useLogOut from '@hooks/useLogout';
import reactionsState, { reactionsType } from '@store/Reactions';
import { CommentContainer, SkeletonPosting, CommentInfosMenuContainer } from '@components/Comment/style';
import CommentInfos from '@components/CommentInfos';
import CommentManageMenu from '@components/CommentManageMenu';
import CommentWrite from '@components/CommentWrite';
import { SkeletonAvator } from '@components/CommentInfos/style';
import { SkeletonLabel } from '@components/Posting/style';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserHistory, createBrowserHistory } from 'history';
import CommentContent from '@components/CommentContent';
import studiesState from '@store/Studies';
import keywordsState from '@store/Keyword';
import { Cookies } from 'react-cookie';
import AlertModalArea from '@components/Modal/AlertModalArea';
import timeForToday from '@pages/Detail/util';
import reactionModalInfoState from '@store/ReactionModal';
import items from '@components/CommentManageMenu/constants';
import loginInfoState from '@store/LoginInfo';
import studyState, { initialStudy } from '@store/Study';
import Avatar from '@common/Avatar';
import isAlertModalVisibleState from '@store/AlertModal';
import { getHeaders } from '@pages/util';
import { getComments } from '@api/comments';
import { getLikes, getTags } from '@api/studies';
import { hashTagInfo, studyDetail, studyHashTag } from '@customTypes/studies';
import * as S from './style';
import { ETC_PATH, MAIN_PATH, UPDATE_PATH, LANDING_PATH, SERVER_ERROR_PATH, LOGIN_PATH } from '../../constants/route';

type koreanDistrictsKeyType = 'SEOUL' | 'BUSAN' | 'DAEGU' | 'INCHEON' | 'DAEJEON' | 'ULSAN';
type koreanDistrictsType = Record<koreanDistrictsKeyType, string>;
const koreanDistricts: koreanDistrictsType = {
  SEOUL: '서울',
  BUSAN: '부산',
  DAEGU: '대구',
  INCHEON: '인천',
  DAEJEON: '대전',
  ULSAN: '울산',
};
const participants = 3;
const maxPeople = 5;
const peoples = `${participants}/${maxPeople}`;
const DEFAUL_PAGE_NUM = 10;
type infoKeyType = 'id' | 'type' | 'content';
type infoType = Record<infoKeyType, any>;

const Detail = () => {
  const navigate = useNavigate();
  const navigation = useContext(UNSAFE_NavigationContext).navigator as BrowserHistory;
  const [datesInfos, setDatesInfos] = useState<infoType[]>([]);
  const [otherInfos, setOtherInfos] = useState<infoType[]>([]);
  const { isMouseOvered, handleMouseOver, handleMouseOut } = useMouse(false);
  const { id } = useParams<{ id: string }>();
  const currentId = Number(id);
  type CotnentControlsKeyType = 'sorted' | 'first' | 'last' | 'empty' | 'hasNext';
  type CotnentControlsType = Record<CotnentControlsKeyType, any>;
  const [contentControls, setContentControls] = useState<CotnentControlsType>();
  type usreInfokeyType = 'memberId' | 'nickName' | 'notification' | 'profileImage';

  type userInfoType = Record<usreInfokeyType, any>;
  const [userInfos] = useRecoilState<userInfoType>(userInfosState);
  const [currentUserInfos, setCurrentUserInfos] = useState<userInfoType>(userInfos);
  const [reactions, setReactions] = useRecoilState(reactionsState);
  const [currentReactions, setCurrentReactions] = useState<reactionsType[]>([]);
  const [currentReplyNum, setCurrentReplyNum] = useState(0);
  type tagKeyType = 'hashTagId' | 'tagName';
  type tagType = Record<tagKeyType, any>;
  type currentTagKeyType = 'id' | 'content';
  type currentTagType = Record<currentTagKeyType, any>;
  const [studies, setStudies] = useRecoilState(studiesState);
  const [editedStudy, setEditiedStudy] = useRecoilState(studyState);
  const [tags, setTags] = useState<currentTagType[]>();
  const [currentTags, setCurrentTags] = useState<currentTagType[]>();
  // eslint-disable-next-line no-unused-vars
  const { logout } = useLogOut();
  const [keywords, setKeywords] = useRecoilState(keywordsState);
  type keyType =
    | 'id'
    | 'nickName'
    | 'memberId'
    | 'studyOrganizer'
    | 'time'
    | 'title'
    | 'infos'
    | 'viewCount'
    | 'likeCount'
    | 'commentCount'
    | 'isRecruiting'
    | 'content'
    | 'tags'
    | 'createdDate'
    | 'maxStudyMemberCount'
    | 'currentStudyMemberCount'
    | 'isAuthorized'
    | 'studyOrganizerProfile'
    | 'studyOrganizerId';

  type currentStudyType = Record<keyType, any>;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [study, setStudy] = useState<currentStudyType>();
  const [isShowingLiked, setIsShowingLiked] = useState(false);
  const [showingLikeCount, setShowingLikeCount] = useState(0);
  const [isStudyRecruiting, setIsStudyRecruiting] = useState(false);
  // TODO: any 타입 구체화
  const [comments, setComments] = useRecoilState(commentState);
  const [currentComments, setCurrentComments] = useState<replyType[]>([]);
  const [apiComments, setApiComments] = useState<replyType[]>([]);
  type memberKeyType = 'id' | 'content' | 'nickName';
  type memberType = Record<memberKeyType, any>;
  const [studyMembers, setStudyMembers] = useState<memberType[]>([]);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const nextIndex = 1;
  const [contentPageIdx, setContentPageIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isStudyLoading, setIsStudyLoading] = useState(true);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const cookies = new Cookies();
  const location = useLocation();
  const lastPageIdx = 5;
  type stateKeyType = 'isLogouted' | 'from' | 'page';
  type stateType = Record<stateKeyType, any>;
  const state = location.state as stateType;
  const [isLogoutAlertVisible, setIsLogoutAlertVisible] = useState(false);
  const logoutModalRef = useRef<HTMLDivElement>(null);
  const history = createBrowserHistory();
  const [reactionModalInfo, setReactionModalInfo] = useRecoilState(reactionModalInfoState);
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);
  const [showingCommentNum, setShowingCommentNum] = useState(0);
  const [isHoverLoading, setIsHoverLoading] = useState(false);
  const [isAlertModalVisible, setIsAlertModalVisible] = useRecoilState(isAlertModalVisibleState);

  useEffect(() => {
    const targetPage = state?.page;
    if (targetPage) {
      sessionStorage.setItem('page', `${targetPage}`);
    }
  }, []);

  useEffect(() => {
    const isLogined = cookies.get('logined');
    if (!isLogined || isLogined === 'false') {
      logout();
    }
  }, [loginInfo]);

  const handleEvent = () => {
    navigate(`${MAIN_PATH}`, { state: { hasPage: true } });
  };

  useEffect(() => {
    window.addEventListener('popstate', handleEvent);

    return () => {
      window.removeEventListener('popstate', handleEvent);
    };
  }, []);

  const [locationKeys, setLocationKeys] = useState([]);

  useEffect(() => {
    setCurrentUserInfos(userInfos);
  }, [userInfos.nickName]);

  useEffect(() => {
    const getStudy = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const refreshToken = cookies.get(`SEC_EKIL15`);
        const headers = getHeaders();

        const body = token ? { headers } : {};

        const response = await axios.get(`${process.env.END_POINT}api/studies/${currentId}`, body);

        type dataKeyType =
          | 'studyId'
          | 'memberId'
          | 'title'
          | 'content'
          | 'studyOrganizer'
          | 'studyStatus'
          | 'currentStudyMemberCount'
          | 'district'
          | 'commentCount'
          | 'viewCount'
          | 'likeCount'
          | 'createdAt'
          | 'maxStudyMemberCount'
          | 'startDate'
          | 'endDate'
          | 'progressOfStudy'
          | 'likeClicked'
          | 'memberProfileImageUrl'
          | 'studyOrganizerId';
        // | 'hashTags';

        type dataType = Record<dataKeyType, any>;

        const targetData: dataType = response.data; // response.data.contents.page[0];

        type tagKeyType = 'studyId' | 'tagName';
        type tagType = Record<tagKeyType, any>;

        const {
          studyId,
          title,
          memberId,
          content,
          studyOrganizer,
          studyStatus,
          progressOfStudy,
          commentCount,
          viewCount,
          likeCount,
          createdAt,
          maxStudyMemberCount,
          currentStudyMemberCount,
          startDate,
          endDate,
          memberProfileImageUrl,
          studyOrganizerId,
        } = targetData;
        const district: koreanDistrictsKeyType = targetData.district;

        type tagDataKeyType = 'hashTagResponses';
        type tagDataType = Record<tagDataKeyType, any>;

        const tagResponse = {
          hashTagResponses: [],
        };

        const hashTags: tagType[] = tagResponse.hashTagResponses;
        const tags = hashTags?.map(({ studyId, tagName }) => ({
          id: studyId,
          content: `#${tagName}`,
        }));

        const currentStudy = {
          id: studyId,
          studyOrganizerId,
          nickName: studyOrganizer, // TODO 배포 nickName은 추후 헤더에서 얻어오기
          memberId,
          studyOrganizer,
          studyOrganizerProfile: memberProfileImageUrl,
          title,
          time: timeForToday(createdAt),
          content,
          tags,
          infos: [
            {
              id: 1,
              type: 'start',
              content: `${startDate}`,
            },
            {
              id: 2,
              type: 'end',
              content: `${endDate}`,
            },
            {
              id: 3,
              type: 'studyWay',
              content: progressOfStudy,
            },
            {
              id: 4,
              type: 'limit',
              content: `${maxStudyMemberCount}`,
            },
            { id: 5, type: 'district', content: `${(district && koreanDistricts[district]) || ''}` },
          ],
          commentCount,
          viewCount,
          likeCount,
          isRecruiting: studyStatus === 'RECRUITING',
          createdDate: timeForToday(createdAt),
          currentStudyMemberCount,
          maxStudyMemberCount,
          isAuthorized: studyOrganizer === userInfos.nickName, // studyOrganizer === 'devjun10', // nickName은 추후 헤더에서 얻어오기
        };

        setShowingLikeCount(currentStudy.likeCount);
        setIsStudyRecruiting(currentStudy.isRecruiting);

        setStudy(currentStudy);

        const isLiked = targetData.likeClicked !== 'FALSE';
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
    };
    getStudy();

    setIsStudyLoading(false);
  }, []);

  useEffect(() => {
    const setLikesInfos = async () => {
      const data = await getLikes(currentId);
      setIsShowingLiked(data?.clicked === 'TRUE');
    };

    setLikesInfos();
  }, []);

  const setTagsInfos = async () => {
    const data = await getTags(currentId);
    const hashTags: tagType[] = data.hashTagResponses;
    const tags = hashTags?.map(({ hashTagId, tagName }) => ({
      id: hashTagId,
      content: `#${tagName}`,
    }));
    if (tags) {
      setTags(tags);
    }
  };

  useEffect(() => {
    setTagsInfos();
  }, []);

  const setCommentInfos = async () => {
    const data = await getComments(currentId, contentPageIdx);

    type apiCommentType = typeof data.content[0];

    const apiComments: apiCommentType[] = data.content;

    const targetReactions = apiComments[0]?.reactions[0];
    type reactionType = typeof targetReactions;

    if (!apiComments) {
      return;
    }

    const { sorted, first, last, empty, hasNext } = data;

    setContentControls(() => ({
      sorted,
      first,
      last,
      empty,
      hasNext,
    }));
    setContentPageIdx(contentPageIdx + 1);
    // eslint-disable-next-line no-shadow
    const currentReplys = apiComments.map((reply) => {
      // eslint-disable-next-line no-shadow
      const { deleted, writer, writerId, commentId, profileImage, content, lastModifiedAt, reCommentCount, createdAt } = reply;
      // eslint-disable-next-line prefer-destructuring
      const reactions: reactionType[] = reply.reactions;

      return {
        id: commentId,
        nickname: deleted === 'TRUE' ? '(삭제)' : writer,
        writerId,
        time: timeForToday(createdAt),
        isEditied: deleted === 'TRUE' ? '' : new Date(createdAt).getTime() < new Date(lastModifiedAt).getTime(),
        replyNum: reCommentCount,
        commentId,
        content,
        avatorSrc: deleted === 'TRUE' ? '' : profileImage,
        avatorAlt: `${currentUserInfos.nickName}-profile-image`,
        // eslint-disable-next-line no-shadow
        emojis: reactions
          .map(({ emotion, count, reactionClicked }, index) => ({
            id: items?.find(({ value }) => value === emotion)?.id || index + 1,
            type: emotion,
            value: emotion,
            count,
            isSelected: reactionClicked !== 'FALSE',
          }))
          .sort((aEmoji, bEmoji) => aEmoji.id - bEmoji.id),
        isAuthorized: deleted === 'TRUE' ? false : !!userInfos?.memberId,
        isStudyOrganizer: false,
        isMyComment: deleted === 'TRUE' ? false : writer === userInfos?.nickName,
        isDeleted: deleted === 'TRUE',
      };
    });

    setComments([...currentReplys]);
    setApiComments([...currentReplys]);
    setCurrentComments([...currentReplys]);
  };

  useEffect(() => {
    if (study?.commentCount === 0) {
      return;
    }

    if (!study) {
      return;
    }

    if (!study?.id) {
      return;
    }

    setIsCommentLoading(true);
    setCommentInfos();
    setIsCommentLoading(false);
  }, [study?.id]);

  useEffect(() => {
    const currentStudy = {
      id: study?.id,
      nickName: study?.nickName,
      memberId: study?.memberId,
      studyOrganizer: study?.studyOrganizer,
      studyOrganizerProfile: study?.studyOrganizerProfile,
      title: study?.title,
      time: study?.time,
      content: study?.content,
      tags: study?.tags,
      infos: study?.infos,
      commentCount: study?.commentCount,
      viewCount: study?.viewCount,
      likeCount: study?.likeCount,
      isRecruiting: study?.isRecruiting,
      createdDate: study?.createdDate,
      currentStudyMemberCount: study?.currentStudyMemberCount,
      maxStudyMemberCount: study?.maxStudyMemberCount,
      isAuthorized: study?.studyOrganizer === userInfos.nickName, // studyOrganizer === 'devjun10', // nickName은 추후 헤더에서 얻어오기
      studyOrganizerId: study?.studyOrganizerId,
    };
    setStudy(() => currentStudy);
  }, [userInfos.memberId]);

  useEffect(() => {
    if (!study) {
      return;
    }

    if (!editedStudy) {
      return;
    }

    if (!editedStudy?.id) {
      return;
    }

    if (editedStudy?.id !== currentId) {
      return;
    }

    const currentStudy = {
      id: study?.id,
      nickName: study?.nickName,
      memberId: study?.memberId,
      studyOrganizer: study?.studyOrganizer,
      studyOrganizerProfile: study?.studyOrganizerProfile,
      title: editedStudy?.title,
      time: study?.time,
      content: editedStudy?.content,
      tags: editedStudy?.tags,
      infos: editedStudy?.infos,
      commentCount: study?.commentCount,
      viewCount: study?.viewCount,
      likeCount: study?.likeCount,
      isRecruiting: study?.isRecruiting,
      createdDate: study?.createdDate,
      currentStudyMemberCount: study?.currentStudyMemberCount,
      maxStudyMemberCount: editedStudy?.maxStudyMemberCount,
      isAuthorized: study?.isAuthorized,
      studyOrganizerId: study?.studyOrganizerId,
    };

    setStudy(currentStudy);
    const newTags = editedStudy?.tags?.map((content, index) => ({
      id: index,
      content: `#${content}`,
    }));
    setTags(newTags);
    setEditiedStudy(initialStudy);
  }, [study, editedStudy, editedStudy?.tags]);

  useEffect(() => {
    if (!tags) {
      return;
    }
    if (tags.length === 0) {
      return;
    }
    setCurrentTags(tags);
  }, [tags]);

  useEffect(() => {
    if (!study) {
      return;
    }

    const newInfos = study?.infos?.map((info: any) => {
      if (info.type === 'start') {
        return {
          id: 1,
          type: 'start',
          content: `시작일 : ${info.content}`,
        };
      }

      if (info.type === 'end') {
        return {
          id: 2,
          type: 'end',
          content: `종료일 : ${info.content}`,
        };
      }

      if (info.type === 'limit') {
        return {
          id: 3,
          type: 'limit',
          content: `최대${info.content}명`,
        };
      }

      if (info.type === 'district') {
        return {
          id: 5,
          type: 'district',
          content: info.content,
        };
      }

      if (info.type === 'studyWay' && info.content === 'BOTH') {
        return {
          id: 4,
          type: 'studyWay',
          content: `ON/OFFLINE`,
        };
      }

      return {
        id: 4,
        type: 'studyWay',
        content: info.content,
      };
    });

    const currentDatesInfos: infoType[] = newInfos?.filter((info: any) => info.type === 'start' || info.type === 'end');
    const currentOtherInfos: infoType[] = newInfos?.filter((info: any) => info.type === 'limit' || info.type === 'studyWay' || info.type === 'district');
    setDatesInfos(currentDatesInfos);
    setOtherInfos(currentOtherInfos);
  }, [study, study?.infos]);

  useEffect(() => {
    if (userInfos?.memberId) {
      return;
    }
    const currentReplys = currentComments.map((reply) => {
      // eslint-disable-next-line no-shadow
      const { id, nickname, writerId, time, isEditied, replyNum, commentId, content, avatorSrc, avatorAlt, isDeleted, emojis } = reply;
      // eslint-disable-next-line prefer-destructuring
      type reactionKeyType = 'id' | 'type' | 'value' | 'count';
      type reactionType = Record<reactionKeyType, any>;
      const reactions: reactionType[] = emojis;

      return {
        id,
        nickname,
        writerId,
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
        isAuthorized: isDeleted ? false : !!userInfos?.memberId,
        isStudyOrganizer: isDeleted ? false : study?.isAuthorized,
        isMyComment: isDeleted ? false : nickname === userInfos?.nickName,
        isDeleted,
      };
    });

    setComments([...currentReplys]);
    setCurrentComments([...currentReplys]);
  }, [userInfos?.memberId]);

  useEffect(
    () => () => {
      setComments([]);
    },
    []
  );

  useEffect(() => {
    // TODO: studyMembers 추후 추가
    const getStudyMembers = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();

      const body = token
        ? {
            headers,
          }
        : {};

      const res = await axios.get(`${process.env.END_POINT}api/members/study/${currentId}`, body);
      type apiMemberType = typeof res.data.studyMembers[0];
      const apiMembers: apiMemberType[] = res.data.studyMembers;
      const members = apiMembers.map(({ memberId, nickName, profileImageUrl }) => ({
        id: memberId,
        nickName,
        content: profileImageUrl,
      }));
      setStudyMembers(members);
    };
    // getStudyMembers();
  }, []);

  useEffect(() => {
    if (study?.commentCount === 0) {
      return;
    }

    // TODO : getEmotions 추후 백엔드와 상의후 도입 결정
    const getEmotions = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();
      const EMOTION_URL = 'api/reactions/comment-reactions';
      const body = token
        ? {
            headers,
          }
        : {};

      try {
        const response = await axios.get(`${process.env.END_POINT}${EMOTION_URL}`, body);
        type reactionsKeyType = 'dailyPlanReactionTypeId' | 'type' | 'value';
        type reactionsType = Record<reactionsKeyType, any>;
        const apiReactions: reactionsType[] = response.data.reactions;
        const newReactions = apiReactions.map(({ dailyPlanReactionTypeId, type, value }) => ({
          id: dailyPlanReactionTypeId,
          type,
          value,
        }));
        setReactions(newReactions);
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
    };

    if (study?.id) {
      // getEmotions();
    }
  }, [study?.id]);

  useEffect(() => {
    setCurrentComments(comments);
  }, [comments]);

  useEffect(() => {
    if (userInfos?.memberId) {
      return;
    }
    setIsShowingLiked(false);
  }, [userInfos?.memberId]);

  const handleClickToggleLike = () => {
    const toggleLike = () => {
      if (study) {
        if (isShowingLiked) {
          setShowingLikeCount(showingLikeCount <= 0 ? 0 : showingLikeCount - 1);
        } else {
          setShowingLikeCount(showingLikeCount + 1);
        }
        setIsShowingLiked(!isShowingLiked);
      }
    };

    const postLikePosting = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();

      const body = token
        ? {
            headers,
          }
        : {};

      try {
        const response = await axios.post(`${process.env.END_POINT}api/likes/study/${currentId}`, undefined, body);
        toggleLike();
        setReactionModalInfo({
          studyId: Number(id),
          isVisible: false,
        });
      } catch (error: any) {
        if (error.response.status === 401) {
          logout();
          setReactionModalInfo({
            studyId: Number(id),
            isVisible: true,
          });
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

    postLikePosting();
  };

  const handleClickEdit = () => {
    navigate(`${UPDATE_PATH}?study_id=${currentId}`); /// ${study?.id}
  };
  const deleteCurrentStudy = () => {
    const deleteStudy = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const refreshToken = cookies.get(`SEC_EKIL15`);
        const headers = getHeaders();

        const body = token
          ? {
              headers,
            }
          : {};
        const response = await axios.delete(`${process.env.END_POINT}api/studies/${currentId}`, body);
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
    };
    deleteStudy();
    const remainStudies = studies.filter(({ id }) => id !== currentId);
    setStudies([...remainStudies]);
    window.location.href = `${MAIN_PATH}`;
  };

  const handleClickDelete = () => {
    setIsModalVisible(true);
  };

  const handleToggleProgress = () => {
    setIsStudyRecruiting(!isStudyRecruiting);
    const postDone = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();
      try {
        const data = {
          studyStatus: study?.isRecruiting ? 'RECRUITMENT_COMPLETE' : 'RECRUITING',
        };

        const body = token
          ? {
              headers,
            }
          : {};
        const response = await axios.put(`${process.env.END_POINT}api/studies/${currentId}/study-status`, data, body);
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
    };

    postDone();
  };

  const handleClickRegister = () => {
    const postStudySignUp = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();
      const body = token
        ? {
            headers,
          }
        : {};

      try {
        const response = await axios.post(`${process.env.END_POINT}api/studies/${currentId}/studyRequest`, undefined, body);
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
    };
    postStudySignUp();
  };

  // TODO : custom hook으로 수정하기
  useEffect(() => {
    if (!target) {
      return;
    }

    if (isCommentLoading) {
      return;
    }

    // TODO : custom hook으로 수정하기
    const onIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (!target) {
        return;
      }

      if (!contentControls || !contentControls?.hasNext) {
        return;
      }

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (isCommentLoading) {
            return;
          }
          if (!contentControls || !contentControls?.hasNext) {
            return;
          }

          const addData = async () => {
            const data = await getComments(currentId, contentPageIdx);
            type apiCommentType = typeof data.content[0];

            const apiComments: apiCommentType[] = data.content;

            const targetReactions = apiComments[0]?.reactions[0];
            type reactionType = typeof targetReactions;

            const currentReplys = apiComments.map((reply) => {
              // eslint-disable-next-line no-shadow
              const { writer, writerId, deleted, commentId, profileImage, content, lastModifiedAt, reCommentCount, createdAt } = reply;
              // eslint-disable-next-line prefer-destructuring

              const reactions: reactionType[] = reply.reactions;

              return {
                id: commentId,
                nickname: deleted === 'TRUE' ? '(삭제)' : writer,
                writerId,
                time: timeForToday(createdAt),
                isEditied: !!lastModifiedAt,
                replyNum: reCommentCount,
                commentId,
                content,
                avatorSrc: deleted === 'TRUE' ? '' : profileImage,
                avatorAlt: `id${writer}-profile-image`,
                // eslint-disable-next-line no-shadow
                emojis: reactions
                  .map(({ emotion, count, reactionClicked }, index) => ({
                    id: items?.find(({ value }) => value === emotion)?.id || index + 1,
                    type: emotion,
                    value: emotion,
                    count,
                    isSelected: reactionClicked !== 'FALSE',
                  }))
                  .sort((aEmoji, bEmoji) => aEmoji.id - bEmoji.id),
                isAuthorized: !!userInfos.memberId,
                isStudyOrganizer: deleted === 'TRUE' ? false : study?.isAuthorized,
                isMyComment: deleted === 'TRUE' ? false : writer === userInfos?.nickName,
                isDeleted: deleted === 'TRUE',
              };
            });

            setCurrentComments([...currentComments, ...currentReplys]);

            const { sorted, first, last, empty, hasNext } = data;

            setContentControls(() => ({
              sorted,
              first,
              last,
              empty,
              hasNext,
            }));
          };

          if (study) {
            if (study?.commentCount === 0) {
              return;
            }

            setIsCommentLoading(true);
            addData();
          }

          setIsCommentLoading(false);
        }
      });
    };
    const observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
    if (!contentControls || !contentControls?.hasNext) {
      return;
    }

    if (!contentControls || !contentControls?.hasNext) {
      setContentPageIdx(contentPageIdx + 1);
    }
    observer.observe(target);
    // eslint-disable-next-line consistent-return
    // eslint-disable-next-line consistent-return
    return () => observer?.unobserve(target);
  }, [target, contentControls?.hasNext, contentPageIdx]);

  const handleClickCancel = () => {};

  const handleClickConfirm = () => {
    deleteCurrentStudy();
  };

  const handleModal = () => {
    setIsModalVisible(false);
  };

  const offset = 0;
  const limit = offset + DEFAUL_PAGE_NUM * (contentPageIdx + 1);

  const handleLogoutModal = () => {
    setIsLogoutAlertVisible(false);
  };

  const handleLogoutClickCancel = () => {
    setIsLogoutAlertVisible(false);
  };

  useEffect(() => {
    setTimeout(() => {
      handleLogoutClickCancel();
    }, 2500);
  }, []);

  useEffect(() => {
    const showingComments = currentComments.filter(({ isDeleted }) => !isDeleted);
    setShowingCommentNum(showingComments.length);
  }, [currentComments]);
  const [isFollowing, setIsFollowing] = useState(false);
  type profileKeyType = 'memberId' | 'nickName' | 'profileImageUrl' | 'introduction' | 'githubLink' | 'district';
  type profileType = Record<profileKeyType, any>;
  const [currentProfile, setCurrentProfile] = useState<profileType>({
    memberId: 0,
    profileImageUrl: '',
    nickName: '',
    introduction: '',
    district: '',
    githubLink: '',
  });

  useEffect(() => {
    if (!userInfos.memberId) {
      setIsFollowing(false);
    }
  }, [userInfos.memberId]);

  useEffect(() => {
    if (isHoverLoading) {
      return;
    }

    if (!isMouseOvered) {
      return;
    }
    const getIsFollowing = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();
      const body = token ? { headers } : {};

      const url = `api/members/${study?.studyOrganizerId}/friendship/follow-history`;
      try {
        const response = await axios.get(`${process.env.END_POINT}${url}`, body);
        const apiData = response.data.followHistory;
        const currentIsFollowing = apiData === 'EXIST';
        setIsFollowing(currentIsFollowing);
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
    };

    const getProfile = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();
      const body = token ? { headers } : {};

      const url = `api/members/${study?.studyOrganizerId}/hover-info`;
      try {
        setIsHoverLoading(true);
        const response = await axios.get(`${process.env.END_POINT}${url}`, body);
        setIsHoverLoading(false);
        const data = response.data;

        const { memberId, nickName, profileImageUrl, introduction, githubLink, district } = data;
        const newProfile = {
          memberId,
          nickName,
          profileImageUrl,
          introduction,
          githubLink,
          district,
        };
        setCurrentProfile(newProfile);
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
    };

    if (!currentProfile.memberId) {
      getProfile();
      getIsFollowing();
    }
  }, [isMouseOvered]);

  const handleMouse = () => {
    handleMouseOver();
  };

  const handleClickFollow = () => {
    const follow = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();
      const data = {
        targetId: study?.studyOrganizerId,
      };
      const body = token ? { headers } : {};
      const url = `api/members/following`;
      try {
        const response = await axios.post(`${process.env.END_POINT}${url}`, data, body);
        setIsFollowing(!isFollowing);
      } catch (error: any) {
        if (error.response.status === 401) {
          logout();
          // navigate(`${LOGIN_PATH}`, { state: { previousPathname: location.pathname } });
          setIsAlertModalVisible(true);
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

    follow();
  };

  const handleClickUserInfo = () => {
    if (study?.studyOrganizer) {
      window.location.href = `/${study?.studyOrganizer}`;
    }
  };

  return (
    <Layout>
      <S.Container>
        {isStudyLoading ? (
          <>
            <div style={{ display: 'flex', margin: '64px 0 0 0' }}>
              <CommentInfosMenuContainer>
                <SkeletonAvator />
              </CommentInfosMenuContainer>
              <div style={{ margin: '0 0 0 8px' }}>
                <S.SkeletonLabel />
                <div style={{ display: 'flex' }}>
                  <S.SkeletonLabel />
                  <S.SkeletonLabel />
                </div>
              </div>
            </div>
            <S.SkeletonTitle />
            <S.SkeletonContent />
            <S.ControlsContainer>
              <S.SkeletonButton size="xsmall" />
              <S.SkeletonButton size="xsmall" />
            </S.ControlsContainer>
          </>
        ) : (
          <>
            <S.Flex>
              <div style={{ display: 'flex' }} onMouseOut={handleMouseOut}>
                <span onMouseOver={handleMouse}>
                  <S.OrganizerAvatar src={study?.studyOrganizerProfile} alt="" size="small" handleClick={handleClickUserInfo} />
                </span>
                <div>
                  <span onMouseOver={handleMouse}>
                    <S.CustomCommentLabel
                      isMyComment={false}
                      isStudyOrganizer={study?.studyOrganizer === userInfos.nickName}
                      nickname={study?.studyOrganizer || '닉네임'}
                      handleClick={handleClickUserInfo}
                    />
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', padding: '4px' }}>
                    <S.Day>{study?.createdDate}</S.Day>
                    <S.Count count={study?.viewCount || 0}>
                      <Icon mode="views" color="subTitle" />
                    </S.Count>
                  </div>
                </div>
                {isMouseOvered && (
                  <S.ProfileCard onMouseOver={handleMouseOver}>
                    <S.FlexBetween>
                      <Avatar size="small" src={currentProfile?.profileImageUrl} handleClick={handleClickUserInfo} />
                      {userInfos.nickName !== study?.studyOrganizer && (
                        <S.FollowButton size="xsmall" handleClick={handleClickFollow} isFollowing={isFollowing}>
                          {isFollowing ? <S.FollowMsg>언팔로우</S.FollowMsg> : <S.FollowMsg>팔로우</S.FollowMsg>}
                        </S.FollowButton>
                      )}
                    </S.FlexBetween>
                    {/* <S.NickName onClick={handleClickUserInfo}>{currentProfile?.nickName}</S.NickName> */}
                    <S.CustomNickName handleClick={handleClickUserInfo} clamp={1} content={currentProfile?.nickName} />
                    {currentProfile?.introduction && <S.Introducion content={currentProfile?.introduction} clamp={2} />}
                    {currentProfile?.district && (
                      <S.UserInfosContainer>
                        <S.CustomIcon mode="district" color="disabled" />
                        <S.Info>{currentProfile?.district}</S.Info>
                      </S.UserInfosContainer>
                    )}
                    {currentProfile?.githubLink && (
                      <S.InfoContainer>
                        <S.CustomIcon mode="githubUrl" color="disabled" />
                        <S.CustomTextButton handleClick={() => window.open(`${currentProfile?.githubLink}`, '_blank')}>깃허브 주소</S.CustomTextButton>
                      </S.InfoContainer>
                    )}
                  </S.ProfileCard>
                )}
              </div>
              {/* </S.FlexBox> */}
              {study?.studyOrganizer === userInfos.nickName && (
                <div style={{ width: '184px' }}>
                  <Button size="small" handleClick={handleClickEdit}>
                    수정
                  </Button>
                  <S.DeleteButton size="small" handleClick={handleClickDelete}>
                    삭제
                  </S.DeleteButton>
                </div>
              )}
            </S.Flex>
            <S.Title>{study?.title}</S.Title>
            <S.HorizontalDivider direction="horizontal" />
            <S.InfosWrapper>
              <S.RigthText>
                {datesInfos
                  ?.map(({ content }) => content)
                  .join(' ')
                  .replace(' ', '  ')}
              </S.RigthText>
              <S.RigthText>
                {otherInfos
                  ?.map(({ content }) => content)
                  .join('     ')
                  .replace(' ', '  ')}
              </S.RigthText>
            </S.InfosWrapper>
            <S.Content>{study?.content}</S.Content>
            {currentTags && <S.CustomLabelList mode="default" size="small" items={currentTags} />}
            <S.ControlsContainer>
              {study?.studyOrganizer === userInfos.nickName &&
                (isStudyRecruiting ? (
                  <S.RecruitButton mode="accent" size="small" handleClick={handleToggleProgress}>
                    모집완료 설정
                  </S.RecruitButton>
                ) : (
                  <S.RecruitButton size="small" handleClick={handleToggleProgress}>
                    모집완료 해제
                  </S.RecruitButton>
                ))}
              {study?.studyOrganizer !== userInfos.nickName && (
                <S.CustomLabel mode={study?.isRecruiting ? 'accent' : 'done'} size="small">
                  {study?.isRecruiting ? '모집중' : '모집완료'}
                </S.CustomLabel>
              )}
              <S.CustomLikeButton className="reaction" mode="default" size="small" handleClick={handleClickToggleLike} isSelected={isShowingLiked}>
                <S.CustomLikeIconCountBox className="reaction" count={showingLikeCount}>
                  <Icon className="reaction" mode="thumbsUp" />
                </S.CustomLikeIconCountBox>
              </S.CustomLikeButton>
            </S.ControlsContainer>
          </>
        )}
        <S.CustomCommentWrite
          id="comment"
          writerId={currentUserInfos.memberId}
          studyId={currentId}
          isAuthorized={!!currentUserInfos.memberId}
          placeholder=""
          avatorSrc={currentUserInfos.profileImage || ''}
          avatorAlt=""
          nickname={currentUserInfos?.nickName}
          studyOrganizer={study?.studyOrganizer}
        />
        {currentComments?.length > 0 && <S.CommentCount>댓글 {showingCommentNum}개</S.CommentCount>}
        {isCommentLoading ? (
          <S.ReplyContainer>
            <SkeletonPosting>
              <CommentInfosMenuContainer>
                <CommentInfos isLoading isDeleted isMyComment={false} avatorSrc="" avatorAlt="" nickname="" time="" isEdited={false} isStudyOrganizer={false} />
                <CommentManageMenu isLoading isCommentWriter={false} handleClickEdit={() => {}} handleClickDelete={() => {}} handleClickEmoji={() => {}} />
              </CommentInfosMenuContainer>
              <CommentContainer>
                <CommentContent isLoading content="" />
              </CommentContainer>
            </SkeletonPosting>
          </S.ReplyContainer>
        ) : (
          <S.ReplyContainer>
            {currentId &&
              currentComments?.map(({ id, commentId, writerId, nickname, time, isEditied, replyNum, avatorSrc, avatorAlt, emojis, isAuthorized, isStudyOrganizer, isMyComment, isDeleted }, index) => (
                <S.CommentItem key={`reply-${id}`}>
                  <Comment
                    id={id}
                    studyId={currentId}
                    myMemberId={currentUserInfos.memberId}
                    writerId={writerId}
                    nickname={nickname}
                    time={time}
                    isEditied={isEditied}
                    replyNum={replyNum}
                    content={currentComments[index].content}
                    avatorSrc={avatorSrc}
                    avatorAlt={avatorAlt}
                    emojis={emojis}
                    isAuthorized={isAuthorized}
                    isStudyOrganizer={isStudyOrganizer}
                    isMyComment={isMyComment}
                    studyOrganizer={study?.studyOrganizer}
                    isDeleted={isDeleted}
                  />
                </S.CommentItem>
              ))}
          </S.ReplyContainer>
        )}
        <div ref={setTarget} />
      </S.Container>
      <Portal>
        {isModalVisible && (
          <Modal onClose={handleModal} ref={modalRef}>
            <DoubleButtonModalArea handleClickLeftButton={handleClickCancel} handleClickRightButton={handleClickConfirm}>
              스터디 삭제
              <h3>스터디를 삭제하시겠습니까?</h3>
              {BUTTON_CANCEL}
              {BUTTON_CONFIRM}
            </DoubleButtonModalArea>
          </Modal>
        )}
      </Portal>
    </Layout>
  );
};

export default Detail;
