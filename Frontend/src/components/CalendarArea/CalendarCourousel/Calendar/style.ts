import styled, { css } from 'styled-components';

import { FullDateProps } from './index';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CalendarTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 16px 0;
`;

const calendarWeekConater = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  padding: 0;
`;

export const WeekContainer = styled.ul`
  ${calendarWeekConater}
`;

const textCenter = css`
  text-align: center;
`;

export const WeekDayItemContainer = styled.ul`
  ${calendarWeekConater}
`;

export const WeekDayItem = styled.li`
  ${textCenter}
`;

export const DayItem = styled.li<{
  checkIn: FullDateProps;
  checkOut: FullDateProps;
  isSelectedDatePoint: boolean;
  isSelectedDateRange: boolean;
  isAciveMonth: boolean;
}>`
  ${textCenter}
  :hover {
    background-color: ${({ theme }) => theme.colors.accent.initial};
  }
  background-color: ${({ isSelectedDatePoint, isAciveMonth, theme }) =>
    isSelectedDatePoint && isAciveMonth ? theme.colors.titlePlaceholder : ''};
  background-color: ${({ isSelectedDateRange, isAciveMonth, theme }) =>
    isSelectedDateRange && isAciveMonth ? theme.colors.line : ''};
  color: ${({ isAciveMonth, theme }) =>
    isAciveMonth ? theme.colors.title : theme.colors.default.disabled};
  pointer-events: ${({ isAciveMonth }) => (isAciveMonth ? 'all' : 'none')};
  border-radius: 50%;
  margin: 10px;
  cursor: pointer;
`;
