import { IApp, request } from '@test/app';
import { StudyRequestOptions } from '@test/types';

export interface UnreadMessagesOptions extends StudyRequestOptions {}

export const unreadMessages = (
  app: IApp,
  { accessToken, studyId }: UnreadMessagesOptions,
) =>
  request(app).query({
    path: '/chats/unreadMessages',
    accessToken,
    query: { studyId },
  });
