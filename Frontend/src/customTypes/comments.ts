type reaction = {
  commentId: number;
  emotion: string;
  count: number;
  reactionClicked: string;
};

type comment = {
  commentId: number;
  commentParentId: number;
  writerId: number;
  writer: string;
  profileImage: string;
  content: string;
  reactions: reaction[];
  createdAt: string;
  lastModifiedAt: string;
  reCommentCount: number;
  deleted: string;
};

export type commentsInfos = {
  content: comment[];
  first: boolean;
  last: boolean;
  sorted: boolean;
  empty: boolean;
  hasNext: boolean;
};
