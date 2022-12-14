/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import Layout from '@components/Layout';
import AuthorizedLayout from '@components/AuthorizedLayout';
import DropDown from '@components/DropDown';
import { selectTitles, options } from '@components/DropDown/constants';
import { ChangeEvent, useEffect, useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import dropDownItemState from '@store/DropDownItem';
import tagsState from '@store/Tags';
import DateType from '@components/types/CalendarArea';
import { districts } from '@components/mocks';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Icon from '@components/common/Icon';
import CalendarArea from '@components/CalendarArea';
import useMouse from '@hooks/useMouse';
import studiesState from '@store/Studies';
import userInfosState from '@store/UserInfos';
import useLogOut from '@hooks/useLogout';
import Button from '@components/common/Button';
import { Cookies } from 'react-cookie';
import { createBrowserHistory } from 'history';
import keywordsState from '@store/Keyword';
import Portal from '@components/Modal/Portal';
import Modal from '@components/Modal';
import DoubleButtonModalArea from '@components/Modal/DoubleButtonModalArea';
import { BUTTON_CONFIRM, BUTTON_CANCEL } from '@components/Modal/constants';
import loginInfoState from '@store/LoginInfo';
import { getHeaders } from '@pages/util';
import { MEMBER_EDIT_PATH, UPDATE_PATH, NEW_STUDY_PATH, FORBIDDEN_PATH, ETC_PATH, STUDY_PATH, LOGIN_PATH, MAIN_PATH, LANDING_PATH, SERVER_ERROR_PATH } from '../../constants/route';
import * as S from './style';

const maxTitleLength = 60;
const maxTagNum = 8;
const tagMaxTextLength = 15;
const maxMemberNum = 1;
const INITIAL_DATE_FORM = '0000-00-00';
const maxContentNum = 2000;
const MAX_INT = 2147483647;

const Write = () => {
  const navigate = useNavigate();
  const { logout } = useLogOut();
  const [studies, setStudies] = useRecoilState(studiesState);
  const [userInfos] = useRecoilState(userInfosState);
  const [tag, setTag] = useState('');
  const cookies = new Cookies();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [previousPathName, setPreviousPasthName] = useState('');
  const [realTimeDateMsg, setRealTimeDateMsg] = useState('');
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);

  useEffect(() => {
    setPreviousPasthName(document.referrer);
  }, []);

  const makeFormattedDate = (date: DateType) => {
    if (!date) {
      return INITIAL_DATE_FORM;
    }

    const formattedYear = date.year === 0 ? '0000' : date.year;
    const formattedMonth = date.month > 9 ? `${date.month}` : `0${date.month}`;
    const formattedDate = date.date > 9 ? `${date.date}` : `0${date.date}`;
    return `${formattedYear}-${formattedMonth}-${formattedDate}`;
  };
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [dropDownItem, setDropDownItem] = useRecoilState(dropDownItemState);
  // eslint-disable-next-line no-unused-vars
  const [maxParticipants, setMaxParticipants] = useState('');
  const [tags, setTags] = useRecoilState(tagsState);
  const [keywords, setKeywords] = useRecoilState(keywordsState);
  const [dates, setDates] = useState<DateType[]>([
    {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      date: new Date().getDate(),
    },
  ]);
  const [startInputDate, setStartInputDate] = useState('');
  const [endInputDate, setEndInputDate] = useState('');
  type DataKeyType = 'id' | 'type' | 'content';
  type DataType = Record<DataKeyType, any>;
  const [currentDistricts, setCurrentDistricts] = useState<DataType[]>([]);
  const [currentStudyWay, setCurrentStudyWay] = useState<DataType[]>([]);
  const history = createBrowserHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(
    () => () => {
      setDropDownItem([]);
    },
    []
  );

  useEffect(() => {
    setTags([]);
    setKeywords([]);
  }, []);

  const checkIsSameDay = (dateA: Date, dateB: Date) => dateA.getFullYear() === dateB.getFullYear() && dateA.getMonth() === dateB.getMonth() && dateA.getDate() === dateB.getDate();

  useEffect(() => {
    const dateMsg = makeFormattedDate(dates[0]) === INITIAL_DATE_FORM || makeFormattedDate(dates[1]) === INITIAL_DATE_FORM ? '????????? ????????? ???????????? ????????? ??????????????????.' : '';

    let currentRealTimeDateMsg = '';
    if (dates[0] && dates[1]) {
      const studyStartDate = new Date(dates[0].year, dates[0].month - 1, dates[0].date);
      const studyEndDate = new Date(dates[1].year, dates[1].month - 1, dates[1].date);
      const startDateMiliSec = studyStartDate.getTime();
      const studyEndDateMiliSec = studyEndDate.getTime();
      const currentDateMiliSec = new Date().getTime();

      if (checkIsStartBeforeEnd(dates[0], dates[1])) {
        setRealTimeDateMsg(() => '');
        return;
      }
      const isSameDay = checkIsSameDay(studyStartDate, new Date());
      currentRealTimeDateMsg += startDateMiliSec < currentDateMiliSec && !isSameDay ? '???????????? ???????????? ?????????????????????.' : dateMsg;
      currentRealTimeDateMsg += startDateMiliSec > studyEndDateMiliSec ? '????????? ????????? ???????????? ????????? ??? ????????????.' : currentRealTimeDateMsg;
      setRealTimeDateMsg(() => currentRealTimeDateMsg + realTimeDateMsg);
    }
  }, [dates]);

  const handleClickOutPageConfirm = () => {
    window.history.pushState(null, '', previousPathName);
    navigate(`${MAIN_PATH}`);
  };

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

  const handleChangeStartDate = (event: ChangeEvent<HTMLInputElement>) => {
    setStartInputDate(event.target.value);
  };

  const handleChangeEndDate = (event: ChangeEvent<HTMLInputElement>) => {
    setEndInputDate(event.target.value);
  };
  type errorMsgKeyType = 'title' | 'content' | 'maxMember' | 'date' | 'tags'; //
  type errorMsgType = Record<errorMsgKeyType, any>;
  const [errorMsg, setErrorMsg] = useState<errorMsgType>();

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
      const maxStudyMemberCount = Number(maxParticipants);
      let targetDistricts = dropDownItem.find((item) => item.type === 'district');
      if (!targetDistricts) {
        targetDistricts = {
          id: 1,
          type: 'district',
          content: '??????',
        };
      }
      let targetStudyWay = dropDownItem.find((item) => item.type === 'studyWay');
      if (!targetStudyWay) {
        targetStudyWay = {
          id: 1,
          type: 'studyWay',
          content: '?????????',
        };
      }

      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const districtData = currentDistricts.find((currentDistrict) => currentDistrict.content === targetDistricts?.content);
      const studyWayData = currentStudyWay.find((meeting) => meeting.content === targetStudyWay?.content);

      const formattedStartDate = makeFormattedDate(dates[0]);
      const formattedEndDate = makeFormattedDate(dates[1]);
      const selelctedStudyWay = studyWayData?.type;
      const data = {
        title,
        content: value,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        maxStudyMemberCount,
        district: districtData?.type,
        progressOfStudy: studyWayData?.type,
        hashTags: tags,
      };

      let titleMsg = '';
      if (title.length < 1) {
        titleMsg = '????????? ??????????????????.';
      }

      let realTimeTitleMsg = '';
      if (title.length > maxTitleLength) {
        realTimeTitleMsg = '????????? 60????????? ???????????????.';
      }

      const contentMsg = value.length < 1 ? '????????? ??????????????????.' : '';
      const realTimeContentMsg = value.length > maxContentNum ? '????????? 2000????????? ?????????????????????.' : '';
      const realTimeMaxMemberMsg = isNaN(maxStudyMemberCount) ? '????????? ????????? ?????? ???????????????.' : '';
      let maxMemberMsg = '';

      maxMemberMsg = maxStudyMemberCount < maxMemberNum ? '????????? 1??? ?????? ???????????????.' : maxMemberMsg;

      const dateMsg = makeFormattedDate(dates[0]) === INITIAL_DATE_FORM || makeFormattedDate(dates[1]) === INITIAL_DATE_FORM ? '????????? ????????? ???????????? ????????? ??????????????????.' : '';

      let realTimeDateMsg = '';
      if (dates[0] && dates[1]) {
        const studyStartDate = new Date(dates[0].year, dates[0].month - 1, dates[0].date);
        const studyEndDate = new Date(dates[1].year, dates[1].month - 1, dates[1].date);
        const startDateMiliSec = studyStartDate.getTime();
        const studyEndDateMiliSec = studyEndDate.getTime();
        const currentDateMiliSec = new Date().getTime();

        const isSameDay = checkIsSameDay(studyStartDate, new Date());
        realTimeDateMsg += startDateMiliSec < currentDateMiliSec && !isSameDay ? '???????????? ???????????? ?????????????????????.' : '';
        realTimeDateMsg += startDateMiliSec > studyEndDateMiliSec ? '????????? ????????? ???????????? ????????? ??? ????????????.' : dateMsg;
      }

      let tagsMsg = '';

      if (tags.length < 1) {
        tagsMsg = '????????? ??????????????????.';
      }

      let realTimeTagsMsg = '';
      if (tags.length > maxTagNum) {
        realTimeTagsMsg = '????????? ?????? 8??? ???????????????.';
      }

      const singleWord = tags.find((tag) => tag.length === 1);
      if (singleWord) {
        realTimeTagsMsg += '????????? 2?????? ?????? ???????????????.';
      }

      const outOfTagLengthMsg = '?????? ????????? 15????????? ???????????????.';

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

    let newStudyId = 0;
    const postStudy = async (data: dataType) => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = cookies.get(`SEC_EKIL15`);
      const headers = getHeaders();
      const body = token
        ? {
            headers,
          }
        : {};
      try {
        const STUDY_URL = 'api/studies';
        const response = await axios.post(`${process.env.END_POINT}${STUDY_URL}`, data, body);
        newStudyId = response.data.studyId;

        setStudies([
          {
            id: response.data.studyId,
            nickName: userInfos.nickName,
            title,
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
                content: `?????? ${data.maxStudyMemberCount}???`,
              },
              { id: 5, type: 'district', content: data.district },
            ],
            commentCount: 0,
            viewCount: 0,
            likeCount: 0,
            isRecruiting: true,
            createdDate: '',
            currentStudyMemberCount: 0,
            maxStudyMemberCount: data.maxStudyMemberCount,
          },
          ...studies,
        ]);

        // TODO: ??????
        // localStorage.setItem('tags', JSON.stringify(tags));
        setTags([]);

        navigate(`${STUDY_PATH}/${newStudyId}`);
      } catch (error: any) {
        if (error.response.status === 401) {
          logout();
          navigate(`${LOGIN_PATH}`, { state: { previousPathname: location.pathname } });
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

    if (newErrorMsg.content || newErrorMsg.date || newErrorMsg.maxMember || newErrorMsg.title || newErrorMsg.tags) {
      return;
    }

    if (realTimeErrorMsg.content || realTimeErrorMsg.date || realTimeErrorMsg.maxMember || realTimeErrorMsg.title || realTimeErrorMsg.tags) {
      return;
    }

    // TODO : newErrorMsg??? ????????????????????? ??????
    if (!Number.isSafeInteger(Number(maxParticipants))) {
      return;
    }

    if (MAX_INT < Number(maxParticipants)) {
      return;
    }

    postStudy(inputPosting);
  };

  const handleClickCancel = () => {
    navigate(`${MAIN_PATH}`);
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
        setDates([dates[0], clickedDate]);
      }
      return;
    }

    if (dates.length >= 1) {
      const isStartBeforeEnd = !checkIsStartBeforeEnd(dates[0], clickedDate);
      if (isStartBeforeEnd) {
        setDates([clickedDate]);
      } else {
        setDates([dates[0], clickedDate]);
      }
      return;
    }

    setDates([...dates, clickedDate]);
  };

  const handleClickReset = () => {
    setDates([]);
  };

  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const { isClicked, handleClick } = useMouse(false);
  const handleClickCalendar = () => {
    handleClick();
  };

  const [isCalendarClickAway, setIsCalendarClickAway] = useState(false);

  // TODO : ?????? ?????????????????? tag???????????? ????????? => ????????????
  useEffect(() => {
    setTag('');
  }, [tags]);

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

  const handleChangeTagValue = (event: ChangeEvent<HTMLInputElement>) => {
    setTag(event.target.value);
  };

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
      currentRealTimeDateMsg += startDateMiliSec < currentDateMiliSec && !isSameDay ? '???????????? ???????????? ?????????????????????.' : '';
    }
    if (dates[0] && dates[1]) {
      const studyStartDate = new Date(dates[0].year, dates[0].month - 1, dates[0].date);
      const studyEndDate = new Date(dates[1].year, dates[1].month - 1, dates[1].date);
      const startDateMiliSec = studyStartDate.getTime();
      const currentDateMiliSec = new Date().getTime();
      const studyEndDateMiliSec = studyEndDate.getTime();

      const isSameDay = checkIsSameDay(studyStartDate, new Date());
      currentRealTimeDateMsg += startDateMiliSec < currentDateMiliSec && !isSameDay ? '???????????? ???????????? ?????????????????????.' : '';
      setRealTimeDateMsg(() => currentRealTimeDateMsg);
      currentRealTimeDateMsg += startDateMiliSec > studyEndDateMiliSec ? '????????? ????????? ???????????? ????????? ??? ????????????.' : currentRealTimeDateMsg;
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

  const handleModal = () => {
    setIsModalVisible(false);
  };

  const handleClickOutPageCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <S.Container>
        <S.CustomInput id="write-title" label="??????" size="xlarge" value={title} handleChangeValue={handleChangeTitle} />
        {errorMsg?.title && title.length === 0 && <S.ErrorMessage>{errorMsg?.title}</S.ErrorMessage>}
        {title.length > maxTitleLength && <S.ErrorMessage>????????? 60????????? ???????????????.</S.ErrorMessage>}
        <S.TagLabel>??????</S.TagLabel>
        <S.CustomSearchTag id="write-tag" label="" mode="tag" size="megaLarge" isTagSingly={false} handleChangeValue={handleChangeTagValue} />
        {tag.length > maxTagNum && <S.ErrorMessage>{errorMsg?.tags}</S.ErrorMessage>}
        {errorMsg?.tags && tag.length === 0 && tags.length === 0 && <S.ErrorMessage>????????? ??????????????????.</S.ErrorMessage>}
        {tag.length > tagMaxTextLength && <S.ErrorMessage>?????? ????????? 15????????? ???????????????.</S.ErrorMessage>}
        {tag.length > 0 && tags.length >= maxTagNum && <S.ErrorMessage>????????? ?????? 8??? ???????????????.</S.ErrorMessage>}
        {tag.length > 0 && tag.length <= 1 && <S.ErrorMessage>????????? 2?????? ?????? ???????????????.</S.ErrorMessage>}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <S.SelectsContainer>
              <S.Label>??????</S.Label>
              <DropDown width="77px" height="48px" type="district" selectTitle={currentDistricts[0]?.content || ''} options={currentDistricts} />
              <S.Label>????????????</S.Label>
              <DropDown width="189px" height="48px" type="studyWay" selectTitle={currentStudyWay[0]?.content || ''} options={currentStudyWay} />
              <S.Label>????????????</S.Label>
              <S.Selects id="write-max-people" size="xsmall" label="" isLabelHorizontal value={maxParticipants} handleChangeValue={handleChangeMaxParticipants} placeholder="0" />
            </S.SelectsContainer>
          </div>
          {errorMsg?.maxMember && Number(maxParticipants) < maxMemberNum && (
            <S.RightErrorMsg>
              <S.ErrorMsg>{errorMsg?.maxMember}</S.ErrorMsg>
            </S.RightErrorMsg>
          )}
          {isNaN(Number(maxParticipants)) && <S.RightErrorMsg>????????? ????????? ?????? ???????????????.</S.RightErrorMsg>}
          {(MAX_INT < Number(maxParticipants) || !Number.isSafeInteger(Number(maxParticipants))) && <S.RightErrorMsg>????????? ?????? ????????? ????????? ????????????.</S.RightErrorMsg>}
          <div>
            <S.FloatBox>
              <S.CalendarInputContainer>
                <div />
                <S.FlexBox>
                  <S.Label>?????????</S.Label>
                  <S.CustomCalendarInput
                    id="write-date-start"
                    placeholder={makeFormattedDate(dates[0])}
                    size="xsmall"
                    mode="calendar"
                    label=""
                    isLabelHorizontal
                    handleChangeValue={handleChangeStartDate}
                    disabled
                  />
                  <S.Label>?????????</S.Label>
                  <S.CustomCalendarInput
                    id="write-date-end"
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
                      <CalendarArea handleClickDate={handleClickDate} handleClickReset={handleClickReset} />
                      <S.CalendarButtonContainer>
                        <S.CalendarButton size="xsmall" handleClick={handleClickCancelCalendar}>
                          ??????
                        </S.CalendarButton>
                        <S.CalendarButton mode="accent" size="xsmall" handleClick={handleClickConfirm}>
                          ??????
                        </S.CalendarButton>
                      </S.CalendarButtonContainer>
                      <div style={{ margin: '48px 24px 0 0' }}>
                        {makeFormattedDate(dates[0]) !== INITIAL_DATE_FORM &&
                          new Date(dates[0].year, dates[0].month - 1, dates[0].date).getTime() < new Date().getTime() &&
                          !checkIsSameDay(new Date(dates[0].year, dates[0].month - 1, dates[0].date), new Date()) && <S.RightErrorMsg>???????????? ???????????? ?????????????????????.</S.RightErrorMsg>}
                        {makeFormattedDate(dates[1]) !== INITIAL_DATE_FORM && !checkIsStartBeforeEnd(dates[0], dates[1]) && (
                          <S.RightErrorMsg>????????? ????????? ???????????? ????????? ??? ????????????.</S.RightErrorMsg>
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
        <S.CustomTextArea size="large" id="write-posting" handleChange={handleChangeValue} value={value} />
        {/* {errorMsg?.content && <S.ErrorMessage>{errorMsg?.content}</S.ErrorMessage>} */}
        {errorMsg?.content && value.length === 0 && <S.ErrorMessage>????????? ??????????????????.</S.ErrorMessage>}
        {value.length > maxContentNum && <S.ErrorMessage>????????? 2000????????? ?????????????????????.</S.ErrorMessage>}
        <S.ButtonContainer>
          <S.CustomButton size="small" handleClick={handleClickCancel}>
            ??????
          </S.CustomButton>
          <S.CustomButton mode="accent" size="small" handleClick={handleClickSavePosting}>
            ??????
          </S.CustomButton>
        </S.ButtonContainer>
      </S.Container>
      <Portal>
        {isModalVisible && (
          <Modal onClose={handleModal} ref={modalRef}>
            <DoubleButtonModalArea handleClickLeftButton={handleClickOutPageCancel} handleClickRightButton={handleClickOutPageConfirm}>
              ??? ??????????????? ??????????????????????
              <S.AlertMsg>??????????????? ???????????? ?????? ??? ????????????.</S.AlertMsg>
              {BUTTON_CANCEL}
              {BUTTON_CONFIRM}
            </DoubleButtonModalArea>
          </Modal>
        )}
      </Portal>
    </Layout>
  );
};

export default Write;
