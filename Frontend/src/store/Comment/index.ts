import replyType from '@components/types/Comment';
import { atom } from 'recoil';

const commentState = atom<replyType[]>({
  key: 'commentState',
  default: [],
});

export default commentState;
