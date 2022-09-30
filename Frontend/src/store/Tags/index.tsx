import { atom } from 'recoil';

const tagsState = atom<string[]>({
  key: 'tagsState',
  default: [],
});

export default tagsState;
