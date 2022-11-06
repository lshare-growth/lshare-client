/* eslint-disable react/require-default-props */
import Button from '@common/Button';
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
  initDate?: Date;
  handleClickCancel?: () => void;
  handleClickConfirm?: () => void;
  isEditing?: boolean;
}
//
const CalendarArea = ({ handleClickCancel, handleClickConfirm, handleClickDate, handleClickReset, initDate, className, isEditing }: CalendarAreaProps) => (
  <StyledContainer className={className}>
    <CalendarCaoursel initDate={initDate} itemGap={26} showingCardNum={1} hiddenCardNum={2} handleClickDate={handleClickDate} handleClickReset={handleClickReset} isEditing={isEditing} />
  </StyledContainer>
);
export default CalendarArea;
