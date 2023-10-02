import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface GetMessagesOptions extends StudyRequestOptions {
  chatId: any;
}

export const getMessages = (
  app: IApp,
  { accessToken, studyId, chatId }: GetMessagesOptions,
) =>
  request(app).query({
    path: `/chats/getMessages`,
    accessToken,
    query: { studyId, chatId },
  });
