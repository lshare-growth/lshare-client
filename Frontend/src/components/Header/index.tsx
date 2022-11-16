/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import SearchArea from '@components/SearchArea';
import Icon from '@components/common/Icon';
import Avator from '@common/Avatar';
import { useNavigate, useLocation } from 'react-router-dom';
// import AvatorDropDown from '@components/AvatorDropDown';
import options from '@components/AvatorDropDown/constants';
import axios, { AxiosResponse } from 'axios';
import { Cookies } from 'react-cookie';
import React, { useEffect, useRef, useState, ChangeEvent } from 'react';
import useMouse from '@hooks/useMouse';
import Portal from '@components/Modal/Portal';
import Modal from '@components/Modal';
import SingleButtonModalArea from '@components/Modal/SingleButtonModalArea';
import ArticleContent from '@components/Modal/SingleButtonComponents/ArticleContent';
import ButtonContent from '@components/Modal/SingleButtonComponents/ButtonContent';
import { LOGIN_TITLE, LOGIN_BUTTON_CONTENT, SIGN_UP_TITLE, SIGN_UP_BUTTON_CONTENT } from '@components/Modal/constants';
import { loginExplains, signUpExplains } from '@components/Modal/SingleButtonComponents/constants';
import userInfosState from '@store/UserInfos';
import { useRecoilState } from 'recoil';
// import LoginButtonContent from '@components/Modal/SingleButtonComponents/ButtonContent';
// import NotificationDropDown from '@components/NotificationDropDown';
import BasicButton from '@components/common/BasicButton';
// import CommentContent from '@components/CommentContent';
import Avatar from '@components/common/Avatar';
import TextButton from '@common/TextButton';
import Bell from '@assets/img/notification.png';
import DefaultBell from '@assets/img/notificationDefault.png';
import studiesState from '@store/Studies';
import timeForToday from '@pages/Detail/util';
import { encrypt, decrypt, getHeaders } from '@pages/util';
import LoadingSpinner from '@components/common/LoadingSpinner';
import AlertModalArea from '@components/Modal/AlertModalArea';
import useLogOut from '@hooks/useLogout';
import isLoginModalVisibleState from '@store/LoginModal';
import loginInfoState from '@store/LoginInfo';
import reactionModalInfoState from '@store/ReactionModal';
import isAlertModalVisibleState from '@store/AlertModal';
import {
  SEARCHING_PATH,
  MEMBER_DETAIL_PATH,
  ETC_PATH,
  LOGIN_PATH,
  SERVER_ERROR_PATH,
  LANDING_PATH,
  MAIN_PATH,
  STUDY_MANAGE_PATH,
  MEMBER_EDIT_PATH,
  INTRODUCE_PATH,
  NEW_STUDY_PATH,
  STUDY_PATH,
} from '../../constants/route';
import * as S from './style';

type HeaderProps = {
  // eslint-disable-next-line react/require-default-props
  className?: string;
  alt?: string;
  type: string;
};

const INITIAL_BUTTON_NUM = 1;

