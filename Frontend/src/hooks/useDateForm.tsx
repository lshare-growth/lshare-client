/* eslint-disable no-unused-vars */
import { ChangeEvent, useState } from 'react';

type updateShowingInputParams = {
  delimiter: string;
};

type useDateFormType = {
  value: string;
  showingValue: string;
  handleDateChange: (event: ChangeEvent<HTMLInputElement>) => void;
  updateShowingInput: (params: updateShowingInputParams) => void;
};

type monthsKeyType = 'FEB' | 'APR' | 'SEP' | 'DEC';
type monthsType = Record<monthsKeyType, number>;
const months: monthsType = {
  FEB: 2,
  APR: 4,
  SEP: 9,
  DEC: 12,
};

const FIRST_INDEX = 0;
const MONTH_LENGTH = 2;
const DAY_LENGTH = 2;
const YEAR_END = 4;
const MONTH_END = YEAR_END + MONTH_LENGTH;
const DAY_END = MONTH_END + DAY_LENGTH;

const useDateForm = (inintialState = ''): useDateFormType => {
  const [value, setValue] = useState(inintialState);
  const [showingValue, setShowingValue] = useState(inintialState);

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const updateShowingInput = ({ delimiter }: updateShowingInputParams) => {
    const exceptNumber = /[^0-9]/g;
    const numbers = value.replace(exceptNumber, '');

    const year = numbers.slice(FIRST_INDEX, YEAR_END);
    let month = numbers.slice(YEAR_END, MONTH_END);
    let date = numbers.slice(MONTH_END, DAY_END);

    /* Todo: 예외처리를 따로 분리하기 */
    const monthNumber = Number(month);
    const dateNumber = Number(date);

    /**
     * 1 -> 12, 1 두가지 경우가 있어서 monthNumber >= FEB로 필터링
     */
    const isOneDigitMonthExpectDEC = monthNumber >= months.FEB && monthNumber <= months.SEP;

    const isOverLastMonth = monthNumber > months.DEC;
    const isOverAvailableDate = dateNumber >= months.APR && dateNumber <= months.SEP;

    const exceptionCases = {
      'YYYY-MMMtoYYYY-MM': month.length === 1,
    };

    const cases = {
      'YYYY-00': !monthNumber && month.length === 2,
      'YYYY-MM-00': dateNumber < 1 && date.length === 2,
      /**
       * 44-> 04로 처리
       */
      'YYYY-MM-DDtoYYYY-MM-0D': isOverAvailableDate && date.length === 1,
      /**
       *
       * 22 -> 002의 오류가 발생하지 않도록 month.length === 1로 예외처리
       */

      'YYYY-M': isOneDigitMonthExpectDEC && exceptionCases['YYYY-MMMtoYYYY-MM'],
    };

    if (cases['YYYY-M']) {
      month = 0 + month;
    } else if (cases['YYYY-00']) {
      month = '01';
    } else if (isOverLastMonth) {
      month = `${months.DEC}`;
    }

    if (cases['YYYY-MM-00']) {
      date = '01';
    } else if (cases['YYYY-MM-DDtoYYYY-MM-0D']) {
      date = 0 + date;
    }

    const lastDay = new Date(Number(year), Number(month), 0);
    const lastDate = lastDay.getDate();

    const isOverLastDate = dateNumber > lastDate;

    if (isOverLastDate) {
      date = lastDate.toString(10);
    }
    /* 예외처리 끝 */

    const fullDate = [];
    if (year) {
      fullDate.push(year);
    }

    if (month) {
      fullDate.push(month);
    }

    if (date) {
      fullDate.push(date);
    }

    setShowingValue(fullDate.join(delimiter));
  };

  return {
    value,
    showingValue,
    handleDateChange,
    updateShowingInput,
  };
};

export default useDateForm;
