/* eslint-disable no-shadow */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import Layout from '@components/Layout';
import DropDown from '@components/DropDown';
import { selectTitles, options } from '@components/DropDown/constants';
import { ChangeEvent, useEffect, useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import dropDownItemState from '@store/DropDownItem';
import tagsState from '@store/Tags';
import DateType from '@components/types/CalendarArea';
import { districts } from '@components/mocks';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Icon from '@components/common/Icon';
import CalendarArea from '@components/CalendarArea';
import useMouse from '@hooks/useMouse';
import studiesState from '@store/Studies';
import useLogOut from '@hooks/useLogout';
import AuthorizedLayout from '@components/AuthorizedLayout';
import keywordsState from '@store/Keyword';
import datesState from '@store/Dates';
import { Cookies } from 'react-cookie';
import LoadingSpinner from '@components/common/LoadingSpinner';
import { LoadingContainer } from '@components/AuthorizedLayout/style';
import userInfosState from '@store/UserInfos';
import studyState from '@store/Study';
import { getHeaders } from '@pages/util';
import { FORBIDDEN_PATH, ETC_PATH, MAIN_PATH, LANDING_PATH, SERVER_ERROR_PATH, LOGIN_PATH, STUDY_PATH } from '../../constants/route';
import * as S from './style';

const maxTitleLength = 60;
const maxTagNum = 8;
const tagMaxTextLength = 15;
const maxMemberNum = 1;
const INITIAL_DATE_FORM = '0000-00-00';
const maxContentNum = 2000;
const MAX_INT = 2147483647;
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
type koreanStudyWayKeyType = 'ONLINE' | 'OFFLINE' | 'BOTH';
type koreanStudyWayType = Record<koreanStudyWayKeyType, string>;
const koreanStudyWay: koreanStudyWayType = {
  ONLINE: '온라인',
  OFFLINE: '오프라인',
  BOTH: '온라인/오프라인',
};

// TODO: Write를 재활용하도록 개선
const Edit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useLogOut();

  const [keywords, setKeywords] = useRecoilState(keywordsState);
  // const { id } = useParams<{ id: string }>();
  const id = location.search.split('=')[1];
  const [studies, setStudies] = useRecoilState(studiesState);
  const targetStudy = studies.find((study) => study.id === Number(id));
  const delimiter = '-';
  const INITIAL_DATE_FORM = `0000${delimiter}00${delimiter}00`;
  const [isLoading, setIsLoading] = useState(false);
  const [startInputDate, setStartInputDate] = useState('');
  const [endInputDate, setEndInputDate] = useState('');
  const [isAuthorizedPage, setIsAuthorizedPage] = useState(false);
  const [value, setValue] = useState(targetStudy?.content || '');
  const [title, setTitle] = useState(targetStudy?.title || '');
  const [dropDownItem, setDropDownItem] = useRecoilState(dropDownItemState);
  const targetMaxPrticipants = targetStudy?.infos.find(({ type }) => type === 'limit')?.content;
  // eslint-disable-next-line no-unused-vars
  const maxPraticipantsNum = targetMaxPrticipants?.split(' ')[1]?.split('명')[0];
  const [maxParticipants, setMaxParticipants] = useState(maxPraticipantsNum);
  const [showingDistrict, setShowingDistrict] = useState(targetStudy?.infos.find(({ type }) => type === 'district')?.content || '');
  const [showingStudyWay, setShowingStudyWay] = useState(targetStudy?.infos.find(({ type }) => type === 'studyWay')?.content || '');
  // type previousTagKeyType = 'hashTagId' | 'content';
  // type previousTagType = Record<previousTagKeyType, any>;
  type tagsKeyType = 'id' | 'content';
  type tagsType = Record<tagsKeyType, any>;
  const [tags, setTags] = useRecoilState(tagsState);
  // const [tags, setTags] = useState<string[]>([]);
  // const [tags, setTags] = useState<tagsType[]>([]);
  const [tag, setTag] = useState('');
  // const [tags, setTags] = useState<any[]>([]);
  // const [currentTags, setCurrentTags] = useState(targetStudy?.tags || tagsState);
  // TODO: Write와 다르게 초기값은 오늘이 아님
  const [dates, setDates] = useState<DateType[]>([]);
  const [initialDates, setInitialDates] = useRecoilState(datesState);
  type DataKeyType = 'id' | 'type' | 'content';
  type DataType = Record<DataKeyType, any>;
  const [currentDistricts, setCurrentDistricts] = useState<DataType[]>([]);
  const [currentStudyWay, setCurrentStudyWay] = useState<DataType[]>([]);
  const [currentStartDate, setCurrentStartDate] = useState('');
  const [currentEndDate, setCurrentEndDate] = useState('');
  const cookies = new Cookies();
  const [realTimeDateMsg, setRealTimeDateMsg] = useState('');
  const [study, setStudy] = useRecoilState(studyState);
  const [isEmpty, setIsEmpty] = useState(false);
  // const [studies] = useRecoilState(studiesState);
  const [userInfos] = useRecoilState(userInfosState);
  const checkIsSameDay = (dateA: Date, dateB: Date) => dateA.getFullYear() === dateB.getFullYear() && dateA.getMonth() === dateB.getMonth() && dateA.getDate() === dateB.getDate();

  useEffect(
    () => () => {
      setDropDownItem([]);
    },
    []
  );

  const checkIsStartBeforeEnd = (start: DateType, end: DateType) => {
    if (start && end) {
      const studyStartDate = new Date(start.year, start.month, start.date);
      const studyEndDate = new Date(end.year, end.month, end.date);
      const startDateMiliSec = studyStartDate.getTime();
      const studyEndDateMiliSec = studyEndDate.getTime();
      return startDateMiliSec <= studyEndDateMiliSec;
    }

    return false;
  };

  useEffect(() => {
    if (!currentDistricts || !showingDistrict) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }

    if (!currentStudyWay || !showingStudyWay) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [currentDistricts, showingDistrict, currentStudyWay, showingStudyWay]);

  useEffect(() => {
    let currentRealTimeDateMsg = '';
    if (dates[0] && dates[1]) {
      const studyStartDate = new Date(dates[0].year, dates[0].month - 1, dates[0].date);
      const startDateMiliSec = studyStartDate.getTime();
      const studyEndDate = new Date(dates[1].year, dates[1].month - 1, dates[1].date);
      const studyEndDateMiliSec = studyEndDate.getTime();
      const currentDateMiliSec = new Date().getTime();

      const isSameDay = checkIsSameDay(studyStartDate, new Date());
      currentRealTimeDateMsg += startDateMiliSec < currentDateMiliSec && !isSameDay ? '시작일은 오늘부터 설정가능합니다.' : '';
      setRealTimeDateMsg(() => currentRealTimeDateMsg);
      currentRealTimeDateMsg += startDateMiliSec > studyEndDateMiliSec ? '시작일 이후로 종료일을 설정할 수 있습니다.' : currentRealTimeDateMsg;
      if (checkIsStartBeforeEnd(dates[0], dates[1])) {
        setRealTimeDateMsg(() => '');
      } else {
        setRealTimeDateMsg(() => currentRealTimeDateMsg + realTimeDateMsg);
      }
    }
  }, [dates]);

  const makeFormattedDate = (date: DateType) => {
    if (!date) {
      return INITIAL_DATE_FORM;
    }

    const formattedYear = date.year === 0 ? '0000' : date.year;
    const formattedMonth = date.month > 9 ? `${date.month}` : `0${date.month}`;
    const formattedDate = date.date > 9 ? `${date.date}` : `0${date.date}`;
    return `${formattedYear}-${formattedMonth}-${formattedDate}`;
  };

  const formattedDate2date = (formattedDate: string) => {
    const splitedDate = formattedDate.split(delimiter);
    const year = Number(splitedDate[0]);
    const month = Number(splitedDate[1]);
    const date = Number(splitedDate[2]);

    return {
      year,
      month: month - 1,
      date,
    };
  };

  const handleClickDate = (currentDate: DateType) => {
    const clickedDate = {
      year: currentDate.year,
      month: currentDate.month + 1,
      date: currentDate.date,
    };

    if (dates.length >= 2) {
      const isStartBeforeEnd = !checkIsStartBeforeEnd(dates[0], clickedDate);
      if (isStartBeforeEnd) {
        setDates([clickedDate]);
      } else {
        // setCurrentEndDate('0000-00-00');
        setDates([dates[0], clickedDate]);
      }
      return;
    }

    if (dates.length >= 1) {
      const isStartBeforeEnd = !checkIsStartBeforeEnd(dates[0], clickedDate);
      if (isStartBeforeEnd) {
        setDates([clickedDate]);
      } else {
        // setCurrentEndDate('0000-00-00');
        setDates([dates[0], clickedDate]);
      }
      return;
    }

    // setCurrentEndDate('0000-00-00');
    setDates([...dates, clickedDate]);
  };

  useEffect(() => {
    const getStudy = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const refreshToken = cookies.get(`SEC_EKIL15`);
        const headers = getHeaders();

        // const body = token ? { headers, withCredentials: true } : { withCredentials: true };
        const body = token ? { headers } : {};

        const response = await axios.get(`${process.env.END_POINT}api/studies/${id}`, body);

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
          | 'memberProfileImageUrl';
        // | 'hashTags';

        type dataType = Record<dataKeyType, any>;

        const targetData: dataType = response.data; // response.data.contents.page[0];

        type tagKeyType = 'studyId' | 'tagName';
        type tagType = Record<tagKeyType, any>;

        // const { id, title, content, studyOrganizer, studyStatus, meeting, commentCount, viewCount, likeCount, createdAt, maxStudyMemberCount, currentStudyMemberCount, startDate, endDate } =
        //   targetData;

        const {
          studyId,
          // eslint-disable-next-line no-shadow
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
          district,
        } = targetData;

        setTitle(title);
        setValue(content);
        type tagDataKeyType = 'hashTagResponses';
        type tagDataType = Record<tagDataKeyType, any>;

        // const tagResponse: tagDataType = await axios.get(`${process.env.END_POINT}api/tags/study/${currentId}`, { headers });
        const tagResponse = {
          hashTagResponses: [],
        };

        const hashTags: tagType[] = tagResponse.hashTagResponses;
        // eslint-disable-next-line no-shadow
        const currentTags = hashTags?.map(({ studyId, tagName }) => ({
          id: studyId,
          content: `#${tagName}`,
        }));

        const currentStudy = {
          id: studyId,
          nickName: studyOrganizer, // TODO 배포 nickName은 추후 헤더에서 얻어오기
          memberId,
          studyOrganizer,
          studyOrganizerProfile: memberProfileImageUrl,
          title,
          time: '',
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
              content: progressOfStudy,
            },
            {
              id: 3,
              type: 'limit',
              content: `${maxStudyMemberCount}`,
            },
            {
              id: 4,
              type: 'end',
              content: `${endDate}`,
            },
          ],
          commentCount,
          viewCount,
          likeCount,
          isRecruiting: studyStatus === 'RECRUITING',
          createdDate: '',
          currentStudyMemberCount,
          maxStudyMemberCount,
          isAuthorized: false, // studyOrganizer === 'devjun10', // nickName은 추후 헤더에서 얻어오기
        };

        setCurrentStartDate(startDate);
        setCurrentEndDate(endDate);
        setMaxParticipants(targetData?.maxStudyMemberCount);
        const currentDistrict: koreanDistrictsKeyType = targetData?.district;
        setShowingDistrict((targetData && koreanDistricts[currentDistrict]) || '');

        const studyWay: koreanStudyWayKeyType = targetData?.progressOfStudy;
        setShowingStudyWay((targetData && koreanStudyWay[studyWay]) || '');
        // setStudy(currentStudy);

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
    // if (userInfos.memberId) {
    getStudy();
    // }

    // setIsStudyLoading(false);
  }, []);

  useEffect(() => {
    if (currentStartDate) {
      handleClickDate(formattedDate2date(currentStartDate));
      const date = formattedDate2date(currentStartDate);
      const initDate = {
        year: date.year,
        month: date.month + 1,
        date: date.date,
      };
      setInitialDates([...initialDates, initDate]);
      setCurrentStartDate('');
    }
  }, [currentStartDate]);

  useEffect(() => {
    if (currentEndDate && dates.length === 1) {
      handleClickDate(formattedDate2date(currentEndDate));
      const date = formattedDate2date(currentEndDate);
      const initDate = {
        year: date.year,
        month: date.month + 1,
        date: date.date,
      };
      setInitialDates([...initialDates, initDate]);
      setCurrentEndDate('');
    }
  }, [dates]);

  useEffect(() => {
    const getTags = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();

      try {
        const body = token ? { headers } : {};
        type tagKeyType = 'hashTagId' | 'tagName';
        type tagType = Record<tagKeyType, any>;
        const response = await axios.get(`${process.env.END_POINT}api/hashtags/study/${id}`, body);

        const hashTags: tagType[] = response.data.hashTagResponses;

        const apiTags = hashTags?.map(({ tagName }, index) => `${tagName}`);

        setTags([...apiTags]);
        setKeywords([...apiTags]);
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

  // useEffect(() => {
  //   console.log('targetStudy===');
  //   console.log(targetStudy);
  //   if (!targetStudy?.tags) {
  //     return;
  //   }
  //   setTags(targetStudy?.tags);
  // }, [targetStudy]);

  useEffect(() => {
    const getDistricts = async () => {
      const DISTRICT_URL = 'api/study-supports/districts';
      try {
        const token = localStorage.getItem('accessToken');
        const refreshToken = cookies.get(`SEC_EKIL15`);
        const headers = getHeaders();
        const body = token
          ? {
              headers,
            }
          : {};
        const response = await axios.get(`${process.env.END_POINT}${DISTRICT_URL}`, body);

        type apiDistrictType = typeof response.data.districts[0];
        const apiDistricts: apiDistrictType[] = response.data.districts;

        // eslint-disable-next-line no-shadow
        const districtsValues = apiDistricts.map(({ id, type, value }) => ({
          id,
          type,
          content: value,
        }));
        const showingDistrictsValues = districtsValues.filter(({ type }) => type !== 'NONE');
        setCurrentDistricts(showingDistrictsValues);
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
    getDistricts();
  }, []);

  useEffect(() => {
    if (!currentDistricts) {
      return;
    }

    if (!showingDistrict) {
      return;
    }

    const targetDistrict = currentDistricts?.find(({ content }) => content === showingDistrict);
    const remainDistricts = currentDistricts?.filter(({ content }) => content !== showingDistrict);
    if (!targetDistrict) {
      return;
    }
    const newDistricts = [targetDistrict, ...remainDistricts];
    setCurrentDistricts(newDistricts);
  }, [currentDistricts, showingDistrict]);

  useEffect(() => {
    const getStudyWay = async () => {
      const STUDY_WAY_URL = 'api/study-supports/progress-of-study';
      try {
        const token = localStorage.getItem('accessToken');
        const refreshToken = cookies.get(`SEC_EKIL15`);
        const headers = getHeaders();
        const body = token
          ? {
              headers,
            }
          : {};
        const response = await axios.get(`${process.env.END_POINT}${STUDY_WAY_URL}`, body);

        type apiStudyWayType = typeof response.data.progressOfStudies[0];
        const apiDistricts: apiStudyWayType[] = response.data.progressOfStudies;

        // eslint-disable-next-line no-shadow
        const studyWayValues = apiDistricts.map(({ id, type, value }) => ({
          id,
          type,
          content: value,
        }));
        setCurrentStudyWay(studyWayValues);
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
          navigate(`${LANDING_PATH}`);
        }
      }
    };

    getStudyWay();
  }, []);

  useEffect(() => {
    if (!currentStudyWay) {
      return;
    }

    if (!showingStudyWay) {
      return;
    }

    const targetStudyWay = currentStudyWay?.find(({ content }) => content === showingStudyWay);
    const remainStudyWay = currentStudyWay?.filter(({ content }) => content !== showingStudyWay);

    if (!targetStudyWay) {
      return;
    }
    const newStudyWay = [targetStudyWay, ...remainStudyWay];
    setCurrentStudyWay(newStudyWay);
  }, [showingStudyWay]);

  // useEffect(() => {
  //   const targetTags = localStorage.getItem('tags');
  //   if (targetTags) {
  //     setTags(JSON.parse(targetTags));
  //   }

  //   const targetDates = localStorage.getItem('dates');
  //   if (targetDates) {
  //     const originDates = JSON.parse(targetDates);
  //     const splitedStartDate = originDates[0].split('-');
  //     setDates([
  //       ...dates,
  //       {
  //         year: splitedStartDate[0],
  //         month: splitedStartDate[1],
  //         date: splitedStartDate[2],
  //       },
  //     ]);
  //     const splitedEndDate = originDates[0].split('-');
  //     setDates([
  //       ...dates,
  //       {
  //         year: splitedEndDate[0],
  //         month: splitedEndDate[1],
  //         date: splitedEndDate[2],
  //       },
  //     ]);
  //   }
  // }, []);

  const handleChangeStartDate = (event: ChangeEvent<HTMLInputElement>) => {
    setStartInputDate(event.target.value);
  };

  const handleChangeEndDate = (event: ChangeEvent<HTMLInputElement>) => {
    setEndInputDate(event.target.value);
  };
  type errorMsgKeyType = 'title' | 'content' | 'tags' | 'maxMember' | 'date';
  type errorMsgType = Record<errorMsgKeyType, any>;
  const [errorMsg, setErrorMsg] = useState<errorMsgType>();

  useEffect(() => {
    const getDistricts = async () => {
      const DISTRICT_URL = 'api/study-supports/districts';
      try {
        const token = localStorage.getItem('accessToken');
        const refreshToken = cookies.get(`SEC_EKIL15`);
        const headers = getHeaders();
        const body = token
          ? {
              headers,
            }
          : {};
        const response = await axios.get(`${process.env.END_POINT}${DISTRICT_URL}`, body);
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
    // getDistricts();
  }, []);

  useEffect(() => {
    const getStudyWay = async () => {
      const STUDY_WAY_URL = 'api/study-supports/progress-of-study';
      try {
        const token = localStorage.getItem('accessToken');
        const refreshToken = cookies.get(`SEC_EKIL15`);
        const headers = getHeaders();
        const body = token
          ? {
              headers,
            }
          : {};
        const response = await axios.get(`${process.env.END_POINT}${STUDY_WAY_URL}`, body);
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

    // getStudyWay();
  }, []);

  const handleChangeValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const currentValue = event.target.value;
    setValue(currentValue);
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeMaxParticipants = (event: ChangeEvent<HTMLInputElement>) => {
    setMaxParticipants(event.target.value);
  };

  const handleClickSavePosting = () => {
    type dataKeyType = 'title' | 'content' | 'startDate' | 'endDate' | 'maxStudyMemberCount' | 'district' | 'progressOfStudy' | 'hashTags';
    type dataType = Record<dataKeyType, any>;
    let newErrorMsg = {
      title: '',
      content: '',
      tags: '',
      maxMember: '',
      date: '',
    };

    let realTimeErrorMsg = {
      title: '',
      content: '',
      tags: '',
      maxMember: '',
      date: '',
    };

    const getInputPosting = () => {
      // TODO 배포 studyOrganizer은 사용자로 수정
      const maxStudyMemberCount = Number(maxParticipants);
      const targetDistricts = dropDownItem.find((item) => item.type === 'district');

      // if (!targetDistricts) {
      //   targetDistricts = {
      //     id: 1,
      //     type: 'district',
      //     content: '서울',
      //   };
      // }
      const targetStudyWay = dropDownItem.find((item) => item.type === 'studyWay');
      // if (!targetStudyWay) {
      //   targetStudyWay = {
      //     id: 3,
      //     type: 'studyWay',
      //     content: '온라인/오프라인',
      //   };
      // }
      // if (!targetStudyWay) {
      //   targetStudyWay = {
      //     id: 1,
      //     type: 'studyWay',
      //     content: '온라인',
      //   };
      // }

      if (!currentDistricts || !showingDistrict) {
        setIsEmpty(true);
      }

      if (!currentStudyWay || !showingStudyWay) {
        setIsEmpty(true);
      }

      const districtData = currentDistricts.find((currentDistrict) => currentDistrict.content === targetDistricts?.content);
      const studyWayData = currentStudyWay.find((meeting) => meeting.content === targetStudyWay?.content);
      const endDate = makeFormattedDate(dates[1]);
      // endDate === INITIAL_DATE_FORM ? currentEndDate : endDate
      const data = {
        title,
        content: value,
        hashTags: tags,
        maxStudyMemberCount,
        startDate: makeFormattedDate(dates[0]),
        endDate: makeFormattedDate(dates[1]),
        progressOfStudy: targetStudyWay ? studyWayData?.type : currentStudyWay[0].type,
        district: targetDistricts ? districtData?.type : currentDistricts[0].type,
      };

      let titleMsg = '';
      if (title.length < 1) {
        titleMsg = '제목을 입력해주세요.';
      }

      let realTimeTitleMsg = '';
      if (title.length > maxTitleLength) {
        realTimeTitleMsg = '제목은 60자까지 가능합니다.';
      }

      const contentMsg = value.length < 1 ? '내용을 입력해주세요.' : '';
      const realTimeContentMsg = value.length > maxContentNum ? '내용은 2000자까지 입력가능합니다.' : '';
      const realTimeMaxMemberMsg = isNaN(maxStudyMemberCount) ? '인원은 숫자만 입력 가능합니다.' : '';
      let maxMemberMsg = '';

      maxMemberMsg = maxStudyMemberCount < maxMemberNum ? '인원은 1명 이상 가능합니다.' : maxMemberMsg;

      const dateMsg = makeFormattedDate(dates[0]) === INITIAL_DATE_FORM || makeFormattedDate(dates[1]) === INITIAL_DATE_FORM ? '캘린더 버튼을 클릭하여 날짜를 선택해주세요.' : '';

      // let currentRealTimeDateMsg = '';
      // if (dates[0] && dates[1]) {
      //   const studyStartDate = new Date(dates[0].year, dates[0].month - 1, dates[0].date);
      //   const studyEndDate = new Date(dates[1].year, dates[1].month - 1, dates[1].date);
      //   const startDateMiliSec = studyStartDate.getTime();
      //   const studyEndDateMiliSec = studyEndDate.getTime();
      //   const currentDateMiliSec = new Date().getTime();

      //   const isSameDay = checkIsSameDay(studyStartDate, new Date());
      //   currentRealTimeDateMsg += startDateMiliSec < currentDateMiliSec && !isSameDay ? '시작일은 오늘부터 설정가능합니다.' : '';
      //   currentRealTimeDateMsg += startDateMiliSec > studyEndDateMiliSec ? '시작일 이후로 종료일을 설정할 수 있습니다.' : dateMsg;
      //   if (checkIsStartBeforeEnd(dates[0], dates[1])) {
      //     console.log('setRealTimeDateMsg===');
      //     setRealTimeDateMsg(() => '');
      //   } else {
      //     console.log('setRealTimeDateMsg===2');
      //     setRealTimeDateMsg(() => currentRealTimeDateMsg + realTimeDateMsg);
      //   }
      // }

      let tagsMsg = '';

      if (tags.length < 1) {
        tagsMsg = '태그를 입력해주세요.';
      }

      let realTimeTagsMsg = '';
      if (tags.length > maxTagNum) {
        realTimeTagsMsg = '태그는 최대 8개 가능합니다.';
      }

      const singleWord = tags.find((tag) => tag.length === 1);
      if (singleWord) {
        realTimeTagsMsg += '태그는 2글자 이상 가능합니다.';
      }

      const outOfTagLengthMsg = '태그 내용은 15자까지 가능합니다.';

      realTimeTagsMsg += tags.find((tag) => tag.length > tagMaxTextLength) ? `${tagsMsg} ${outOfTagLengthMsg}` : tagsMsg;

      newErrorMsg = {
        title: titleMsg,
        tags: tagsMsg,
        maxMember: maxMemberMsg,
        date: dateMsg,
        content: contentMsg,
      };

      realTimeErrorMsg = {
        title: realTimeTitleMsg,
        tags: realTimeTagsMsg,
        maxMember: realTimeMaxMemberMsg,
        date: realTimeDateMsg,
        content: realTimeContentMsg,
      };

      setErrorMsg(newErrorMsg);
      return data;
    };

    const putStudy = async (data: dataType) => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();
      const body = token
        ? {
            headers,
          }
        : {};
      try {
        const response = await axios.put(`${process.env.END_POINT}api/studies/${id}`, data, body);
        // TODO : 수정스터디 변경
        const editedStudy = {
          id: Number(id),
          nickName: userInfos.nickName,
          title: data.title,
          time: '',
          content: value,
          tags: data.hashTags,
          infos: [
            {
              id: 1,
              type: 'start',
              content: data.startDate,
            },
            {
              id: 2,
              type: 'end',
              content: data.endDate,
            },
            {
              id: 3,
              type: 'studyWay',
              content: data.progressOfStudy,
            },
            {
              id: 4,
              type: 'limit',
              content: `최대 ${data.maxStudyMemberCount}명`,
            },
            { id: 5, type: 'district', content: data.district },
          ],
          commentCount: 0,
          viewCount: 0,
          likeCount: 0,
          isRecruiting: false,
          createdDate: '',
          currentStudyMemberCount: 0,
          maxStudyMemberCount: data.maxStudyMemberCount,
        };

        setStudy(editedStudy);
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

    const inputPosting = getInputPosting();

    if (newErrorMsg.content || newErrorMsg.date || newErrorMsg.maxMember || newErrorMsg.tags || newErrorMsg.title) {
      return;
    }

    if (realTimeErrorMsg.content || realTimeErrorMsg.date || realTimeErrorMsg.maxMember || realTimeErrorMsg.title || realTimeErrorMsg.tags) {
      return;
    }

    // TODO : newErrorMsg로 설정해야하는지 고민
    if (!Number.isSafeInteger(Number(maxParticipants))) {
      return;
    }

    if (MAX_INT < Number(maxParticipants)) {
      return;
    }

    putStudy(inputPosting);

    navigate(`${STUDY_PATH}/${id}`);
  };

  const handleClickCancel = () => {
    navigate(`${STUDY_PATH}/${id}`);
  };

  const handleClickReset = () => {
    setDates([]);
  };

  const handleChangeTagValue = (event: ChangeEvent<HTMLInputElement>) => {
    setTag(event.target.value);
  };

  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const { isClicked, handleClick } = useMouse(false);
  const handleClickCalendar = () => {
    handleClickReset();
    handleClick();
  };

  const [isCalendarClickAway, setIsCalendarClickAway] = useState(false);

  useEffect(() => {
    const handleCalendarClickAway = (event: MouseEvent) => {
      setIsCalendarClickAway(!buttonWrapperRef.current?.contains(event.target as Node));
    };

    document.addEventListener('click', handleCalendarClickAway);
  }, []);

  useEffect(() => {
    if (isClicked && isCalendarClickAway) {
      handleClick();
    }
  }, [isCalendarClickAway]);

  useEffect(() => {
    const studyId = location.search.split('study_id=')[1];
    const targetPathName = location.pathname;
    // 접근 권한 api요청
    const investigateAuthorization = async () => {
      const token = localStorage.getItem('accessToken');

      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();

      const body = token
        ? {
            params: {
              studyId,
            },
            headers,
          }
        : {
            params: {
              studyId,
            },
          };
      try {
        const response = await axios.get(`${process.env.END_POINT}${targetPathName}`, body);
        setIsLoading(false);
        if (response.status === 200) {
          setIsAuthorizedPage(true);
        }
      } catch (error: any) {
        setIsLoading(false);
        setIsAuthorizedPage(false);
        if (error.response.status === 401) {
          logout();
          navigate(`${LOGIN_PATH}`, { state: { previousPathname: location.pathname } });
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

    // setIsLoading(true);

    // investigateAuthorization();
  }, []);

  const handleClickCancelCalendar = () => {
    handleClick();
  };

  const handleClickConfirm = () => {
    let currentRealTimeDateMsg = '';
    if (dates[0]) {
      const studyStartDate = new Date(dates[0].year, dates[0].month - 1, dates[0].date);
      const startDateMiliSec = studyStartDate.getTime();
      const currentDateMiliSec = new Date().getTime();
      const isSameDay = checkIsSameDay(studyStartDate, new Date());
      currentRealTimeDateMsg += startDateMiliSec < currentDateMiliSec && !isSameDay ? '시작일은 오늘부터 설정가능합니다.' : '';
    }
    if (dates[0] && dates[1]) {
      const studyStartDate = new Date(dates[0].year, dates[0].month - 1, dates[0].date);
      const studyEndDate = new Date(dates[1].year, dates[1].month - 1, dates[1].date);
      const startDateMiliSec = studyStartDate.getTime();
      const currentDateMiliSec = new Date().getTime();
      const studyEndDateMiliSec = studyEndDate.getTime();

      const isSameDay = checkIsSameDay(studyStartDate, new Date());
      currentRealTimeDateMsg += startDateMiliSec < currentDateMiliSec && !isSameDay ? '시작일은 오늘부터 설정가능합니다.' : '';
      setRealTimeDateMsg(() => currentRealTimeDateMsg);
      currentRealTimeDateMsg += startDateMiliSec > studyEndDateMiliSec ? '시작일 이후로 종료일을 설정할 수 있습니다.' : currentRealTimeDateMsg;
      if (checkIsStartBeforeEnd(dates[0], dates[1])) {
        setRealTimeDateMsg(() => '');
      } else {
        setRealTimeDateMsg(() => currentRealTimeDateMsg + realTimeDateMsg);
      }
    }
    if (realTimeDateMsg.length > 0 || currentRealTimeDateMsg.length > 0) {
      return;
    }

    handleClick();
  };

  useEffect(() => {
    setTag('');
  }, [tags]);

  return (
    <Layout>
      {isLoading ? (
        <LoadingContainer>
          <LoadingSpinner size="large" />
        </LoadingContainer>
      ) : (
        <S.Container>
          <S.CustomInput id="edit-title" label="제목" size="xlarge" value={title} handleChangeValue={handleChangeTitle} />
          {errorMsg?.title && title.length === 0 && <S.ErrorMessage>{errorMsg?.title}</S.ErrorMessage>}
          {title.length > maxTitleLength && <S.ErrorMessage>제목은 60자까지 가능합니다.</S.ErrorMessage>}
          <S.TagLabel>태그</S.TagLabel>
          <S.CustomSearchTag id="edit-tag" label="" mode="tag" size="megaLarge" isTagSingly={false} handleChangeValue={handleChangeTagValue} />
          {tag.length > maxTagNum && <S.ErrorMessage>{errorMsg?.tags}</S.ErrorMessage>}
          {errorMsg?.tags && tag.length === 0 && tags.length === 0 && <S.ErrorMessage>태그를 입력해주세요.</S.ErrorMessage>}
          {tag.length > tagMaxTextLength && <S.ErrorMessage>태그 내용은 15자까지 가능합니다.</S.ErrorMessage>}
          {tag.length > 0 && tags.length >= maxTagNum && <S.ErrorMessage>태그는 최대 8개 가능합니다.</S.ErrorMessage>}
          {tag.length > 0 && tag.length <= 1 && <S.ErrorMessage>태그는 2글자 이상 가능합니다.</S.ErrorMessage>}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              <S.SelectsContainer>
                <S.Label>지역</S.Label>
                <DropDown width="77px" height="48px" type="district" selectTitle={currentDistricts[0]?.content || ''} options={currentDistricts} />
                <S.Label>진행방식</S.Label>
                <DropDown width="189px" height="48px" type="studyWay" selectTitle={currentStudyWay[0]?.content || ''} options={currentStudyWay} />
                <S.Label>최대인원</S.Label>
                <S.Selects id="edit-max-people" size="xsmall" label="" isLabelHorizontal value={maxParticipants} handleChangeValue={handleChangeMaxParticipants} placeholder="0" />
              </S.SelectsContainer>
            </div>

            {errorMsg?.maxMember && Number(maxParticipants) < maxMemberNum && (
              <S.RightErrorMsg>
                <S.ErrorMsg>{errorMsg?.maxMember}</S.ErrorMsg>
              </S.RightErrorMsg>
            )}
            {isNaN(Number(maxParticipants)) && <S.RightErrorMsg>인원은 숫자만 입력 가능합니다.</S.RightErrorMsg>}
            {(MAX_INT < Number(maxParticipants) || !Number.isSafeInteger(Number(maxParticipants))) && <S.RightErrorMsg>인원이 신청 가능한 범위가 아닙니다.</S.RightErrorMsg>}
            <div>
              <S.FloatBox>
                <S.CalendarInputContainer>
                  <div>
                    {/* {makeFormattedDate(dates[0]) !== INITIAL_DATE_FORM &&
                      new Date(dates[0].year, dates[0].month - 1, dates[0].date).getTime() < new Date().getTime() &&
                      !checkIsSameDay(new Date(dates[0].year, dates[0].month - 1, dates[0].date), new Date()) && <S.RightErrorMsg>시작일은 오늘부터 설정가능합니다.</S.RightErrorMsg>}
                    {makeFormattedDate(dates[1]) !== INITIAL_DATE_FORM && !checkIsStartBeforeEnd(dates[0], dates[1]) && <S.RightErrorMsg>시작일 이후로 종료일을 설정할 수 있습니다.</S.RightErrorMsg>} */}
                  </div>
                  <S.FlexBox>
                    <S.Label>시작일</S.Label>
                    <S.CustomCalendarInput
                      id="edit-date-start"
                      placeholder={makeFormattedDate(dates[0])}
                      size="xsmall"
                      mode="calendar"
                      label=""
                      isLabelHorizontal
                      handleChangeValue={handleChangeStartDate}
                      disabled
                    />
                    <S.Label>종료일</S.Label>
                    <S.CustomCalendarInput
                      id="edit-date-end"
                      placeholder={makeFormattedDate(dates[1])}
                      size="xsmall"
                      mode="calendar"
                      label=""
                      isLabelHorizontal
                      handleChangeValue={handleChangeEndDate}
                      disabled
                    />
                    <div ref={buttonWrapperRef}>
                      <S.CustomButton size="tiny" handleClick={handleClickCalendar}>
                        <Icon mode="calendar" />
                      </S.CustomButton>
                      <S.CalendarAreaContainer isClicked={isClicked}>
                        <CalendarArea handleClickDate={handleClickDate} handleClickReset={handleClickReset} isEditing />
                        <S.CalendarButtonContainer>
                          <S.CalendarButton size="xsmall" handleClick={handleClickCancelCalendar}>
                            취소
                          </S.CalendarButton>
                          <S.CalendarButton mode="accent" size="xsmall" handleClick={handleClickConfirm}>
                            확인
                          </S.CalendarButton>
                        </S.CalendarButtonContainer>
                        <div style={{ margin: '48px 24px 0 0' }}>
                          {makeFormattedDate(dates[0]) !== INITIAL_DATE_FORM &&
                            new Date(dates[0].year, dates[0].month - 1, dates[0].date).getTime() < new Date().getTime() &&
                            !checkIsSameDay(new Date(dates[0].year, dates[0].month - 1, dates[0].date), new Date()) && (
                              // <S.FloatBox>
                              //   <S.ErrorMsg>시작일은 오늘부터 설정가능합니다.</S.ErrorMsg>
                              // </S.FloatBox>
                              <S.RightErrorMsg>시작일은 오늘부터 설정가능합니다.</S.RightErrorMsg>
                            )}
                          {/* {makeFormattedDate(dates[0]) === INITIAL_DATE_FORM ||
                      (makeFormattedDate(dates[1]) === INITIAL_DATE_FORM && <S.ErrorMessage>캘린더 버튼을 클릭하여 날짜를 선택해주세요.</S.ErrorMessage>)} */}

                          {makeFormattedDate(dates[1]) !== INITIAL_DATE_FORM && !checkIsStartBeforeEnd(dates[0], dates[1]) && (
                            <S.RightErrorMsg>시작일 이후로 종료일을 설정할 수 있습니다.</S.RightErrorMsg>
                          )}
                        </div>
                      </S.CalendarAreaContainer>
                    </div>
                  </S.FlexBox>
                </S.CalendarInputContainer>
              </S.FloatBox>
            </div>
          </div>
          {errorMsg?.date && <S.FloatBox>{dates.length < 2 && <S.ErrorMsg>{errorMsg?.date}</S.ErrorMsg>}</S.FloatBox>}
          {/* {errorMsg?.date && (
        <S.FloatBox>
          <S.ErrorMsg>{errorMsg?.date}</S.ErrorMsg>
        </S.FloatBox>
      )} */}
          <S.CustomTextArea size="large" id="edit-posting" handleChange={handleChangeValue} value={value} />
          {errorMsg?.content && value.length === 0 && <S.ErrorMessage>내용을 입력해주세요.</S.ErrorMessage>}
          {value.length > maxContentNum && <S.ErrorMessage>내용은 2000자까지 입력가능합니다.</S.ErrorMessage>}
          <S.ButtonContainer>
            <S.CustomButton size="small" handleClick={handleClickCancel}>
              취소
            </S.CustomButton>
            <S.CustomButton mode="accent" size="small" handleClick={handleClickSavePosting} disabled={isEmpty}>
              저장
            </S.CustomButton>
          </S.ButtonContainer>
        </S.Container>
      )}
    </Layout>
  );
};

export default Edit;
