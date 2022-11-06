import { atom } from 'recoil';

const showingInputValueState = atom({
  key: 'showingInputValueState',
  default: '',
});

export default showingInputValueState;
