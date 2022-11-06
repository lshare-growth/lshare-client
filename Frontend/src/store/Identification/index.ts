import { atom } from 'recoil';

const indentificationState = atom<string>({
  key: 'indentificationState',
  default: '',
});

export default indentificationState;
