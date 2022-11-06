import { atom } from 'recoil';

const isAlertModalVisibleState = atom({
  key: 'isAlertModalVisibleState',
  default: false,
});

export default isAlertModalVisibleState;
