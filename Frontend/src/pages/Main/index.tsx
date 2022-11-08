/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import Layout from '@components/Layout';
import Posting from '@components/Posting';
// import { progressTabs, tabs } from '@components/mocks';
import * as S from '@pages/Main/styled';
import { useEffect, useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import studiesState from '@store/Studies';
import axios from 'axios';
import Button from '@components/common/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import userInfosState from '@store/UserInfos';
import useLogOut from '@hooks/useLogout';
import timeForToday from '@pages/Detail/util';
import { Cookies } from 'react-cookie';
import Modal from '@components/Modal';
import Portal from '@components/Modal/Portal';
import AlertModalArea from '@components/Modal/AlertModalArea';
import isLoginModalVisibleState from '@store/LoginModal';
import { getHeaders } from '@pages/util';
import { SEARCHING_PATH, TAG_SEARCHING_PATH, FORBIDDEN_PATH, ETC_PATH, LOGIN_PATH, NEW_STUDY_PATH, STUDY_PATH, LANDING_PATH, SERVER_ERROR_PATH, MAIN_PATH } from '../../constants/route';

const DEFAULT_SIZE_NUM = 10;
const DEFAULT_SHOWING_PAGE_NUM = 5;

const Main = () => {
  const [studies, setStudies] = useRecoilState(studiesState);
  const [isLoginModalVisible, setIsLoginModalVisible] = useRecoilState(isLoginModalVisibleState);
  const [userInfos] = useRecoilState(userInfosState);
  // const [selectedTabId, setSelectedTabId] = useState(0);
  // const [selectedProgressTabId, setSelectedProgressTabId] = useState(0);
  const location = useLocation();
  const initialPageIndex = 1;

  // initialPageIndex ||
  // (location?.search.includes('tagName') && initialPageIndex) ||
  // Number(sessionStorage.getItem('page')) ||
  const queryPage = Number(location?.search?.split('page=')[1]?.split('&')[0]);
  // Number(location?.search?.split('page=')[1]?.split('&')[0]) + initialPageIndex

  // queryPage
  // ? queryPage
  // : 0
  const [currentPageIndex, setCurrentPageIndex] = useState(
    // initialPageIndex ||
    (location?.search.includes('title') && initialPageIndex) ||
      (location?.search.includes('tagName') && initialPageIndex) ||
      Number(sessionStorage.getItem('page')) ||
      Number(location?.search?.split('page=')[1]?.split('&')[0])
  );

  const [showingPageIndex, setShowingPageIndex] = useState(
    // initialPageIndex ||
    (location?.search.includes('tagName') && initialPageIndex) || sessionStorage.getItem('page') || location?.search?.split('page=')[1]?.split('&')[0]
  );
  type CotnentControlsKeyType = 'sorted' | 'requestPageSize' | 'currentPageNumber' | 'totalElementSize' | 'firstPage' | 'last' | 'empty';
  type CotnentControlsType = Record<CotnentControlsKeyType, any>;
  const [contentControls, setContentControls] = useState<CotnentControlsType>();
  const [isStudyLoading, setIsStudyLoading] = useState(true);
  type topTagKeyType = 'hashTagId' | 'tagName';
  type topTagType = Record<topTagKeyType, any>;
  type tagKeyType = 'studyId' | 'tagName' | 'hashTagId';
  type tagType = Record<tagKeyType, any>;
  type hashTagKeyType = 'id' | 'content';
  type hashTagType = Record<hashTagKeyType, any>;
  const [tags, setTags] = useState<hashTagType[]>([]);
  const navigate = useNavigate();

  const { logout } = useLogOut();
  const cookies = new Cookies();
  type stateKeyType = 'isSearched' | 'contentControls' | 'isLogouted' | 'hasPage' | 'isSearchModalVisible';
  type stateType = Record<stateKeyType, any>;
  const state = location.state as stateType;
  const [isLogoutAlertVisible, setIsLogoutAlertVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [hasToSavePage, setHasToSavePage] = useState(false);
  const [searchedTag, setSearchedTag] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [showingPageButtonNum, setShowingPageButtonNum] = useState(0);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);
  const searchModalRef = useRef<HTMLDivElement>(null);

  // useEffect(
  //   () => () => {
  //     sessionStorage.removeItem('page');
  //   },
  //   []
  // );

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
    sessionStorage.removeItem('tag');
  }, []);

  const search = async () => {
    const searchKeyword = location?.search?.split('title=')[1];

    if (!searchKeyword) {
      return;
    }

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

        // console.log('hashTags');
        // console.log(hashTags);
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
      setContentControls({
        sorted,
        requestPageSize,
        currentPageNumber,
        totalElementSize: Math.ceil(totalElementSize / requestPageSize),
        firstPage,
        last,
        empty,
      });
      // ContentControls
      // navigate(`${SEARCHING_PATH}?title=${searchKeyword}`, {
      //   state: {
      //     isSearched: true,
      //     contentControls: {
      //       sorted,
      //       requestPageSize,
      //       currentPageNumber,
      //       totalElementSize: Math.ceil(totalElementSize / requestPageSize),
      //       firstPage,
      //       last,
      //       empty,
      //     },
      //   },
      // });
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

  const searchTagResult = async (tag: string) => {
    const token = localStorage.getItem('accessToken');
    const refreshToken = cookies.get(`SEC_EKIL15`);
    const headers = getHeaders();

    const params = {
      tagName: decodeURI(tag),
    };
    const body = token ? { params, headers } : { params };

    try {
      const response = await axios.get(`${process.env.END_POINT}api/studies/tag-searching`, body);

      // TODO: 스터디 set 중복 제거
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
      const { sorted, requestPageSize, currentPageNumber, totalElementSize, firstPage, last, empty } = response.data.pages;

      // setCurrentPageIndex(response.data.pages.currentPageNumber);
      setContentControls({
        sorted,
        requestPageSize,
        currentPageNumber,
        totalElementSize: Math.ceil(totalElementSize / requestPageSize),
        firstPage,
        last,
        empty,
      });
      const apiTags = response.data.hashTags;
      // type tagKeyType = 'studyId' | 'tagName';
      // type tagType = Record<tagKeyType, any>;

      const currentPostings = targetDatas.map((targetData) => {
        const { studyId, title, content, studyOrganizer, studyStatus, meeting, commentCount, viewCount, likeCount, createdAt, maxStudyMemberCount, currentStudyMemberCount, startDate } = targetData;
        // eslint-disable-next-line prefer-destructuring
        const hashTags: tagType[] = apiTags || [];

        // eslint-disable-next-line no-shadow
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
    } catch (error: any) {
      if (error.response.status === 401) {
        logout();
        navigate(`${LOGIN_PATH}`, { state: { previousPathname: location.pathname } });
        return;
      }

      if (error.response.status === 404) {
        navigate(`${LANDING_PATH}`);
        return;
      }

      if (error.response.status === 500) {
        navigate(`${SERVER_ERROR_PATH}`);
      }
    }
  };

  useEffect(() => {
    const hasTagName = location?.search.includes('tagName');
    if (!hasTagName) {
      return;
    }

    if (!location?.search) {
      return;
    }
    const tagName = decodeURI(location?.search).split('tagName=')[1];

    if (tagName) {
      sessionStorage.setItem('tag', `${tagName}`);
    }
  }, []);
  // useEffect(() => {
  //   console.log('location?.search');
  //   setIsStudyLoading(true);
  //   searchTagResult();
  //   setIsStudyLoading(false);
  // }, [serachedTag]);

  useEffect(() => {
    const tag = sessionStorage.getItem('tag');
    if (tag) {
      setIsStudyLoading(true);
      searchTagResult(tag);
      // sessionStorage.removeItem('tag');
      setIsStudyLoading(false);
    }

    // return () => {
    //   if (tag) {
    //     sessionStorage.removeItem('tag');
    //   }
    // };
  }, []);

  // useEffect(() => {
  //   const title = sessionStorage.getItem('title');
  //   if (title) {
  //     setIsStudyLoading(true);
  //     search();
  //     setIsStudyLoading(false);
  //   }

  //   // return () => {
  //   //   if (tag) {
  //   //     sessionStorage.removeItem('tag');
  //   //   }
  //   // };
  // }, [sessionStorage.getItem('title')]);

  // useEffect(() => {
  //   const title = decodeURI(location?.search).split('title=')[1];
  //   // window.location.href = `${SEARCHING_PATH}?title=${title}`;
  //   console.log('title');
  //   console.log(location?.search);
  //   navigate(`${SEARCHING_PATH}?title=${title}`);
  //   // window.location.href = `${SEARCHING_PATH}?title=${title}`;
  //   if (title) {
  //     // navigate(`${SEARCHING_PATH}?title=${title}`);
  //     setIsStudyLoading(true);
  //     search();
  //     setIsStudyLoading(false);
  //   }

  //   // return () => {
  //   //   if (tag) {
  //   //     sessionStorage.removeItem('tag');
  //   //   }
  //   // };
  // }, [location?.search]);

  useEffect(
    () => () => {
      const tag = sessionStorage.getItem('tag');
      if (tag) {
        sessionStorage.removeItem('tag');
      }
    },
    []
  );

  useEffect(
    () => () => {
      const page = sessionStorage.getItem('page');
      // if (!state?.hasPage) {
      if (!page) {
        sessionStorage.removeItem('page');
      }
    },
    []
  );

  // TODO : 로그아웃 모달
  // useEffect(() => {
  //   if (state?.isLogouted) {
  //     setIsLogoutAlertVisible(true);
  //   }
  // }, [state?.isLogouted]);

  const handleClickPageButton = (pageIndex: number) => {
    setCurrentPageIndex(pageIndex);
    setShowingPageIndex(`${pageIndex}`);
  };

  const handleClickPrevPage = () => {
    setCurrentPageIndex(currentPageIndex - 1);
    setShowingPageIndex(`${currentPageIndex - 1}`);
  };

  const handleClickNextPage = () => {
    setCurrentPageIndex(currentPageIndex + 1);
    setShowingPageIndex(`${currentPageIndex + 1}`);
  };

  useEffect(() => {
    const getTopTags = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();

      try {
        const body = token ? { headers } : {};
        const response = await axios.get(`${process.env.END_POINT}api/hashtags/top-searched-hashtags`, body);
        const apiTags: topTagType[] = response.data.hashTagResponses;
        const newTags = apiTags.map(({ hashTagId, tagName }) => ({
          id: hashTagId,
          content: tagName,
        }));
        setTags(newTags);
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

    getTopTags();
  }, []);
  const getStudy = async () => {
    if (!currentPageIndex) {
      return;
    }

    const searchKeyword = location?.search?.split('title=')[1];
    if (searchKeyword) {
      return;
    }

    const sizeNum = location?.search?.split('size=')[1];
    const size = sizeNum || DEFAULT_SIZE_NUM;

    const url = `api/studies?page=${currentPageIndex - 1}&size=${size}`;
    try {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();

      const body = token ? { headers } : {};

      const response = await axios.get(`${process.env.END_POINT}${url}`, body);

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
      const targetDatas: dataType[] = response.data.studies.page || [];
      const { sorted, requestPageSize, currentPageNumber, totalElementSize, firstPage, last, empty } = response.data.studies;

      setContentControls(() => ({
        sorted,
        requestPageSize,
        currentPageNumber,
        totalElementSize: Math.ceil(totalElementSize / requestPageSize),
        firstPage,
        last,
        empty,
      }));
      const apiTags = response.data.hashTags;
      // type tagKeyType = 'studyId' | 'tagName';
      // type tagType = Record<tagKeyType, any>;

      const currentPostings = targetDatas.map((targetData) => {
        const { studyId, title, content, studyOrganizer, studyStatus, meeting, commentCount, viewCount, likeCount, createdAt, maxStudyMemberCount, currentStudyMemberCount, startDate } = targetData;
        // eslint-disable-next-line prefer-destructuring
        const hashTags: tagType[] = apiTags || [];
        // eslint-disable-next-line no-shadow
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

  // useEffect(() => {
  //   const pageIndex = Number(location?.search.split('page=')[1].split('&')[0]);
  //   console.log('pageIndex');
  //   console.log(location?.search.split('page='));
  //   console.log(pageIndex);
  //   if (pageIndex > 0) {
  //     setCurrentPageIndex(() => pageIndex + 1);
  //   }
  // }, [location.search]);

  useEffect(() => {
    if (state?.isSearchModalVisible) {
      setIsSearchModalVisible(true);
      setIsSearchEmpty(true);

      // navigate(`${location?.pathname}${location?.search}`);
      return;
    }
    setIsSearchModalVisible(false);
    setIsSearchEmpty(false);
    if (state?.isSearched) {
      setIsStudyLoading(false);
      setContentControls(state?.contentControls);
      // search();
      navigate(`${location?.pathname}${location?.search}`);
      return;
    }

    const tag = sessionStorage.getItem('tag');
    // setIsStudyLoading(true);
    // getStudy();

    // setIsStudyLoading(false);
    // }, [currentPageIndex]);
  }, []);

  useEffect(() => {
    // const currentPostings = studies.map(({id}) => {
    // const response = await axios.get(`${process.env.END_POINT}api/tags/study/${id}`, { headers });
    // console.log(response);
    // }
    // const studiesKeys = studies.map((study) => Object.keys(study));
    // const allIds = studiesKeys.map((id) => id);
    // const allIds = [];
    // const allUrls: string[] = [];
    // const url = `${process.env.END_POINT}api/tags/study`;
    // // eslint-disable-next-line no-restricted-syntax
    // for (const study of studies) {
    //   allIds.push(study.id);
    //   allUrls.push(`${process.env.END_POINT}api/tags/study/${study.id}`);
    // }
    // console.log('allIds');
    // console.log(allIds);
    // // const getAllTags = () => Promise.all();
    // // eslint-disable-next-line no-shadow
    // const token = localStorage.getItem('accessToken');
    // const refreshToken = cookies.get(`SEC_EKIL15`);
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    //   RefreshToken: `Bearer ${refreshToken}`,
    //   'Content-Type': 'application/json',
    // };
    // // eslint-disable-next-line no-shadow
    // const fetchData = async (url: string) =>
    //   axios
    //     .get(url, { headers })
    //     .then((response) => response)
    //     .catch((error) => {
    //       if (error.response.status === 401) {
    //         console.log('401 error');
    //         logout();
    //         navigate(`${LOGIN_PATH}`, { state: { previousPathname: location.pathname } });
    //       }
    //       if (error.response.status === 404) {
    //         navigate(`${LANDING_PATH}`);
    //       }
    //       if (error.response.status === 500) {
    //         navigate(`${SERVER_ERROR_PATH}`);
    //       }
    //     });
    // const getAllData = async () => Promise.all(allUrls.map(fetchData));
    // getAllData()
    //   .then((result) => {
    //     console.log('result====!!!!!!!!!!!!!!!');
    //     console.log(result);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // const token = localStorage.getItem('accessToken');
    // const refreshToken = cookies.get(`SEC_EKIL15`);
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    //   RefreshToken: `Bearer ${refreshToken}`,
    //   'Content-Type': 'application/json',
    // };
    // const getTag = async () => {
    //   const res = await axios.get(`${process.env.END_POINT}api/hashtags/study/${id}`, { headers });
    //   console.log('tag -=====');
    //   console.log(res);
    // };
    // getTag();
  }, []);

  // currentPageIndex, studies
  // const handleClickProgressTab = (selectedId: number) => {
  //   setSelectedProgressTabId(selectedId);
  // };

  // const handleClickTab = (selectedId: number) => {
  //   setSelectedTabId(selectedId);
  // };

  // let showingPageButtonNum = contentControls?.totalElementSize > DEFAULT_SHOWING_PAGE_NUM ? DEFAULT_SHOWING_PAGE_NUM : contentControls?.totalElementSize;
  // console.log('showingPageButtonNum');
  // console.log(showingPageButtonNum);
  // console.log(contentControls);
  // if (showingPageButtonNum === 0) {
  //   showingPageButtonNum = 1;
  // }
  useEffect(() => {
    let pageButtonNum = contentControls?.totalElementSize > DEFAULT_SHOWING_PAGE_NUM ? DEFAULT_SHOWING_PAGE_NUM : contentControls?.totalElementSize;
    if (pageButtonNum === 0) {
      pageButtonNum = 1;
    }

    setShowingPageButtonNum(pageButtonNum);
  }, [contentControls?.totalElementSize]);

  const ITEM_NUM = 3;
  const skeletonItems = Array.from({ length: ITEM_NUM }, (_, index) => index + 1);

  const handleClickTag = (selectedTag: string) => {
    setSearchedTag(() => selectedTag);
    sessionStorage.setItem('tag', `${selectedTag}`);
    window.location.href = `${TAG_SEARCHING_PATH}?tagName=${selectedTag}`;
    // navigate(`${MAIN_PATH}?tagName=${selectedTag}`);
  };

  const handleModal = () => {
    setIsLogoutAlertVisible(false);
  };

  const handleClickCancel = () => {
    setIsLogoutAlertVisible(false);
  };

  const handleClickSearchAll = () => {
    setIsStudyLoading(true);
    setCurrentPageIndex(() => initialPageIndex);
    getStudy();
    setIsStudyLoading(false);
  };

  const handleClickPosting = () => {
    const investigateAuthorization = async () => {
      const token = localStorage.getItem('accessToken');

      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();
      const url = NEW_STUDY_PATH.slice(1);
      const body = token
        ? {
            headers,
          }
        : {};
      try {
        const response = await axios.get(`${process.env.END_POINT}${url}`, body);
        // setIsLoading(false);
        // setIsAuthorizedPage(true);
        setIsLoginModalVisible(false);
        navigate(`${NEW_STUDY_PATH}`, { state: { previousPathname: `${location?.pathname}${location?.search}` } });
      } catch (error: any) {
        // setIsLoading(false);
        // setIsAuthorizedPage(false);
        if (error.response.status === 401) {
          logout();
          setIsLoginModalVisible(true);
          // navigate(`${NEW_STUDY_PATH}`, { state: { previousPathname: `${location?.pathname}${location?.search}` } });
          return;
        }

        if (error.response.status === 403) {
          navigate(`${FORBIDDEN_PATH}`);
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

    investigateAuthorization();
    // navigate(`${NEW_STUDY_PATH}`);
  };

  const handleClickCurrentPosting = () => {
    // sessionStorage.setItem('page', `${currentPageIndex}`);
    setHasToSavePage(() => true);
  };

  useEffect(() => {
    // if (state?.hasPage) {
    const previousPageIndex = Number(sessionStorage.getItem('page'));
    if (!previousPageIndex) {
      return;
    }
    setCurrentPageIndex(() => previousPageIndex);
    // setIsStudyLoading(true);
    // getStudy();
    // setIsStudyLoading(false);
    sessionStorage.removeItem('page');
    // }
  }, []);

  useEffect(() => {
    if (!location?.search) {
      return;
    }
    const searchKeyword = location?.search?.split('title=')[1];

    // const transferedEncodeUri = encodeURI(searchKeyword)
    //   .split('%20')
    //   .map((keyword) => keyword.replace('', '+'));
    // transferedEncodeUri.pop();

    if (!searchKeyword) {
      return;
    }
    const isEmpty = searchKeyword && searchKeyword.split('+').length - 1 === searchKeyword.length;
    // if (!searchKeyword || isEmpty) {
    //   navigate(`${location?.pathname}${location?.search}`);
    //   // navigate(`${SEARCHING_PATH}?title=${searchKeyword}`);
    //   // window.location.href = `${SEARCHING_PATH}?title=${searchKeyword}`;
    //   setIsSearchEmpty(true);
    //   // setIsSearchModalVisible(true);
    //   return;
    // }
    search();

    // if (document.referrer !== `${location?.pathname}${location?.search}`) {
    //   return;
    // }
    // search();
  }, [location?.search]);
  // TODO:
  useEffect(() => {
    // if (currentPageIndex === 0) {
    //   return;
    // }
    const searchTag = sessionStorage.getItem('tag');
    // if (location.pathname === MAIN_PATH) {
    // if (!currentPageIndex) {
    //   return;
    // }
    if (searchTag) {
      return;
    }

    const title = decodeURI(location?.search).split('title=')[1];
    const sizeNum = location?.search?.split('size=')[1];
    const sizeQueryString = sizeNum ? `&size=${sizeNum}` : `&size=${DEFAULT_SIZE_NUM}`;
    const pageQueryString = currentPageIndex ? `${MAIN_PATH}?page=${currentPageIndex}` : `${MAIN_PATH}?page=${initialPageIndex}`;
    const queryStrings = sizeQueryString ? `${pageQueryString}${sizeQueryString}` : pageQueryString;
    const showingURL = showingPageIndex ? queryStrings : `${MAIN_PATH}`;

    // TODO: 로직 분리
    if (state && state?.isSearched) {
      setIsStudyLoading(false);
      setContentControls(state?.contentControls);
      // search();
      navigate(`${location?.pathname}${location?.search}`);
      return;
    }

    const tag = sessionStorage.getItem('tag');
    if (tag) {
      return;
    }

    setIsStudyLoading(true);
    getStudy();

    setIsStudyLoading(false);
    //
    navigate(title ? `${SEARCHING_PATH}?title=${title}` : showingURL);
  }, [showingPageIndex, currentPageIndex]);

  useEffect(() => {
    if (!showingPageIndex) {
      // setShowingPageIndex(`1`);
    }
  }, []);

  useEffect(() => {
    if (!currentPageIndex) {
      setCurrentPageIndex(1);
    }
  }, [currentPageIndex]);

  useEffect(() => {
    if (!state) {
      return;
    }
    if (state?.isSearched) {
      // search();
    }
  }, [state]);
  // useEffect(
  //   () => () => {
  //     sessionStorage.setItem('page', `${currentPageIndex}`);
  //   },
  //   []
  // );

  useEffect(() => {
    setTimeout(() => {
      handleClickCancel();
    }, 2500);
  }, []);

  return (
    <Layout>
      <S.Container>
        <S.SearchTagContainer>
          <S.CustomSearchTag id="header-search-default-tag" mode="default" tags={tags} handleClick={handleClickTag} />
        </S.SearchTagContainer>
        <S.FlexBetween>
          <S.Category>전체 스터디</S.Category>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <S.CustomButton size="xsmall" handleClick={handleClickSearchAll}>
              목록조회
            </S.CustomButton>

            <S.CustomButton className="write" mode="accent" size="xsmall" handleClick={handleClickPosting}>
              글 작성
            </S.CustomButton>
          </div>
        </S.FlexBetween>
        <S.HorizontalDivider direction="horizontal" />
        {isStudyLoading ? (
          skeletonItems.map((index) => (
            <>
              <S.PostingItem key={`main-posting-${index}`}>
                <Posting
                  isLoading={isStudyLoading}
                  nickName=""
                  time=""
                  title=""
                  infos={[]}
                  viewCount={0}
                  likeCount={0}
                  commentCount={0}
                  isRecruiting={false}
                  content=""
                  tags={[]}
                  handleClick={() => {}}
                />
              </S.PostingItem>
              <S.HorizontalDivider direction="horizontal" />
            </>
          ))
        ) : (
          <S.PostingContainer>
            {!isSearchEmpty &&
              !contentControls?.empty &&
              currentPageIndex > 0 &&
              // eslint-disable-next-line no-shadow
              studies?.map(({ id, nickName, time, title, isRecruiting, infos, viewCount, likeCount, commentCount, content, tags }) => (
                <>
                  <S.CustomLink to={`${STUDY_PATH}/${id}`} state={{ pageIndex: currentPageIndex, from: `${MAIN_PATH}`, page: `${currentPageIndex}` }} onClick={handleClickCurrentPosting}>
                    <S.PostingItem key={`main-posting-${id}`}>
                      <Posting
                        nickName={nickName}
                        time={time}
                        title={title}
                        infos={infos}
                        viewCount={viewCount}
                        likeCount={likeCount}
                        commentCount={commentCount}
                        isRecruiting={isRecruiting}
                        content={content}
                        tags={tags}
                        handleClick={() => {}}
                      />
                    </S.PostingItem>
                  </S.CustomLink>
                  <S.HorizontalDivider direction="horizontal" />
                </>
              ))}
            {isSearchEmpty || contentControls?.empty || currentPageIndex <= 0 ? (
              <S.FlexBox>
                <S.EmptyMsg>글이 존재하지 않습니다.</S.EmptyMsg>
              </S.FlexBox>
            ) : (
              <S.CustomPagination
                showingPageButtonNum={showingPageButtonNum}
                totalPageNum={contentControls?.totalElementSize}
                selectedPage={currentPageIndex}
                handleClickPageButton={handleClickPageButton}
                handleClickLeftButton={handleClickPrevPage}
                handleClickRightButton={handleClickNextPage}
              />
            )}
          </S.PostingContainer>
        )}
      </S.Container>
      <Portal>
        {isSearchModalVisible && (
          <Modal position="right" ref={searchModalRef}>
            <AlertModalArea size="small" handleClickCancel={handleClickCancelModal}>
              검색어를 입력해주세요.
            </AlertModalArea>
            <S.ProgressContainer>
              <S.ProgressBar />
            </S.ProgressContainer>
          </Modal>
        )}
      </Portal>
      {/* <S.ModalContainer>
        <Portal>
          {isLogoutAlertVisible && (
            <Modal position="right" onClose={handleModal} ref={modalRef}>
              <AlertModalArea size="small" handleClickCancel={handleClickCancel}>
                로그아웃되었습니다.
              </AlertModalArea>
              <S.ProgressContainer>
                <S.ProgressBar />
              </S.ProgressContainer>
            </Modal>
          )}
        </Portal>
      </S.ModalContainer> */}
    </Layout>
  );
};

export default Main;
