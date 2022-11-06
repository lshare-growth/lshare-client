import { atom } from 'recoil';

export type keyType = 'memberId' | 'nickName' | 'notification' | 'profileImage';

type userInfoType = Record<keyType, any>;

const userInfosState = atom<userInfoType>({
  key: 'userInfosState',
  default: {
    memberId: null,
    nickName: '',
    notification: false,
    profileImage: '',
  },
});

export default userInfosState;