const Header = ({ className, type, alt = '' }: HeaderProps) => {
  // eslint-disable-next-line no-unused-vars
  // const [cookies] = useCookies(['refreshToken']);
  const cookies = new Cookies();
  // const [logined] = useCookies(['logined']);
  type notificationKeyType = 'id' | 'content' | 'isRead' | 'profileUrl' | 'time';
  type notificationTyep = Record<notificationKeyType, any>;
  const [notifications, setNotifications] = useState<notificationTyep[]>([]);
  const [userInfos, setUserInfos] = useRecoilState(userInfosState);
  const navigate = useNavigate();
  const [studies, setStudies] = useRecoilState(studiesState);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const signUpModalRef = useRef<HTMLDivElement>(null);
  // const location = useLocation();
  const { pathname } = useLocation();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [contentPageIdx, setContentPageIdx] = useState(0);
  const [isReadAlarms, setIsReadAlarms] = useState(userInfos.notification);
  const [isNotifationLoading, setIsNotifiationLoading] = useState(false);
  type CotnentControlsKeyType = 'sorted' | 'requestPageSize' | 'currentPageNumber' | 'totalElementSize' | 'firstPage' | 'last' | 'empty';
  type CotnentControlsType = Record<CotnentControlsKeyType, any>;
  const [contentControls, setContentControls] = useState<CotnentControlsType>();
  const DEFAULT_SHOWING_PAGE_NUM = 5;
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const { isMouseOvered, handleMouseOver, handleMouseOut } = useMouse(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedTag, setIsFocusedTag] = useState(false);
  const [isClickAway, setIsClickAway] = useState(false);
  const target = useRef<HTMLDivElement>(null);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [showingPageButtonNum, setShowingPageButtonNum] = useState(1);
  const [isLogoutAlertVisible, setIsLogoutAlertVisible] = useState(false);
  const location = useLocation();
  type stateKeyType = 'isSearched' | 'contentControls' | 'isLogouted' | 'hasPage';
  type stateType = Record<stateKeyType, any>;
  const state = location.state as stateType;
  const { logout } = useLogOut();
  const [isLoginModalVisible, setIsLoginModalVisible] = useRecoilState(isLoginModalVisibleState);
  const [isLoginClickAway, setIsLoginClickAway] = useState(false);
  const [isSignUpClickAway, setIsSignUpClickAway] = useState(false);
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);
  const loginRef = useRef<HTMLDivElement>(null);
  const signUpRef = useRef<HTMLDivElement>(null);
  const [reactionModalInfo, setReactionModalInfo] = useRecoilState(reactionModalInfoState);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const alertModalRef = useRef<HTMLDivElement>(null);
  const [isAlertModalVisible, setIsAlertModalVisible] = useRecoilState(isAlertModalVisibleState);

  useEffect(() => {
    const handleClickAway = (event: any) => {
      setIsLoginClickAway(
        !(
          loginRef.current?.contains(event.target as Node) ||
          event.target.classList.contains('login') ||
          event.target.classList.contains('write') ||
          event.target.classList.contains('reaction') ||
          event.target.classList.contains('selectedEmojis')
        )
      );
    };

    document.addEventListener('click', handleClickAway);
  }, []);

  // useEffect(() => {
  //   const encodedNotificationRead = cookies.get(`SEC_1RATI5`);
  //   const notificationRead = decrypt(encodedNotificationRead, `${process.env.SECURE_ALARM_KEY}`);

  //   const newUserInfos = {
  //     memberId: userInfos.memberId,
  //     nickName: userInfos.nickName,
  //     notification: notificationRead,
  //     profileImage: userInfos.profileImage,
  //   };

  //   setUserInfos(newUserInfos);
  // }, []);

  useEffect(() => {
    const handleClickAway = (event: any) => {
      setIsSignUpClickAway(!(signUpRef.current?.contains(event.target as Node) || event.target.classList.contains('signUp')));
    };

    document.addEventListener('click', handleClickAway);
  }, []);

  useEffect(() => {
    // const isLogined = cookies.get('logined');
    const isLogined = cookies.get('logined');
    setLoginInfo(isLogined);
    if (!isLogined || isLogined === 'false') {
      logout();
      return;
    }

    if (!userInfos?.memberId) {
      const encodedMemberId = cookies.get(`SEC_MITO78`);
      const encodedNickName = cookies.get(`SEC_3BKIF3`);
      const encodedNotificationRead = cookies.get(`SEC_1RATI5`);
      const encodedProfileImage = cookies.get(`SEC_DMIF22`);

      if (encodedMemberId && encodedNickName && encodedNotificationRead && encodedProfileImage) {
        const memberId = decrypt(encodedMemberId, `${process.env.SECURE_ID_KEY}`);
        const nickName = decrypt(encodedNickName, `${process.env.SECURE_IDENTIFI_KEY}`);
        const notificationRead = decrypt(encodedNotificationRead, `${process.env.SECURE_ALARM_KEY}`);
        const profileImage = decrypt(encodedProfileImage, `${process.env.SECURE_PROFILE_KEY}`);

        // notification: notificationmessagereadstatus !== 'READ_ALL',
        const currentUserInfos = {
          memberId: Number(memberId),
          nickName,
          notification: notificationRead === 'true',
          profileImage,
        };

        setUserInfos(currentUserInfos);
      }
    }
  }, [loginInfo, userInfos?.memberId, userInfos?.notification, userInfos?.nickName, userInfos?.profileImage]);

  useEffect(() => {
    const restoreProfileImage = cookies.get('SEC_RFDM33');
    const profileImage = cookies.get('SEC_DMIF22');

    if (!profileImage && restoreProfileImage) {
      const originRestoreProfileImage = decrypt(restoreProfileImage, `${process.env.SECURE_PROFILE_KEY}`);
      const encodedProfileImage = encrypt(originRestoreProfileImage, `${process.env.SECURE_PROFILE_KEY}`);
      cookies.set(`SEC_DMIF22`, encodedProfileImage, {
        path: '/',
      });
    }
  }, [cookies]);

  // TODO : 로그아웃 모달
  // useEffect(() => {
  //   if (state?.isLogouted) {
  //     setIsLogoutAlertVisible(true);
  //     setTimeout(() => {
  //       setIsLogoutAlertVisible(false);
  //     }, 2500);
  //   }
  // }, []);

  useEffect(() => {
    //   let showingPageButtonNum = contentControls?.totalElementSize > DEFAULT_SHOWING_PAGE_NUM ? DEFAULT_SHOWING_PAGE_NUM : contentControls?.totalElementSize;
    // if (showingPageButtonNum === 0) {
    //   showingPageButtonNum = 1;
    // }
    setShowingPageButtonNum(contentControls?.totalElementSize > DEFAULT_SHOWING_PAGE_NUM ? DEFAULT_SHOWING_PAGE_NUM : contentControls?.totalElementSize);
  }, [showingPageButtonNum]);

  // const logout = () => {
  //   localStorage.removeItem('accessToken');
  //   // localStorage.removeItem('refreshToken');
  //   // cookies.remove(ENCODED_REFRESH_TOKEN_KEY);
  //   // localStorage.removeItem('tags');

  //   cookies.remove(`SEC_MITO78`);
  //   cookies.remove(`SEC_3BKIF3`);
  //   cookies.remove(`SEC_1RATI5`);
  //   cookies.remove(`SEC_DMIF22`);

  //   cookies.remove('logined');

  //   setUserInfos({
  //     memberId: 0,
  //     nickName: '',
  //     notification: false,
  //     profileImage: '',
  //   });
  // };

  const handleSelect = (operation: string) => {
    if (operation === '로그아웃') {
      logout();
      return;
    }

    // TODO: 타입 구체화
    const redirections: any = {
      프로필: `/${userInfos.nickName}`,
      회원수정: `${MEMBER_EDIT_PATH}`,
      // 스터디관리: `${STUDY_MANAGE_PATH}`,
    };
    if (operation === '프로필') {
      window.location.href = `${redirections[operation]}`;
      return;
    }
    navigate(redirections[operation]);
  };

  const goHome = () => {
    navigate(`${LANDING_PATH}`);
  };

  const handleClickLogin = () => {
    setIsModalVisible(true);
    setIsSignUpModalVisible(false);
  };

  const tabs = [
    { id: 1, content: '공지사항' },
    { id: 2, content: '스터디' },
    // { id: 2, content: '데일리 플랜' },
  ];
  const handleClickTab = (selectedId: number) => {
    if (selectedId === 1) {
      window.location.href = `${INTRODUCE_PATH}`;
      // navigate(`${INTRODUCE_PATH}`);
    } else if (selectedId === 2) {
      const tag = sessionStorage.getItem('tag');
      if (tag) {
        sessionStorage.removeItem('tag');
      }
      // window.location.href = `${MAIN_PATH}?page=1`;
      window.location.href = `${MAIN_PATH}`;
      // TODO: 데일리플랜으로 이동
      // navigate(`/plans`);
    }
  };

  const handleFocusDefault = () => {
    setIsFocused(true);
    setIsFocusedTag(() => true);
  };

  // const handleFocus = () => {
  //   setIsFocusedTag(() => true);
  // };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    const handleBlurTag = () => {
      if (!isClickAway) {
        return;
      }
      setIsFocused(false);
      setIsFocusedTag(false);
    };
    handleBlurTag();
  }, [isClickAway]);

  const handleBlurCurrentTag = () => {
    setIsFocusedTag(false);
  };

  useEffect(() => {
    // TODO: any 타입 구체화
    const handleClickAway = (event: any) => {
      if (event.target.closest('.tag') || event.target.closest('.search')) {
        setIsClickAway(false);
        return;
      }
      setIsClickAway(!target.current?.contains(event.target as Node));
    };

    document.addEventListener('click', handleClickAway);
  }, []);

  useEffect(() => {
    if (isFocused || isFocusedTag) {
      return;
    }

    handleBlurCurrentTag();
  }, [isClickAway]);

  const handleModal = () => {
    setIsModalVisible(false);
    setIsLoginModalVisible(false);
  };

  const handleSignUpModal = () => {
    setIsSignUpModalVisible(false);
  };

  const handleClickGithubLogin = () => {
    const goGithubLogin = async () => {
      try {
        const url: AxiosResponse = await axios.get(`${process.env.END_POINT}api/oauth/login`);
        sessionStorage.setItem('destination', `${location?.pathname}${location?.search}`);
        // navigate(`/${url.data}`, { state: { previousPathname: pathname } });
        window.location.href = url.data;
        // localStorage.setItem('previousePathname', pathname);
      } catch (error: any) {
        if (error.response.status === 401) {
          logout();
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

    // navigate(`${NEW_STUDY_PATH}`, { state: { previousPathname: `${location?.pathname}${location?.search}` } });
    if (isLoginModalVisible) {
      sessionStorage.setItem('destination', NEW_STUDY_PATH);
    } else if (reactionModalInfo.isVisible) {
      sessionStorage.setItem('destination', `${STUDY_PATH}/${reactionModalInfo.studyId}`);
    }

    goGithubLogin();
  };

  useEffect(() => {
    const isLogined = cookies.get('logined') === 'true';
    if (!isLogined && (isLoginModalVisible || reactionModalInfo.isVisible)) {
      setIsModalVisible(true);
    }
  }, [isLoginModalVisible, reactionModalInfo.isVisible, cookies.get('logined')]);

  const handleClickCancel = () => {
    setIsModalVisible(false);
    setIsLoginModalVisible(false);
    setIsSignUpModalVisible(false);
    setReactionModalInfo({
      studyId: reactionModalInfo.studyId,
      isVisible: false,
    });
  };

  const handleClickNotification = () => {
    setIsNotificationVisible(!isNotificationVisible);
    const getNotifications = async () => {
      const data = {
        memberId: userInfos.memberId,
      };

      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();
      // const body = token ? { headers } : {};

      const url = 'api/notifications/my-notifications';

      try {
        // const response = await axios.get(`${process.env.END_POINT}${url}?page=0&size=5`, { headers });

        const response = await axios({
          method: 'get',
          url: `${process.env.END_POINT}${url}?page=${contentPageIdx}&size=5`,
          headers: token ? headers : {},
        });
        // headers,
        //   setContentPageIdx(contentPageIdx + 1);
        type apiNotificationKeyType = 'notificationId' | 'message' | 'sourceProfileImageUrl' | 'notificationCheck' | 'createdAt';

        type apiNotificationType = Record<apiNotificationKeyType, any>;
        const apiNotifications: apiNotificationType[] = response.data.content;
        const newNotifications = apiNotifications.map(({ notificationId, message, sourceProfileImageUrl, notificationCheck, createdAt }) => ({
          id: notificationId,
          content: message,
          isRead: notificationCheck !== 'UN_READ',
          profileUrl: sourceProfileImageUrl,
          time: timeForToday(createdAt),
        }));

        const hasAlarm = newNotifications.find(({ isRead }) => !isRead);

        const newUserInfos = {
          memberId: userInfos.memberId,
          nickName: userInfos.nickName,
          notification: hasAlarm,
          profileImage: userInfos.profileImage,
        };

        setUserInfos(newUserInfos);
        const notificationCookie = hasAlarm ? 'true' : 'false';
        const encodedNotificationRead = encrypt(`${notificationCookie}`, `${process.env.SECURE_ALARM_KEY}`);
        // cookies.remove(`SEC_1RATI5`, {
        //   path: '/',
        // });
        cookies.set(`SEC_1RATI5`, encodedNotificationRead, {
          path: '/',
        });
        setNotifications(newNotifications);

        const { sorted, requestPageSize, currentPageNumber, totalElementSize, firstPage, last, empty } = response.data.content;

        setContentControls({
          sorted,
          requestPageSize,
          currentPageNumber,
          totalElementSize: Math.ceil(totalElementSize / requestPageSize),
          firstPage,
          last,
          empty,
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
    };

    if (isNotificationVisible) {
      return;
    }
    setIsNotifiationLoading(true);
    getNotifications();
    setIsNotifiationLoading(false);
  };
  const [isClosed, setIsClosed] = useState(true);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const handleClickDetail = () => {
    setIsClosed(!isClosed);
  };

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const targetElement = ref.current;
    if (targetElement?.offsetHeight < targetElement.scrollHeight) {
      setIsOverflowing(true);
    }
  }, []);

  // useEffect(() => {
  //   const getNotifications = async () => {
  //     const token = localStorage.getItem('accessToken');
  //     const refreshToken = cookies.get(`SEC_EKIL15`);
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //       RefreshToken: `Bearer ${refreshToken}`,
  //       'Content-Type': 'application/json',
  //     };
  //     const body = token ? { headers, withCredentials: true } : { withCredentials: true };
  //     const url = 'api/notifications/my-notifications';
  //     const response = await axios.get(`${process.env.END_POINT}${url}`, body);
  //   };
  //   getNotifications();
  // }, []);

  const handleClickRead = (selectedId: number) => {
    const updateRead = async () => {
      const targetNotification = notifications.find(({ id }) => id === selectedId);
      if (!targetNotification) {
        return;
      }

      if (targetNotification.isRead) {
        return;
      }

      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();

      // const blogUrl = 'www.tistory.com';
      const data = {
        memberId: userInfos.memberId,
        notificationId: selectedId,
        notificationReadStatus: 'READ',
      };

      try {
        const body = token ? { headers } : {};

        const response = await axios.put(`${process.env.END_POINT}api/notifications`, data, body);
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
    updateRead();
    const targetNotification = notifications.find(({ id }) => id === selectedId);
    if (!targetNotification) {
      return;
    }
    const remainNotifications = notifications.filter(({ id }) => id !== selectedId);
    // if (remainNotifications.length === 0) {
    //   const newUserInfos = {
    //     memberId: userInfos.memberId,
    //     nickName: userInfos.nickName,
    //     notification: true,
    //     profileImage: userInfos.profileImage,
    //   };

    //   setUserInfos(newUserInfos);
    //   const encodedNotificationRead = encrypt('true', `${process.env.SECURE_ALARM_KEY}`);

    //   cookies.remove(`${process.env.SECURE_ALARM_KEY}`);
    //   cookies.set(`${process.env.SECURE_ALARM_KEY}`, encodedNotificationRead);
    //   return;
    // }
    const newNotifications = [
      ...remainNotifications,
      {
        id: targetNotification.id,
        content: targetNotification.content,
        isRead: true,
        profileUrl: targetNotification.profileUrl,
        time: targetNotification.time,
      },
    ];
    newNotifications.sort((notificationA, notificationsB) => notificationA.id - notificationsB.id);
    setNotifications(newNotifications);
    const hasToRead = newNotifications.find((notification) => notification.isRead === false);
    const newNotification = hasToRead;
    const notificationCookie = hasToRead ? 'true' : 'false';
    // if (hasToRead) {
    const newUserInfos = {
      memberId: userInfos.memberId,
      nickName: userInfos.nickName,
      notification: newNotification,
      profileImage: userInfos.profileImage,
    };

    setUserInfos(newUserInfos);
    const encodedNotificationRead = encrypt(`${notificationCookie}`, `${process.env.SECURE_ALARM_KEY}`);

    // cookies.remove(`SEC_3BKIF3`, {
    //   path: '/',
    // });
    cookies.set(`SEC_1RATI5`, encodedNotificationRead, {
      path: '/',
    });

    // setIsReadAlarms(false);
    // const newUserInfos = {
    //   memberId: userInfos.memberId,
    //   nickName: userInfos.nickName,
    //   notification: true,
    //   profileImage: userInfos.profileImage,
    // };

    // setUserInfos(newUserInfos);
    // const encodedNotificationRead = encrypt('false', `${process.env.SECURE_ALARM_KEY}`);
    //   return;
    // }
    // setIsReadAlarms(true);
  };

  const handleClickSignUp = () => {
    setIsSignUpModalVisible(true);
    setIsModalVisible(false);
    setIsLoginModalVisible(false);
    setReactionModalInfo({
      studyId: reactionModalInfo.studyId,
      isVisible: false,
    });
  };

  const handleClickSignUpModalButton = () => {
    const SIGN_UP_URL = 'https://github.com/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home';
    window.location.href = SIGN_UP_URL;
  };

  const handleClickSearch = () => {
    const search = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();

      const params = {
        title: decodeURI(searchKeyword) || '',
      };

      const body = token ? { params, headers } : { params };
      try {
        const response = await axios.get(`${process.env.END_POINT}api/studies/searching`, body);

        type dataKeyType =
          | 'studyId'
          | 'title'
          | 'content'
          | 'studyOrganizer'
          | 'studyStatus'
          | 'hashTags'
          | 'currentStudyMemberCount'
          | 'district'
          | 'meeting'
          | 'commentCount'
          | 'viewCount'
          | 'likeCount'
          | 'createdAt'
          | 'maxStudyMemberCount'
          | 'startDate'
          | 'endDate';
        type dataType = Record<dataKeyType, any>;
        const targetDatas: dataType[] = response.data.pages.page || [];
        const currentPostings = targetDatas.map((targetData) => {
          const { studyId, title, content, studyOrganizer, studyStatus, meeting, commentCount, viewCount, likeCount, createdAt, maxStudyMemberCount, currentStudyMemberCount, startDate } = targetData;
          // eslint-disable-next-line prefer-destructuring
          // type tagKeyType = 'hashTag'
          // type tagType = Record<tagKeyType, any>;
          // const hashTags: tagType[] = response.data.hashTags || [];

          // // eslint-disable-next-line no-shadow
          // const targetTags = hashTags?.filter((hashTag) => hashTag.studyId === studyId);
          // const currentTags = targetTags?.map((hashTag) => ({
          //   id: hashTag.hashTagId,
          //   content: `#${hashTag.tagName}`,
          // }));
          type tagKeyType = 'studyId' | 'tagName' | 'hashTagId';
          type tagType = Record<tagKeyType, any>;

          const apiTags = response.data.hashTags;
          const hashTags: tagType[] = apiTags || [];
          const targetTags = hashTags?.filter((hashTag) => hashTag.studyId === studyId);
          const currentTags = targetTags?.map((hashTag) => ({
            id: hashTag.hashTagId,
            content: `#${hashTag.tagName}`,
          }));

          return {
            id: studyId,
            nickName: studyOrganizer,
            title,
            time: timeForToday(createdAt),
            content,
            tags: currentTags,
            infos: [
              {
                id: 1,
                type: 'start',
                content: `${startDate}`,
              },
              {
                id: 2,
                type: 'studyWay',
                content: meeting,
              },
              {
                id: 3,
                type: 'limit',
                content: `최대 ${maxStudyMemberCount}명`,
              },
            ],
            commentCount,
            viewCount,
            likeCount,
            isRecruiting: studyStatus === 'RECRUITING',
            createdDate: createdAt,
            currentStudyMemberCount,
            maxStudyMemberCount,
          };
        });
        setStudies(currentPostings);
        const { sorted, requestPageSize, currentPageNumber, totalElementSize, firstPage, last, empty } = response.data.pages;
        // ContentControls
        navigate(`${SEARCHING_PATH}?title=${searchKeyword}`, {
          state: {
            isSearched: true,
            contentControls: {
              sorted,
              requestPageSize,
              currentPageNumber,
              totalElementSize: Math.ceil(totalElementSize / requestPageSize),
              firstPage,
              last,
              empty,
            },
          },
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
    };

    // if (searchKeyword === '') {
    //   navigate(`${MAIN_PATH}`);
    //   // navigate(`${MAIN_PATH}?page=1`);
    //   return;
    // }
    const transferedEncodeUri = encodeURI(searchKeyword)
      .split('%20')
      .map((keyword) => keyword.replace('', '+'));
    transferedEncodeUri.pop();

    const isEmpty = searchKeyword && encodeURI(searchKeyword).split('%20').length - 1 === searchKeyword.length;

    // if (!searchKeyword || isEmpty) {
    //   setIsSearchModalVisible(true);

    // }
    if (!searchKeyword) {
      // navigate(`${SEARCHING_PATH}?title=${searchKeyword}`, { state: { isSearched: true, isSearchModalVisible: true } });
      setIsSearchModalVisible(true);
      return;
    }

    if (isEmpty) {
      setIsSearchModalVisible(true);
      // navigate(`${SEARCHING_PATH}?title=${transferedEncodeUri.join('')}`, { state: { isSearched: true, isSearchModalVisible: true } });
      return;
    }

    // search();

    navigate(`${SEARCHING_PATH}?title=${searchKeyword}`, {
      state: {
        isSearched: true,
        // contentControls: {
        //   sorted,
        //   requestPageSize,
        //   currentPageNumber,
        //   totalElementSize: Math.ceil(totalElementSize / requestPageSize),
        //   firstPage,
        //   last,
        //   empty,
        // },
      },
    });
  };

  // eslint-disable-next-line no-unused-vars
  const handleKeyPressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClickSearch();
    }
  };

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    setSearchKeyword(keyword);
  };

  const handleClickPageButton = (pageIndex: number) => {
    setCurrentPageIndex(pageIndex);
  };

  const handleClickPrevPage = () => {
    setCurrentPageIndex(currentPageIndex - 1);
  };

  const handleClickNextPage = () => {
    setCurrentPageIndex(currentPageIndex + 1);
  };

  const { isClicked, handleClick } = useMouse(false);

  useEffect(() => {
    // if (!isModalVisible) {
    //   return;
    // }
    if (isLoginClickAway) {
      // handleClick();
      setIsModalVisible(false);
      setIsLoginModalVisible(false);
      setReactionModalInfo({
        studyId: reactionModalInfo.studyId,
        isVisible: false,
      });
    }
  }, [isLoginClickAway]);

  useEffect(() => {
    // if (!isModalVisible) {
    //   return;
    // }
    if (isSignUpClickAway) {
      // handleClick();
      setIsSignUpModalVisible(false);
    }
  }, [isSignUpClickAway]);

  const handleClickCancelModal = () => {
    setIsSearchModalVisible(false);
  };

  useEffect(() => {
    if (!isSearchModalVisible) {
      return;
    }
    setTimeout(() => {
      setIsSearchModalVisible(false);
    }, 2500);
  }, [isSearchModalVisible]);

  useEffect(() => {
    if (!isAlertModalVisible) {
      return;
    }
    setTimeout(() => {
      setIsAlertModalVisible(false);
    }, 2500);
  }, [isAlertModalVisible]);

  return (
    <>
      <S.Container className={className} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <S.FlexColumn>
          <S.FlexBetween>
            <div style={{ display: 'flex', margin: '0 32px 0 0' }}>
              <S.CustomLogo handleClick={goHome} />
              <S.CustomTabsList tabs={tabs} handleClick={handleClickTab} />
            </div>
            <S.CustomSearchArea
              id="header-search"
              handleFocusDefault={handleFocusDefault}
              handleBlur={handleBlur}
              isFocusedTag={isFocusedTag}
              handleChangeValue={handleChangeValue}
              handleClickSearch={handleClickSearch}
              handleKeyPress={handleKeyPressEnter}
            />
            {/* <S.CustomInput
              id="header-search"
              size="smallSmall"
              handleFocusDefault={handleFocusDefault}
              handleChangeValue={handleChangeValue}
              handleKeyPress={handleKeyPressEnter}
            />
            <S.CustomButton size="xsmall" handleClick={handleClickSearch}>
              검색
            </S.CustomButton> */}
            <S.Flex>
              <S.CustomIconBasicButton handleClick={goHome}>
                <Icon mode="home" />
              </S.CustomIconBasicButton>
              {/* <Icon mode="unReadAlert" color="accent" /> */}
              {userInfos.memberId ? (
                <>
                  <S.CustomNotificationDropDown type={type} selectTitle="" optionsWidth="472px" options={options} handleSelect={handleSelect}>
                    {/* <S.IconButton size="tiny" handleClick={handleClickNotification}> */}
                    {/* <Icon mode="notification" /> */}
                    <BasicButton handleClick={handleClickNotification}>{userInfos.notification ? <Icon mode="unReadAlert" color="accent" /> : <Icon mode="readAlert" />}</BasicButton>
                    {/* <BasicButton handleClick={handleClickNotification}>{userInfos.notification ? <img src={DefaultBell} alt="default bell" /> : <img src={Bell} alt="bell" />}</BasicButton> */}
                    {/* </S.IconButton> */}
                    <S.NotificationBar>
                      {isNotifationLoading ? (
                        <S.LoadingContainer>
                          <LoadingSpinner size="medium" />
                        </S.LoadingContainer>
                      ) : (
                        <ul style={{ width: '100%' }}>
                          {contentControls?.empty ? (
                            <S.FlexBox>
                              <S.EmptyMsg>알림이 없습니다.</S.EmptyMsg>
                            </S.FlexBox>
                          ) : (
                            notifications.map(({ id, content, isRead, profileUrl, time }) => (
                              <S.NewNotification key={`header-notification-${id}`} isRead={isRead} onClick={() => handleClickRead(id)}>
                                <Avatar src={profileUrl} alt="notification sender profile" size="xsmall" />
                                <div style={{ display: 'flex', flexDirection: 'column', width: '640px', margin: '0 0 0 8px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <S.Content ref={ref} isClosed={isClosed} clamp={3}>
                                      {content}
                                    </S.Content>
                                    {isOverflowing && (
                                      <TextButton mode="default" handleClick={handleClickDetail}>
                                        {isClosed ? '자세히 보기' : '간략히'}
                                      </TextButton>
                                    )}
                                  </div>
                                  <div style={{ display: 'flex', margin: '8px 0 0 0' }}>
                                    {/* <S.Info>아이디</S.Info> */}
                                    <S.Info>{time}</S.Info>
                                  </div>
                                </div>
                              </S.NewNotification>
                            ))
                          )}
                          {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '16px 0' }}>
                            <S.CustomBasicButton>◁</S.CustomBasicButton>
                            <BasicButton>▷</BasicButton>
                          </div> */}
                          {!contentControls?.empty && (
                            <S.CustomPagination
                              showingPageButtonNum={INITIAL_BUTTON_NUM}
                              totalPageNum={INITIAL_BUTTON_NUM}
                              selectedPage={INITIAL_BUTTON_NUM}
                              handleClickPageButton={handleClickPageButton}
                              handleClickLeftButton={handleClickPrevPage}
                              handleClickRightButton={handleClickNextPage}
                            />
                          )}
                        </ul>
                      )}
                    </S.NotificationBar>
                  </S.CustomNotificationDropDown>
                  {/* <S.IconButton size="tiny" handleClick={handleClickNotification}>
                    <Icon mode="notification" />
                  </S.IconButton> */}
                  <S.CustomAvatorDropDown type={type} selectTitle="" optionsWidth="100px" options={options} handleSelect={handleSelect}>
                    <Avator src={userInfos.profileImage} alt={alt} size="xxsmall" />
                  </S.CustomAvatorDropDown>
                </>
              ) : (
                <>
                  <S.LoginButton className="login" size="xsmall" handleClick={handleClickLogin}>
                    로그인
                  </S.LoginButton>
                  <S.CustomButton className="signUp" mode="accent" size="xsmall" handleClick={handleClickSignUp}>
                    회원가입
                  </S.CustomButton>
                </>
              )}
            </S.Flex>
          </S.FlexBetween>
          {isFocused || isFocusedTag ? (
            // TODO: 추후 도입
            // (
            //   <div ref={target} onFocus={handleFocus}>
            //     <S.CustomSearchTag id="header-search-tag" mode="tag" size="medium" />
            //   </div>
            // )
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <></>
          ) : (
            // isMouseOvered && (
            //   <S.SearchTagContainer>
            //     <SearchTag id="header-search-default-tag" mode="default" tags={tags} />
            //   </S.SearchTagContainer>
            // )
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <></>
          )}
        </S.FlexColumn>
      </S.Container>
      <Portal>
        {isModalVisible && (
          <Modal ref={loginRef}>
            <SingleButtonModalArea size="xlarge" handleClick={handleClickGithubLogin} handleClickCancel={handleClickCancel}>
              {LOGIN_TITLE}
              <ArticleContent items={loginExplains} />
              <ButtonContent content={LOGIN_BUTTON_CONTENT} />
            </SingleButtonModalArea>
          </Modal>
        )}
      </Portal>
      <Portal>
        {isSignUpModalVisible && (
          <Modal ref={signUpRef}>
            <SingleButtonModalArea size="large" handleClick={handleClickGithubLogin} handleClickCancel={handleClickCancel}>
              {LOGIN_TITLE}
              <ArticleContent items={signUpExplains} />
              <ButtonContent content={SIGN_UP_BUTTON_CONTENT} />
            </SingleButtonModalArea>
          </Modal>
        )}
      </Portal>
      {/* <S.ModalContainer> */}
      {/* <Portal>
        {isLogoutAlertVisible && (
          <Modal position="right" ref={modalRef}>
            <AlertModalArea size="small" handleClickCancel={handleClickCancel}>
              로그아웃되었습니다.
            </AlertModalArea>
            <S.ProgressContainer>
              <S.ProgressBar />
            </S.ProgressContainer>
          </Modal>
        )}
      </Portal> */}
      <Portal>
        {isSearchModalVisible && (
          <Modal position="right" ref={alertModalRef}>
            <AlertModalArea size="small" handleClickCancel={handleClickCancelModal}>
              검색어를 입력해주세요.
            </AlertModalArea>
            <S.ProgressContainer>
              <S.ProgressBar />
            </S.ProgressContainer>
          </Modal>
        )}
      </Portal>
      <Portal>
        {isAlertModalVisible && (
          <Modal position="right" ref={alertModalRef}>
            <AlertModalArea size="small" handleClickCancel={handleClickCancelModal}>
              로그인이 필요합니다.
            </AlertModalArea>
            <S.ProgressContainer>
              <S.ProgressBar />
            </S.ProgressContainer>
          </Modal>
        )}
      </Portal>
      {/* </S.ModalContainer> */}
    </>
  );
};

export default Header;
