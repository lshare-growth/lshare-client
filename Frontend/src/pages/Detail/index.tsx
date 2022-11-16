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
  //    | 'myId'

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
    // const isLogined = cookies.get('logined');
    const isLogined = cookies.get('logined');
    // setLoginInfo(isLogined);
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

  // useEffect(() => {
  //   const listenBackEvent = () => {
  //     if (state?.from === `${MAIN_PATH}`) {
  //       navigate(`${MAIN_PATH}`, { state: { hasPage: true } });
  //     }
  //   };

  //   const unlistenHistoryEvent = history.listen(({ action }) => {
  //     if (action === 'POP') {
  //       listenBackEvent();
  //     }
  //   });

  //   return unlistenHistoryEvent;
  // }, []);

  // TODO : 로그아웃 모달
  // useEffect(() => {
  //   if (state?.isLogouted) {
  //     setIsLogoutAlertVisible(true);
  //   }
  // }, [state?.isLogouted]);

  const [locationKeys, setLocationKeys] = useState([]);

  // useEffect(
  //   () =>
  //     navigation.listen(() => {
  //       if (navigation.action === 'POP') {
  //         navigate(`${MAIN_PATH}`);
  //       }
  //     }),
  //   [navigation]
  // );

  // useEffect(() => {
  //   const newTags = keywords.map((keyword, index) => ({
  //     id: index,
  //     content: keyword,
  //   }));
  //   setTags([...newTags]);
  // }, [keywords]);

  useEffect(() => {
    setCurrentUserInfos(userInfos);
  }, [userInfos.nickName]);

  useEffect(() => {
    const getStudy = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const refreshToken = cookies.get(`SEC_EKIL15`);
        const headers = getHeaders();

        // const body = token ? { headers, withCredentials: true } : { withCredentials: true };
        const body = token ? { headers } : {};

        const response = await axios.get(`${process.env.END_POINT}api/studies/${currentId}`, body);
        // console.log('study response');
        // console.log(currentId);
        // console.log(response);
        /// console.log(response.data.contents);
        // if (response.status === 404) {
        //   console.log('404 error');
        //   return;
        // }
        // if (response.status === 500) {
        //   navigate(`${SERVER_ERROR_PATH}`);
        // }

        // TODO: study 업데이트 하기
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
        // myId,
        // nickName,
        // TODO: API
        // const { id, nickName, title, content, likeClicked, studyOrganizer, studyStatus, progressOfStudy, commentCount, viewCount, likeCount, createdAt, maxStudyMemberCount, currentStudyMemberCount, startDate, endDate } =
        // targetData;
        // isWriter: studyOrganizer === nickName

        // eslint-disable-next-line prefer-destructuring
        // const hashTags: tagType[] = targetData.hashTags;
        // const tags = hashTags?.map(({ studyId, tagName }) => ({
        //   id: studyId,
        //   content: `#${tagName}`,
        // }));

        type tagDataKeyType = 'hashTagResponses';
        type tagDataType = Record<tagDataKeyType, any>;

        // const tagResponse: tagDataType = await axios.get(`${process.env.END_POINT}api/tags/study/${currentId}`, { headers });
        const tagResponse = {
          hashTagResponses: [],
        };
        // const tagResponse = [
        //   {
        //     studyId: 1,
        //     tagName: 'backend',
        //   },
        // ];

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

        // TODO: api변경시 제거
        // setIsShowingLiked(isLiked);

        // type apiCommentType = typeof response.data.comments[0];

        // // const apiComments: apiCommentType[] = response.data.comments;
        // const apiComments: apiCommentType[] = response.data.comments;
        // const targetReactions = apiComments[0]?.reactions[0];
        // type reactionType = typeof targetReactions;

        // if (!apiComments) {
        //   return;
        // }

        // // TODO: studyMembers
        // // type apiStudyMemberType = typeof response.data.studyMembers[0];
        // // const apiMembers: apiStudyMemberType[] = response.data.studyMembers;

        // // const members = apiMembers.map(({ id, githubId, profileImageUrl }) => ({
        // //   id,
        // //   nickName: githubId,
        // //   content: profileImageUrl,
        // // }));
        // // setStudyMembers(members);
        // const apiMembers = [
        //   {
        //     memberId: 1,
        //     nickName: 'devjun10',
        //     profileImageUrl: 'www.naver.com',
        //   },
        // ];
        // const members = apiMembers.map(({ memberId, nickName, profileImageUrl }) => ({
        //   id: memberId,
        //   nickName,
        //   content: profileImageUrl,
        // }));
        // setStudyMembers(members);

        // // eslint-disable-next-line no-shadow
        // const currentReplys = apiComments.map((reply) => {
        //   // eslint-disable-next-line no-shadow
        //   const { writerGithubId, commentId, profileImage, content, lastModifiedAt, reCommentCount } = reply;
        //   // eslint-disable-next-line prefer-destructuring
        //   const reactions: reactionType[] = reply.reactions;
        //   return {
        //     id: commentId,
        //     // nickname: currentStudy.nickName,
        //     nickname: writerGithubId,
        //     time: timeForToday(createdAt),
        //     isEditied: !!lastModifiedAt,
        //     replyNum: reCommentCount,
        //     commentId: id,
        //     content,
        //     avatorSrc: profileImage,
        //     avatorAlt: `${currentStudy.nickName}-profile-image`,
        //     // eslint-disable-next-line no-shadow
        //     emojis: reactions.map(({ commentReactionId, emotion, reactionCount, memberIds }) => ({
        //       id: commentReactionId,
        //       type: emotion,
        //       value: emotion,
        //       count: reactionCount,
        //       isSelected: !!memberIds.find((memberId) => memberId === currentStudy.myId),
        //     })),
        //     // sAuthorized: currentStudy.nickName === writerGithubId,
        //     isAuthorized: !!writerGithubId,
        //     isStudyOrganizer: currentStudy.nickName === studyOrganizer,
        //     isMyComment: currentStudy.nickName === writerGithubId,
        //   };
        // });
        // // isWriter: nickNameState === writerNickName
        // // isMyComment: nickName === writerGithubId
        // // TODO: reCommentCount로 댓글 개수
        // // const newDatas = [
        // //   {
        // //     id: commentId,
        // //     nickname, // TODO: 랜딩 페이지에서 얻은 아이디와 같은지로 내 댓글인지 판단
        // //     time: '', // TODO: API : createdAt을 이용하여 구하기
        // //     isEditied: lastModifiedAt ? true : false,
        // //     // replyNum: 0,
        // //     commentId: study.id, // TODO: study Id는 랜딩페이지에서 얻은 걸로
        // //     content,
        // //     avatorSrc: profileImage,
        // //     avatorAlt: `${githubId} profile image`,
        // //     // eslint-disable-next-line no-shadow
        // //     emojis: reactions.map(({ id, emotion, reactionCount, reactionClicked, memberIds }) => ({
        // //       id,
        // //       type: emotion,
        // //       value: emotion,
        // //       count: reactionCount,
        // //       isSelected: memberIds.find((memberId) => memberId === myId) ? true : false,
        // //     })),
        // //     isAuthorized: githubId ? true : false,
        // //   };
        // // ];
        // // isWriter: nickNameState === writerNickName
        // // isMyComment: nickName === writerGithubId
        // // TODO: reCommentCount로 댓글 개수
        // setComments([...currentReplys]);
        // setCurrentComments([...currentReplys]);
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
    // if (userInfos.memberId) {
    getStudy();
    // }

    setIsStudyLoading(false);
  }, []);

  useEffect(() => {
    const getIsClicked = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const refreshToken = cookies.get(`SEC_EKIL15`);
        const headers = getHeaders();

        const body = token ? { headers } : {};

        const response = await axios.get(`${process.env.END_POINT}api/likes/study/${currentId}`, body);
        setIsShowingLiked(response?.data?.clicked === 'TRUE');
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

    getIsClicked();
  }, []);
  useEffect(() => {
    const getTags = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();

      try {
        const body = token ? { headers } : {};
        const response = await axios.get(`${process.env.END_POINT}api/hashtags/study/${currentId}`, body);
        // {"hashTagId":22,"tagName":"adfasdf"}
        const hashTags: tagType[] = response.data.hashTagResponses;
        const tags = hashTags?.map(({ hashTagId, tagName }) => ({
          id: hashTagId,
          content: `#${tagName}`,
        }));
        if (tags) {
          setTags(tags);
        }
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

    getTags();
  }, []);

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

    // if (isCommentLoading) {
    //   return;
    // }
    const getComments = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();

      // const body = token ? { headers, withCredentials: true } : { withCredentials: true };
      const body = token ? { headers } : {};
      const response = await axios.get(`${process.env.END_POINT}api/comments/study/${currentId}?page=${contentPageIdx}&size=10`, body);
      // console.log('res.data.content');
      // type apiCommentType = typeof response.data.content[0];
      // const apiComments: apiCommentType[] = response.data.content;

      // {
      //   memberIds: [2, 3, 100],
      //   commentReactionId: '1',
      //   emotion: '::heart::',
      //   reactionCount: 1,
      // },
      type apiCommentType = typeof response.data.content[0];

      const apiComments: apiCommentType[] = response.data.content;

      const targetReactions = apiComments[0]?.reactions[0];
      type reactionType = typeof targetReactions;

      if (!apiComments) {
        return;
      }

      // TODO: studyMembers
      // type apiStudyMemberType = typeof response.data.studyMembers[0];
      // const apiMembers: apiStudyMemberType[] = response.data.studyMembers;

      // const members = apiMembers.map(({ id, githubId, profileImageUrl }) => ({
      //   id,
      //   nickName: githubId,
      //   content: profileImageUrl,
      // }));
      // setStudyMembers(members);

      // const apiMembers = [
      //   {
      //     memberId: 1,
      //     nickName: 'devjun10',
      //     profileImageUrl: 'www.naver.com',
      //   },
      // ];
      // const members = apiMembers.map(({ memberId, nickName, profileImageUrl }) => ({
      //   id: memberId,
      //   nickName,
      //   content: profileImageUrl,
      // }));
      // setStudyMembers(members);

      // {
      //   memberIds: [2, 3],
      //   commentReactionId: '1',
      //   emotion: '::heart::',
      //   reactionCount: 1,
      // },

      // TODO API 주석 풀기
      const { sorted, first, last, empty, hasNext } = response.data;

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
        // const { writer, writerId, commentId, profileImage, content, lastModifiedAt, reCommentCount, createdAt } = reply;
        const { deleted, writer, writerId, commentId, profileImage, content, lastModifiedAt, reCommentCount, createdAt } = reply;
        // eslint-disable-next-line prefer-destructuring
        const reactions: reactionType[] = reply.reactions;

        return {
          id: commentId,
          // nickname: currentStudy.nickName,
          nickname: deleted === 'TRUE' ? '(삭제)' : writer, // writerGithubId가 nickName으로 바뀐것 같다.
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
          // sAuthorized: currentStudy.nickName === writerGithubId,
          isAuthorized: deleted === 'TRUE' ? false : !!userInfos?.memberId,
          isStudyOrganizer: false, // study?.nickName === study?.studyOrganizer,
          isMyComment: deleted === 'TRUE' ? false : writer === userInfos?.nickName, // writerId === study?.memberId, // study?.nickName === writerGithubId, // TODO: study?.nickName이 댓글쪽에서 주는걸로 백엔드에서 변경해주심
          isDeleted: deleted === 'TRUE',
        };
      });

      setComments([...currentReplys]);
      setApiComments([...currentReplys]);
      setCurrentComments([...currentReplys]);
    };

    setIsCommentLoading(true);
    getComments();
    setIsCommentLoading(false);

    // TODO: study 정보를 백엔드에서 주시면 배열에서 삭제
    // }, []);
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
      // const { writer, writerId, commentId, profileImage, content, lastModifiedAt, reCommentCount, createdAt } = reply;
      const { id, nickname, writerId, time, isEditied, replyNum, commentId, content, avatorSrc, avatorAlt, isDeleted, emojis } = reply;
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
        isStudyOrganizer: isDeleted ? false : study?.isAuthorized, // study?.nickName === study?.studyOrganizer,
        isMyComment: isDeleted ? false : nickname === userInfos?.nickName, // writerId === study?.memberId, // study?.nickName === writerGithubId, // TODO: study?.nickName이 댓글쪽에서 주는걸로 백엔드에서 변경해주심
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
    // TODO: studyMembers
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
      // console.log(res.data.studyMembers);
      // res.studyMembers
      type apiMemberType = typeof res.data.studyMembers[0];
      const apiMembers: apiMemberType[] = res.data.studyMembers;
      // const apiMembers = [
      //   {
      //     memberId: 1,
      //     nickName: 'devjun10',
      //     profileImageUrl: 'www.naver.com',
      //   },
      // ];
      const members = apiMembers.map(({ memberId, nickName, profileImageUrl }) => ({
        id: memberId,
        nickName,
        content: profileImageUrl,
      }));
      setStudyMembers(members);
      // type apiStudyMemberType = typeof response.data.studyMembers[0];
      // const apiMembers: apiStudyMemberType[] = response.data.studyMembers;
      // const members = apiMembers.map(({ id, githubId, profileImageUrl }) => ({
      //   id,
      //   nickName: githubId,
      //   content: profileImageUrl,
      // }));
      // setStudyMembers(members);
    };
    // getStudyMembers();
  }, []);

  useEffect(() => {
    if (study?.commentCount === 0) {
      return;
    }

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
    // getEmotions();
  }, [study?.id]);
  // if (currentReactions.length > 0) {
  //   return;
  // }

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
        // const response = await axios.post(`${process.env.END_POINT}api/studies/${currentId}/likes`, undefined, {
        const response = await axios.post(`${process.env.END_POINT}api/likes/study/${currentId}`, undefined, body);
        // const response = await axios.post(`${process.env.END_POINT}api/studies/${currentId}`, undefined, body);
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

    postLikePosting();
  };

  const handleClickEdit = () => {
    navigate(`${UPDATE_PATH}?study_id=${currentId}`); /// ${study?.id}
    // navigate(`?study_id=${currentId}`);
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
    // navigate(`${MAIN_PATH}`);
    window.location.href = `${MAIN_PATH}`;
  };

  const handleClickDelete = () => {
    setIsModalVisible(true);
  };

  const handleToggleProgress = () => {
    // TODO: 모집상태 변경 API 요청
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
      // const data = {
      //   studyId,
      // };
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
        // TODO: 주석풀기

        // if (contentPageIdx > lastPageIdx) {
        //   return;
        // }

        if (entry.isIntersecting) {
          // observer.unobserve(target);
          if (isCommentLoading) {
            return;
          }
          if (!contentControls || !contentControls?.hasNext) {
            return;
          }

          const addData = async () => {
            const token = localStorage.getItem('accessToken');
            const refreshToken = cookies.get(`SEC_EKIL15`);
            const headers = getHeaders();

            const body = token
              ? {
                  headers,
                }
              : {};
            const response = await axios.get(`${process.env.END_POINT}api/comments/study/${currentId}?page=${contentPageIdx}&size=10`, body);

            type apiCommentType = typeof response.data.content[0];

            const apiComments: apiCommentType[] = response.data.content;

            const targetReactions = apiComments[0]?.reactions[0];
            type reactionType = typeof targetReactions;

            const currentReplys = apiComments.map((reply) => {
              // eslint-disable-next-line no-shadow
              const { writer, writerId, deleted, commentId, profileImage, content, lastModifiedAt, reCommentCount, createdAt } = reply;
              // eslint-disable-next-line prefer-destructuring

              const reactions: reactionType[] = reply.reactions;

              return {
                id: commentId,
                // nickname: currentStudy.nickName,
                nickname: deleted === 'TRUE' ? '(삭제)' : writer, // writerGithubId가 nickName으로 바뀐것 같다.
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
                // sAuthorized: currentStudy.nickName === writerGithubId,
                isAuthorized: !!userInfos.memberId, // deleted === 'TRUE' ? '' : userInfos.memberId,
                isStudyOrganizer: deleted === 'TRUE' ? false : study?.isAuthorized, // study?.nickName === study?.studyOrganizer,
                isMyComment: deleted === 'TRUE' ? false : writer === userInfos?.nickName, // writerId === study?.memberId, // study?.nickName === writerGithubId, // TODO: study?.nickName이 댓글쪽에서 주는걸로 백엔드에서 변경해주심
                isDeleted: deleted === 'TRUE',
              };
            });
            // setComments(() => [...comments, ...currentReplys]);
            // setCurrentComments(() => [...currentComments, ...currentReplys]);
            setCurrentComments([...currentComments, ...currentReplys]);

            const { sorted, first, last, empty, hasNext } = response.data;

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

          // setContentPageIdx(contentPageIdx + 1);

          // observer.observe(target);
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
    // return () => observer?.unobserve(target);
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

  // const { isMouseOvered, handleMouseOver, handleMouseOut } = useMouse(false);
  const [isFollowing, setIsFollowing] = useState(false);
  type profileKeyType = 'memberId' | 'nickName' | 'profileImageUrl' | 'introduction' | 'githubLink' | 'district';
  type profileType = Record<profileKeyType, any>;
  // memberId, nickName, profileImageUrl, introduction, githubLink, district
  const [currentProfile, setCurrentProfile] = useState<profileType>({
    memberId: 0,
    profileImageUrl: '',
    nickName: '',
    introduction: '',
    district: '',
    githubLink: '',
    // blogUrl: '',
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
        // const data = {
        //   followHistory: 'EXIST', // NON_EXIST
        // };
        // const apiData = data.followHistory;
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
            {/* <S.TitleContainer> */}
            <S.Flex>
              {/* <S.FlexBox> */}
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

                    {/* <S.InfoContainer>
                        <S.CustomIcon mode="link" color="disabled" />
                        <S.CustomTextButton handleClick={() => window.open(`${currentProfile?.githubLink}`, '_blank')}>블로그 주소</S.CustomTextButton>
                      </S.InfoContainer> */}
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
            {/* </S.TitleContainer> */}
            {/* <S.Flex> */}
            <S.Title>{study?.title}</S.Title>
            {/* </S.Flex> */}
            <S.HorizontalDivider direction="horizontal" />
            <S.InfosWrapper>
              {/* <S.DatesContainer>
                {datesInfos?.map((info: any) => (
                  <S.InfoItem key={`detail-page-${info.id}-${info.content}`}>
                    <span>{info.content}</span>
                  </S.InfoItem>
                ))}
              </S.DatesContainer>
              <S.InfosContainer>
                {otherInfos?.map((info: any) => (
                  <S.OtherInfo key={`detail-page-${info.id}-${info.content}`}>
                    <span>{info.content}</span>
                  </S.OtherInfo>
                ))}
              </S.InfosContainer> */}
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
            {/* <S.InfoContainer> */}
            {/* {study?.infos?.map((info: any) => (
                <S.InfoItem key={`detail-page-${info.id}-${info.content}`}>
                  <span>{info.type === 'limit' ? `최대${info.content}명` : info.content}</span>
                </S.InfoItem>
              ))} */}
            {/* </S.InfoContainer> */}
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
              {/* {study?.studyOrganizer !== userInfos.nickName &&
                (isStudyRecruiting ? (
                  <Button mode="accent" size="medium" handleClick={handleClickRegister}>
                    참여신청
                  </Button>
                ) : (
                  <Button mode="accent" size="medium" disabled>
                    모집완료
                  </Button>
                ))} */}
              <S.CustomLikeButton className="reaction" mode="default" size="small" handleClick={handleClickToggleLike} isSelected={isShowingLiked}>
                <S.CustomLikeIconCountBox className="reaction" count={showingLikeCount}>
                  <Icon className="reaction" mode="thumbsUp" />
                </S.CustomLikeIconCountBox>
              </S.CustomLikeButton>
              {/* <span style={{ position: 'relative' }} onFocus={handleMouseOver} onBlur={handleMouseOut} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                <S.PopUp isHovered={isMouseOvered}>
                  {studyMembers.map((item) => (
                    <S.EmojiItem key={`items-${item.id}-${item.content}`}>
                      <S.UserContainer>
                        <S.CustomAvatar src={item.content} alt="" />
                        <Title title={item.nickName} />
                      </S.UserContainer>
                    </S.EmojiItem>
                  ))}
                </S.PopUp>
                <S.CustomButton mode="default" size="medium">
                  <S.CustomIconCountBox count={`${study?.currentStudyMemberCount}/${study?.maxStudyMemberCount}`}>
                    <Icon mode="users" />
                  </S.CustomIconCountBox>
                </S.CustomButton>
              </span> */}
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
              // currentComments.map(({ id, commentId, writerId, nickname, isDeleted, time, isEditied, replyNum, avatorSrc, avatorAlt, emojis, isAuthorized, isStudyOrganizer, isMyComment }, index) => (
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
                    // writer={study?.nickName || '닉네임'}
                    studyOrganizer={study?.studyOrganizer}
                    isDeleted={isDeleted}
                  />
                </S.CommentItem>
              ))}
          </S.ReplyContainer>
        )}
        {/* <div ref={(currentTarget) => setTarget(currentTarget)} /> */}
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
      {/* <Portal>
        {isLogoutAlertVisible && (
          <Modal position="moreRight" onClose={handleLogoutModal} ref={logoutModalRef}>
            <AlertModalArea size="small" handleClickCancel={handleLogoutClickCancel}>
              로그아웃되었습니다.
            </AlertModalArea>
          </Modal>
        )}
      </Portal> */}
    </Layout>
  );
};

export default Detail;
