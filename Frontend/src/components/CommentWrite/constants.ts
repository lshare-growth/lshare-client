// TODO: 타입 구체화
export const sizes: any = {
  medium: {
    avatarSize: 'small',
    commentSize: 'medium',
    buttonSize: 'medium',
  },
  small: {
    avatarSize: 'xsmall',
    commentSize: 'small',
    buttonSize: 'small',
  },
};

export const getDate = () =>
  `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;

export const ERROR_MSG = '댓글을 게시하지 못했습니다.';
