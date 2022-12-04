import { landingStudyContents, hashTagContents, studiesInfos, noticesInfos, likes, studyDetail } from '@customTypes/studies';
import { getHeaders } from '@utils/auth';
import api from './core';

const headers = getHeaders();

// TODO: query string 리팩토링
export const getLandingStudies = async (pageIndex: number) => {
  const { data } = await api.get<landingStudyContents>(`api/studies/landing?page=${pageIndex}&size=10`, headers);
  return data;
};

export const getTopSearchedTags = async () => {
  const { data } = await api.get<hashTagContents>(`api/hashtags/top-searched-hashtags`, headers);
  return data;
};

export const getStudies = async (pageIndex: number, size: number) => {
  const { data } = await api.get<studiesInfos>(`api/studies?page=${pageIndex}&size=${size}`, headers);
  return data;
};

export const getNotices = async (pageIndex: number, size: number) => {
  const { data } = await api.get<noticesInfos>(`api/notices?page=${pageIndex}&size=${size}`, headers);
  return data;
};

export const getTags = async (studyId: number) => {
  const { data } = await api.get<hashTagContents>(`${process.env.END_POINT}api/hashtags/study/${studyId}`, headers);
  return data;
};

export const getLikes = async (studyId: number) => {
  const { data } = await api.get<likes>(`api/likes/study/${studyId}`, headers);
  return data;
};

export const getStudy = async (studyId: number) => {
  const { data } = await api.get<studyDetail>(`api/studies/${studyId}`, headers);
  return data;
};
