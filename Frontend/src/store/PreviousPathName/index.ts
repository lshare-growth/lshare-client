import { atom } from 'recoil';

const previousPathNameState = atom({
  key: 'previousPathNameState',
  default: '',
});

export default previousPathNameState;
