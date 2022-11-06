import { atom } from 'recoil';

const isLoginModalVisibleState = atom({
  key: 'isLoginModalVisibleState',
  default: false,
});

export default isLoginModalVisibleState;
