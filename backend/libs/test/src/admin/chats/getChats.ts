import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface GetChatsOptions extends StudyRequestOptions {}

export const getChats = (
  app: IApp,
  { accessToken, studyId }: GetChatsOptions,
) =>
  request(app).query({
    path: `/studies/${studyId}/chats`,
    accessToken,
    query: { studyId },
  });
