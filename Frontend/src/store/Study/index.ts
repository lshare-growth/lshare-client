import { atom } from 'recoil';
import studyType from '@components/types/Studies';

export const initialStudy = {
  id: 0,
  nickName: '',
  time: '',
  title: '',
  content: '',
  tags: [],
  infos: [],
  commentCount: 0,
  viewCount: 0,
  likeCount: 0,
  isRecruiting: false,
  createdDate: '',
  maxStudyMemberCount: 0,
  currentStudyMemberCount: 0,
};

const studyState = atom<studyType>({
  key: 'studyState',
  default: initialStudy,
});

export default studyState;
