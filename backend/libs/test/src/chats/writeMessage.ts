import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface WriteMessageOptions extends StudyRequestOptions {
  chatId: string;
  data: any;
}

export const writeMessage = (
  app: IApp,
  { accessToken, data, studyId, chatId }: WriteMessageOptions,
) =>
  request(app).command({
    path: `/studies/${studyId}/chats/${chatId}`,
    accessToken,
    data,
  });
