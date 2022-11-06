import { atom } from 'recoil';

type reactionModalInfoKeyType = 'studyId' | 'isVisible';
type reactionModalInfoType = Record<reactionModalInfoKeyType, any>;
const reactionModalInfoState = atom<reactionModalInfoType>({
  key: 'reactionModalInfoState',
  default: {
    studyId: 0,
    isVisible: false,
  },
});

export default reactionModalInfoState;
