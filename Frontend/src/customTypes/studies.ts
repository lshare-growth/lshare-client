export type landingStudy = {
  studyId: number;
  title: string;
  content: string;
  studyOrganizer: string;
  studyStatus: string;
  createdAt: string;
  startDate: string;
  endDate: string;
  currentStudyMemberCount: number;
  maxStudyMemberCount: number;
  progressOfStudy: string;
  district: string;
  commentCount: number;
  viewCount: number;
  likeCount: number;
};

type landingStudyContent = {
  content: landingStudy[];
  first: boolean;
  last: boolean;
  sorted: boolean;
  empty: boolean;
  hasNext: boolean;
};

export type hashTagInfo = {
  hashTagId: number;
  tagName: string;
};

export type studyHashTag = hashTagInfo & {
  studyId: number;
};

export type landingStudyContents = {
  contents: landingStudyContent;
  hashTags: studyHashTag[];
};

export type hashTagContents = {
  hashTagResponses: hashTagInfo[];
};

export type study = {
  studyId: number;
  title: string;
  content: string;
  studyOrganizer: string;
  studyStatus: string;
  createdAt: string;
  startDate: string;
  endDate: string;
  currentStudyMemberCount: number;
  maxStudyMemberCount: number;
  progressOfStudy: string;
  district: string;
  commentCount: number;
  viewCount: number;
  likeCount: number;
};

type studyPageInfos = {
  page: study[];
  sorted: boolean;
  requestPageSize: number;
  currentPageNumber: number;
  totalElementSize: number;
  firstPage: boolean;
  last: boolean;
  empty: boolean;
};

export type studiesInfos = {
  studies: studyPageInfos;
  hashTags: studyHashTag[];
};

type notice = {
  noticeId: number;
  nickName: string;
  profileImageUrl: string;
  noticeTitle: string;
  noticeContent: string;
  createdAt: string;
  lastModifiedAt: string;
};

type noticePageInfo = {
  page: notice[];
  sorted: boolean;
  requestPageSize: number;
  currentPageNumber: number;
  totalElementSize: number;
  firstPage: boolean;
  last: boolean;
  empty: boolean;
};

export type noticesInfos = {
  page: noticePageInfo;
};

export type likes = {
  clicked: string;
};

export type studyDetail = study & {
  studyOrganizerId: number;
  memberProfileImageUrl: string;
};
