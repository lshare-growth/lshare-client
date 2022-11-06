import { atom } from 'recoil';

type reactionsKeyType = 'id' | 'type' | 'value';
export type reactionsType = Record<reactionsKeyType, any>;
const reactionsState = atom<reactionsType[]>({
  key: 'reactionsState',
  default: [],
});

export default reactionsState;
