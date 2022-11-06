// import replyType, { keyType } from '@components/types/Comment';
import { atom } from 'recoil';

type replyKeyType =
  | 'id'
  | 'writerId'
  | 'parentId'
  | 'commentId'
  | 'isStudyOrganizer'
  | 'isMyComment'
  | 'nickname'
  | 'time'
  | 'isEditied'
  | 'replyNum'
  | 'commentId'
  | 'content'
  | 'avatorSrc'
  | 'avatorAlt'
  | 'emojis'
  | 'isAuthorized'
  | 'isDeleted';

export type replyType = Record<replyKeyType, any>;

const replyState = atom<replyType[]>({
  key: 'replyState',
  default: [],
});

export default replyState;
