import { atom } from 'recoil';

type hoverInfosKeyType = 'memberId' | 'nickName' | 'profileImageUrl' | 'introduction' | 'githubLink' | 'district' | 'isFollowing';
type hoverInfosType = Record<hoverInfosKeyType, any>;
const hoverInfosState = atom<hoverInfosType[]>({
  key: 'hoverInfosState',
  default: [],
});

export default hoverInfosState;
