import { atom } from 'recoil';

const loginInfoState = atom({
  key: 'loginInfoState',
  default: '',
});

export default loginInfoState;
