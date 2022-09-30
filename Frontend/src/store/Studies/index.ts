import { atom } from 'recoil';
import studyType from '@components/types/Studies';

const studiesState = atom<studyType[]>({
  key: 'studiesState',
  default: [],
});

export default studiesState;
