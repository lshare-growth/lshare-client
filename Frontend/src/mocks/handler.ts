/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import {
  landingStudyResponse,
  studiesResponse,
  topSearchedTagsResponse,
  noticesResponse,
  mainNoticeResponse,
  studyDetailResponses,
  likesResponses,
  studyDetailTagsResponses,
  loginUrlResponse,
  commentsResponse,
} from './data';

const NOTICE_ID = 1;
const handlers = [
  rest.get('api/oauth/login', (req, res, ctx) => res(ctx.status(200), ctx.json(loginUrlResponse))),
  rest.get('api/oauth/callback/github?code=:code', (req, res, ctx) => res(ctx.status(200))),
  rest.get('api/studies/landing?page=:pageIndex&size=:sizeNum', (req, res, ctx) => res(ctx.status(200), ctx.json(landingStudyResponse))),
  rest.get('api/hashtags/top-searched-hashtags', (req, res, ctx) => res(ctx.status(200), ctx.json(topSearchedTagsResponse))),
  rest.get('api/studies?page=:pageIndex&size=:sizeNum', (req, res, ctx) => res(ctx.status(200), ctx.json(studiesResponse))),
  rest.get('api/notices?page=:pageIndex&size=:sizeNum', (req, res, ctx) => res(ctx.status(200), ctx.json(noticesResponse))),
  rest.get(`api/notices/${NOTICE_ID}`, (req, res, ctx) => res(ctx.status(200), ctx.json(mainNoticeResponse))),
  rest.get('api/studies/:studyIndex', (req, res, ctx) => res(ctx.status(200), ctx.json(studyDetailResponses[1]))),
  rest.get('api/likes/study/:studyIndex', (req, res, ctx) => res(ctx.status(200), ctx.json(likesResponses[0]))),
  rest.get('api/hashtags/study/:studyIndex', (req, res, ctx) => res(ctx.status(200), ctx.json(studyDetailTagsResponses[0]))),
  rest.get('api/comments/study/:currentId?page=:pageIndex&size=:sizeNum', (req, res, ctx) => res(ctx.status(200), ctx.json(commentsResponse))),
];

export default handlers;
