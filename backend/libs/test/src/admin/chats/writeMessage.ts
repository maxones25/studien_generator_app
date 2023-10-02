import { validateUUID } from '@shared/modules/uuid/uuid';
import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import fakeData from '@test/fakeData';
import { StudyRequestOptions } from '@test/types';

export interface WriteMessageOptions extends StudyRequestOptions {
  chatId: string;
  data?: any;
}

export const writeMessage = (
  app: IApp,
  { accessToken, data, studyId, chatId }: WriteMessageOptions,
) => {
  return request(app).command({
    path: `/studies/:studyId/chats/:chatId`,
    accessToken,
    params: {
      studyId,
      chatId,
    },
    data,
  });
};

export const createMessage = (
  app: IApp,
  {
    accessToken,
    chatId,
    studyId,
    data = fakeData.chatMessageAdmin(),
  }: WriteMessageOptions,
) =>
  new Promise<any>((resolve, reject) => {
    writeMessage(app, { accessToken, chatId, studyId, data })
      .expect(201)
      .then((res) => {
        const id = res.text;

        expect(validateUUID(id)).toBe(true);

        resolve({ ...data, id });
      })
      .catch(reject);
  });
