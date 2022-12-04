import { commentsInfos } from '@customTypes/comments';
import { getHeaders } from '@utils/auth';
import api from './core';

const headers = getHeaders();

export const getComments = async (studyId: number, pageIndex: number) => {
  const { data } = await api.get<commentsInfos>(`api/comments/study/${studyId}?page=${pageIndex}&size=10`, headers);
  return data;
};
