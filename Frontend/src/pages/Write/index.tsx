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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Icon from '@components/common/Icon';
import CalendarArea from '@components/CalendarArea';
import useMouse from '@hooks/useMouse';
import * as S from './style';

const Write = () => {
  const navigate = useNavigate();
  const INITIAL_DATE_FORM = '0000-00-00';
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
  const [tags] = useRecoilState(tagsState);
  const [dates, setDates] = useState<DateType[]>([
    {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      date: new Date().getDate(),
    },
  ]);
  const [startInputDate, setStartInputDate] = useState('');
  const [endInputDate, setEndInputDate] = useState('');

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
        const response = await axios.get(`${process.env.END_POINT}${DISTRICT_URL}`);
        console.log(response);
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

    const getStudyWay = async () => {
      const STUDY_WAY_URL = 'api/study-supports/process-of-study';
      try {
        const response = await axios.get(`${process.env.END_POINT}${STUDY_WAY_URL}`);

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

    getDistricts();
    getStudyWay();
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
    type dataKeyType = 'studyOrganizer' | 'title' | 'content' | 'startDate' | 'endDate' | 'maxStudyMemberCount' | 'district' | 'progressOfStudy' | 'hashTags';
    type dataType = Record<dataKeyType, any>;
    let newErrorMsg = {
      title: '',
      content: '',
      tags: '',
      maxMember: '',
      date: '',
    };

    const getInputPosting = () => {
      // TODO: studyOrganizer은 사용자로 수정
      const maxStudyMemberCount = Number(maxParticipants);
      let targetDistricts = dropDownItem.find((item) => item.type === 'district');
      if (!targetDistricts) {
        targetDistricts = {
          id: 1,
          type: 'district',
          content: '서울',
        };
      }
      let targetStudyWay = dropDownItem.find((item) => item.type === 'studyWay');
      if (!targetStudyWay) {
        targetStudyWay = {
          id: 3,
          type: 'studyWay',
          content: '온라인/오프라인',
        };
      }
      const apiDistricts = [
        {
          id: 11,
          type: 'SEOUL',
          value: '서울',
        },
        {
          id: 21,
          type: 'BUSAN',
          value: '부산',
        },
        {
          id: 22,
          type: 'DAEGU',
          value: '대구',
        },
        {
          id: 23,
          type: 'INCHEON',
          value: '인천',
        },
        {
          id: 25,
          type: 'DAEJEON',
          value: '대전',
        },
        {
          id: 25,
          type: 'ULSAN',
          value: '울산',
        },
      ];

      const apiMeetings = [
        {
          id: 1,
          type: 'ONLINE',
          value: '온라인',
        },
        {
          id: 2,
          type: 'OFFLINE',
          value: '오프라인',
        },
        {
          id: 3,
          type: 'BOTH',
          value: '온라인/오프라인',
        },
      ];
      const districtData = apiDistricts.find((currentDistrict) => currentDistrict.value === targetDistricts?.content);
      const studyWayData = apiMeetings.find((meeting) => meeting.value === targetStudyWay?.content);

      const data = {
        studyOrganizer: 'HongJungKim-dev', // TODO 임시 데이터 제거
        title,
        content: value,
        startDate: makeFormattedDate(dates[0]),
        endDate: makeFormattedDate(dates[1]),
        maxStudyMemberCount,
        district: districtData?.type,
        progressOfStudy: studyWayData?.type,
        hashTags: tags,
      };

      let titleMsg = '';
      if (title.length < 1) {
        titleMsg = '제목을 입력해주세요.';
      }
      const maxTitleLength = 60;

      if (title.length > maxTitleLength) {
        titleMsg = '제목은 60자까지 가능합니다.';
      }

      const contentMsg = value.length < 1 ? '내용을 입력해주세요.' : '';

      let maxMemberMsg = isNaN(maxStudyMemberCount) ? '인원은 숫자만 입력 가능합니다.' : '';
      const maxMemberNum = 2;
      maxMemberMsg = maxStudyMemberCount < maxMemberNum ? '인원은 2명 이상 가능합니다.' : maxMemberMsg;

      let dateMsg = makeFormattedDate(dates[0]) === INITIAL_DATE_FORM || makeFormattedDate(dates[1]) === INITIAL_DATE_FORM ? '캘린더 버튼을 클릭하여 날짜를 선택해주세요.' : '';
      if (dates[0] && dates[1]) {
        const studyStartDate = new Date(dates[0].year, dates[0].month, dates[0].date);
        const studyEndDate = new Date(dates[1].year, dates[1].month, dates[1].date);
        const startDateMiliSec = studyStartDate.getTime();
        const studyEndDateMiliSec = studyEndDate.getTime();
        dateMsg = startDateMiliSec > studyEndDateMiliSec ? '시작일 이후로 종료일을 설정할 수 있습니다.' : dateMsg;
      }
      const maxTagNum = 8;
      const tagMaxTextLength = 15;
      let tagsMsg = '';

      if (tags.length < 1) {
        tagsMsg = '태그를 입력해주세요.';
      }

      if (tags.length > maxTagNum) {
        tagsMsg = '태그는 최대 8개 가능합니다.';
      }

      const outOfTagLengthMsg = '태그 내용은 15자까지 가능합니다.';

      tagsMsg = tags.find((tag) => tag.length > tagMaxTextLength) ? `${tagsMsg} ${outOfTagLengthMsg}` : tagsMsg;

      newErrorMsg = {
        title: titleMsg,
        tags: tagsMsg,
        maxMember: maxMemberMsg,
        date: dateMsg,
        content: contentMsg,
      };

      setErrorMsg(newErrorMsg);
      return data;
    };

    const postStudy = async (data: dataType) => {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      try {
        const STUDY_URL = 'api/studies';
        const response = await axios.post(`${process.env.END_POINT}${STUDY_URL}`, data, { headers });

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

    const inputPosting = getInputPosting();

    if (newErrorMsg.content || newErrorMsg.date || newErrorMsg.maxMember || newErrorMsg.tags || newErrorMsg.title) {
      return;
    }

    postStudy(inputPosting);

    navigate('/api/studies');
  };

  const handleClickCancel = () => {
    navigate('/api/studies');
  };

  const handleClickDate = (currentDate: DateType) => {
    if (dates.length > 1) {
      setDates([
        dates[0],
        {
          year: currentDate.year,
          month: currentDate.month + 1,
          date: currentDate.date,
        },
      ]);
      return;
    }

    setDates([
      ...dates,
      {
        year: currentDate.year,
        month: currentDate.month + 1,
        date: currentDate.date,
      },
    ]);
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

  return (
    <Layout>
      <S.Container>
        <S.CustomInput id="write-title" label="제목" size="xlarge" value={title} handleChangeValue={handleChangeTitle} />
        {errorMsg?.title && <S.ErrorMessage>{errorMsg?.title}</S.ErrorMessage>}
        <S.CustomSearchTag id="write-tag" label="태그" mode="tag" size="megaLarge" isTagSingly={false} />
        {errorMsg?.tags && <S.ErrorMessage>{errorMsg?.tags}</S.ErrorMessage>}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <S.SelectsContainer>
              <S.Label>지역</S.Label>
              <DropDown width="77px" height="48px" type="district" selectTitle={districts[0].content || ''} options={districts} />
              <S.Selects id="write-max-people" size="xsmall" label="최대인원" isLabelHorizontal value={maxParticipants} handleChangeValue={handleChangeMaxParticipants} placeholder="0" />
              <S.Progress>진행방식</S.Progress>
              <DropDown width="189px" height="48px" type="studyWay" selectTitle={selectTitles[0]} options={options} />
            </S.SelectsContainer>
          </div>
          <div>
            <S.FloatBox>{errorMsg?.maxMember && <S.ErrorMsg>{errorMsg?.maxMember}</S.ErrorMsg>}</S.FloatBox>
          </div>
          <div>
            <S.FloatBox>
              <S.CalendarInputContainer>
                <S.FlexBox>
                  <S.CustomCalendarInput
                    id="write-date-start"
                    placeholder={makeFormattedDate(dates[0])}
                    size="xsmall"
                    mode="calendar"
                    label="시작일"
                    isLabelHorizontal
                    // handleClickDate={handleClickDate}
                    // handleClickReset={handleClickReset}
                    handleChangeValue={handleChangeStartDate}
                    disabled
                  />
                  <S.CustomCalendarInput
                    id="write-date-end"
                    placeholder={makeFormattedDate(dates[1])}
                    size="xsmall"
                    mode="calendar"
                    label="종료일"
                    isLabelHorizontal
                    // handleClickDate={handleClickDate}
                    // handleClickReset={handleClickReset}
                    handleChangeValue={handleChangeEndDate}
                    disabled
                  />
                  <div ref={buttonWrapperRef}>
                    <S.CustomButton size="tiny" handleClick={handleClickCalendar}>
                      <Icon mode="calendar" />
                    </S.CustomButton>
                    <S.CalendarAreaContainer isClicked={isClicked}>
                      <CalendarArea handleClickDate={handleClickDate} handleClickReset={handleClickReset} />
                    </S.CalendarAreaContainer>
                  </div>
                </S.FlexBox>
              </S.CalendarInputContainer>
            </S.FloatBox>
          </div>
        </div>
        <S.FloatBox>{errorMsg?.date && <S.ErrorMsg>{errorMsg?.date}</S.ErrorMsg>}</S.FloatBox>
        <S.CustomTextArea id="write-posting" handleChange={handleChangeValue} value={value} />
        {errorMsg?.content && <S.ErrorMessage>{errorMsg?.content}</S.ErrorMessage>}
        <S.ButtonContainer>
          <S.CustomButton size="small" handleClick={handleClickCancel}>
            취소
          </S.CustomButton>
          <S.CustomButton mode="accent" size="small" handleClick={handleClickSavePosting}>
            저장
          </S.CustomButton>
        </S.ButtonContainer>
      </S.Container>
    </Layout>
  );
};

export default Write;
