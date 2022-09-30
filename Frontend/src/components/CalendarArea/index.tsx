/* eslint-disable react/require-default-props */
import CalendarCaoursel from './CalendarCourousel';
import StyledContainer from './style';

interface DateType {
  year: number;
  month: number;
  date: number;
}

interface CalendarAreaProps {
  // eslint-disable-next-line no-unused-vars
  handleClickDate?: (selectedDate: DateType) => void;
  className?: string;
  handleClickReset?: () => void;
}
//
const CalendarArea = ({ handleClickDate, handleClickReset, className }: CalendarAreaProps) => (
  <StyledContainer className={className}>
    <CalendarCaoursel initDate={new Date()} itemGap={26} showingCardNum={1} hiddenCardNum={2} handleClickDate={handleClickDate} handleClickReset={handleClickReset} />
  </StyledContainer>
);
export default CalendarArea;
