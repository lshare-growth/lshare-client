/* eslint-disable react/require-default-props */
/* eslint-disable no-use-before-define */
import { useState } from 'react';

import Calendar from './Calendar';
import { LAST_MONTH, INCREASED_YEAR, INCREASED_MONTH, INCREASED_SLIDE_X_COUNT, INITIAL_MOVE_X_COUNT, FIRST_MONTH, MONTH_LENGTH, DECREASE_YEAR, DECREASE_MONTH, SLIDE_ACTION } from './constants';

import * as S from './style';

interface CalendarCaourselProps {
  initDate: Date;
  itemGap: number;
  showingCardNum: number;
  hiddenCardNum: number;
  // eslint-disable-next-line no-unused-vars, react/require-default-props
  handleClickDate?: (selectedDate: DateType) => void;
  handleClickReset?: () => void;
}

interface SlideAction {
  isSliding: boolean;
  actionType: typeof SLIDE_ACTION[keyof typeof SLIDE_ACTION];
}

interface DateType {
  year: number;
  month: number;
  date: number;
}

export interface SelectedDateType {
  year: number;
  month: number;
  date: number;
  isSelectedDone?: boolean;
}

const CalendarCaoursel = ({ initDate, itemGap, showingCardNum, hiddenCardNum, handleClickDate, handleClickReset }: CalendarCaourselProps) => {
  const initYear = initDate.getFullYear();
  const initMonth = initDate.getMonth();
  const slideCardsLength = showingCardNum + hiddenCardNum;

  const [activeMonth, setActiveMonth] = useState(initMonth);
  const [slideXCount, setSlideXCount] = useState(INITIAL_MOVE_X_COUNT);
  const [slideAction, setSlideAction] = useState<SlideAction>({
    isSliding: false,
    actionType: SLIDE_ACTION.PAUSE,
  });

  const currentDate = initDate.getDate();

  const [checkIn, setCheckIn] = useState({
    year: initYear,
    month: initMonth,
    date: currentDate,
  });

  const [checkOut, setCheckOut] = useState({
    year: initYear,
    month: initMonth,
    date: currentDate + 1,
    isSelectedDone: false,
  });

  const calendarHeaderDate = getMonthsWithYear(slideCardsLength, activeMonth, initYear);

  const initializeSlideAction = () => setSlideAction({ isSliding: false, actionType: SLIDE_ACTION.PAUSE });

  const handleClickPreviousCalendar = () => {
    setSlideAction({ isSliding: true, actionType: SLIDE_ACTION.LEFT });
    setSlideXCount((prev) => prev - INCREASED_SLIDE_X_COUNT);
  };

  const handleClickNextCalendar = () => {
    setSlideAction({ isSliding: true, actionType: SLIDE_ACTION.RIGHT });
    setSlideXCount((prev) => prev + INCREASED_SLIDE_X_COUNT);
  };

  const handleTransitionEnd = () => {
    setSlideXCount(INITIAL_MOVE_X_COUNT);
    const { isSliding, actionType } = slideAction;
    if (!isSliding) return;
    switch (actionType) {
      case SLIDE_ACTION.LEFT:
        setActiveMonth((prevMonth) => prevMonth - DECREASE_MONTH);
        break;
      case SLIDE_ACTION.RIGHT:
        setActiveMonth((prevMonth) => prevMonth + INCREASED_MONTH);
        break;
      default:
    }
    initializeSlideAction();
  };

  const updateCheckInWhenPriorToCheckIn = ({ year, month, date }: SelectedDateType) => {
    setCheckIn({
      ...checkIn,
      year,
      month,
      date,
    });

    setCheckOut({
      ...checkOut,
      year: 0,
      month: 0,
      date: 0,
      isSelectedDone: false,
    });
  };

  const updateCheckOutWhenWithinRange = ({ year, month, date, isSelectedDone }: SelectedDateType) => {
    setCheckIn({
      ...checkIn,
      year: checkIn.year,
      month: checkIn.month,
      date: checkIn.date,
    });

    setCheckOut({
      ...checkOut,
      year,
      month,
      date,
      isSelectedDone: isSelectedDone !== undefined ? isSelectedDone : checkOut.isSelectedDone,
    });
  };

  const handleClickDay = ({ year, month, date }: SelectedDateType) => {
    const isPossibleYear = checkIn.year <= year;
    const isPossibleMonth = checkIn.month <= month;
    const isResetedCheckIn = checkIn.year === 0 && checkIn.month === 0 && checkIn.date === 0;
    const isResetedCheckOut = checkOut.year === 0 && checkOut.month === 0 && checkOut.date === 0;

    const isOverNewYear = checkIn.year < checkOut.year && checkIn.month > checkOut.month;

    if (!handleClickDate) {
      return;
    }

    handleClickDate({ year, month, date });

    if (isOverNewYear) {
      updateCheckOutWhenWithinRange({
        year,
        month,
        date,
        isSelectedDone: true,
      });
      return;
    }

    if (!isPossibleYear || !isPossibleMonth || checkIn.date > date || isResetedCheckIn) {
      updateCheckInWhenPriorToCheckIn({ year, month, date });
      return;
    }

    if (checkIn.date <= date || isResetedCheckOut) {
      updateCheckOutWhenWithinRange({
        year,
        month,
        date,
        isSelectedDone: true,
      });
    }
  };

  const handleMouseOverDay = ({ year, month, date }: SelectedDateType) => {
    const isResetedCheckIn = checkIn.year === 0 && checkIn.month === 0 && checkIn.date === 0;
    const isResetedCheckOut = checkOut.year === 0 && checkOut.month === 0 && checkOut.date === 0;

    if (isResetedCheckIn || checkOut.isSelectedDone) {
      return;
    }

    // TODO : handleClickDay와 중복제거
    if (checkIn.date <= date || isResetedCheckOut) {
      updateCheckOutWhenWithinRange({ year, month, date });
    }
  };

  const handleMouseLeaveCalendar = () => {
    if (checkOut.isSelectedDone) {
      return;
    }

    setCheckOut({
      ...checkOut,
      year: 0,
      month: 0,
      date: 0,
      isSelectedDone: false,
    });
  };

  const resetCheckInNout = () => {
    setCheckIn({
      ...checkIn,
      year: 0,
      month: 0,
      date: 0,
    });

    setCheckOut({
      ...checkOut,
      year: 0,
      month: 0,
      date: 0,
    });

    if (!handleClickReset) {
      return;
    }
    handleClickReset();
  };

  return (
    <S.CalendarContainer>
      <S.ButtonContainer>
        <S.Button type="button" onClick={handleClickPreviousCalendar} disabled={slideAction.isSliding}>
          {'<'}
        </S.Button>
        <S.Button type="button" onClick={resetCheckInNout}>
          초기화
        </S.Button>
        <S.Button type="button" onClick={handleClickNextCalendar} disabled={slideAction.isSliding}>
          {'>'}
        </S.Button>
      </S.ButtonContainer>
      <S.Wrapper>
        <S.ItemContainer slideXCount={slideXCount} canTransition={slideAction.isSliding} onTransitionEnd={handleTransitionEnd} showingCardNum={showingCardNum}>
          {calendarHeaderDate.map(({ year, month }) => (
            <S.Item key={`activeMonth-${month}`} itemGap={itemGap} showingCardNum={showingCardNum}>
              <Calendar
                month={month}
                year={year}
                handleClickDay={handleClickDay}
                handleMouseOverDay={handleMouseOverDay}
                handleMouseLeaveCalendar={handleMouseLeaveCalendar}
                checkIn={checkIn}
                checkOut={checkOut}
              />
            </S.Item>
          ))}
        </S.ItemContainer>
      </S.Wrapper>
    </S.CalendarContainer>
  );
};

const getMonthsWithYear = (slideCardsLength: number, month: number, year: number) => {
  const calendarHeaderDate = Array.from({ length: slideCardsLength }, (_, index) => {
    const currentMonth = index - 1 + month;
    const monthWithYear = setYearWitMonth(year, currentMonth);
    return monthWithYear;
  });
  return calendarHeaderDate;
};

const isOverMonth = (month: number) => month > LAST_MONTH;

const isUnderMonth = (month: number) => month < FIRST_MONTH;

const setYearWitMonth = (year: number, month: number) => {
  const monthWithYear = { year, month };
  if (isOverMonth(month)) {
    monthWithYear.year = year + INCREASED_YEAR;
    monthWithYear.month = month - MONTH_LENGTH;
  }
  if (isUnderMonth(month)) {
    monthWithYear.year = year - DECREASE_YEAR;
    monthWithYear.month = month + MONTH_LENGTH;
  }
  return monthWithYear;
};

export default CalendarCaoursel;
