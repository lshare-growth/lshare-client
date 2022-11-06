import { atom } from 'recoil';
import DateType from '@components/types/CalendarArea';

const datesState = atom<DateType[]>({
  key: 'datesState',
  default: [],
});

export default datesState;
