import { atom } from 'recoil';

type keyType = 'id' | 'type' | 'content';
type dropDownItemType = Record<keyType, any>;

const dropDownItemState = atom<dropDownItemType[]>({
  key: 'dropDownItemState',
  default: [],
});

export default dropDownItemState;
