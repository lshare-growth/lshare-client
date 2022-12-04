import { getHeaders } from '@utils/auth';
import api from './core';

type notice = {
  noticeId: number;
  nickName: string;
  profileImageUrl: string;
  noticeTitle: string;
  noticeContent: string;
  createdAt: string;
  lastModifiedAt: string;
};

const headers = getHeaders();

export const getNotice = async (id: number) => {
  const { data } = await api.get<notice>(`api/notices/${id}`, headers);
  return data;
};
