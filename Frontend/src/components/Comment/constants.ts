import replyType from '@components/types/Comment';
import emojis from '@components/ReactionList/constants';

const replys: replyType[] = [
  {
    id: 1,
    nickname: 'Jun',
    time: '10분',
    isEditied: true,
    replyNum: 2,
    commentId: 2,
    content: '오 저도 참여하고 싶어요',
    avatorSrc: '',
    avatorAlt: '',
    emojis,
    isAuthorized: false,
  },
  {
    id: 2,
    nickname: 'Jay',
    time: '10분',
    isEditied: false,
    replyNum: 7,
    commentId: 3,
    content: '참여 의사 있습니다. 고민해보겠습니다.',
    avatorSrc: '',
    avatorAlt: '',
    emojis,
    isAuthorized: false,
  },
  {
    id: 3,
    nickname: '방태',
    time: '10분',
    isEditied: true,
    replyNum: 3,
    commentId: 4,
    content: '저도 꼭 참여하고 싶어요!',
    avatorSrc: '',
    avatorAlt: '',
    emojis,
    isAuthorized: false,
  },
];

export default replys;
