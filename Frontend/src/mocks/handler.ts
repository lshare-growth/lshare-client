/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { landingStudyResponse, studiesResponse, topSearchedTagsResponse, noticesResponse, mainNoticeResponse, studyDetailResponses, likesResponses, studyDetailTagsResponses } from './data';

const handlers = [
  rest.get('api/studies/landing?page=:pageIndex&size=:sizeNum', (req, res, ctx) => res(ctx.status(200), ctx.json(landingStudyResponse))),
  rest.get('api/hashtags/top-searched-hashtags', (req, res, ctx) => res(ctx.status(200), ctx.json(topSearchedTagsResponse))),
  rest.get('api/studies?page=:pageIndex&size:sizeNum', (req, res, ctx) => res(ctx.status(200), ctx.json(studiesResponse))),
  rest.get('api/notices?page=:pageIndex&size=:sizeNum', (req, res, ctx) => res(ctx.status(200), ctx.json(noticesResponse))),
  rest.get('api/notices/1', (req, res, ctx) => res(ctx.status(200), ctx.json(mainNoticeResponse))),
  rest.get('api/studies/:studyIndex', (req, res, ctx) => res(ctx.status(200), ctx.json(studyDetailResponses[0]))),
  rest.get('api/likes/study/:studyIndex', (req, res, ctx) => res(ctx.status(200), ctx.json(likesResponses[0]))),
  rest.get('api/hashtags/study/:studyIndex', (req, res, ctx) => res(ctx.status(200), ctx.json(studyDetailTagsResponses[0]))),
];

export default handlers;
