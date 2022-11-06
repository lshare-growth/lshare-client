import { atom } from 'recoil';

const keywordsState = atom<string[]>({
  key: 'keywordsState',
  default: [],
});

export default keywordsState;
