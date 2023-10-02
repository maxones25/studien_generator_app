import { IApp, request } from '@test/app';
import { StudyRequestOptions } from '@test/types';

export interface ReadMessagesOptions extends StudyRequestOptions {
  chatId: any;
}

export const readMessages = (
  app: IApp,
  { accessToken, studyId, chatId }: ReadMessagesOptions,
) =>
  request(app).command({
    path: '/chats/readMessages',
    accessToken,
    query: { studyId, chatId },
  });
