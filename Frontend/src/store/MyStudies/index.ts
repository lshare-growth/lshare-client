import { atom } from 'recoil';
import studyType from '@components/types/Studies';

const myStudiesState = atom<studyType[]>({
  key: 'myStudiesState',
  default: [],
});

export default myStudiesState;
