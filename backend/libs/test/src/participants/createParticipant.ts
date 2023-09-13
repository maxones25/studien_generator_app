import { validateUUID } from '@shared/modules/uuid/uuid';
import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import fakeData from '@test/fakeData';
import { StudyRequestOptions } from '@test/types';

export interface CreateParticipantOptions extends StudyRequestOptions {
  data?: any;
}

export const createParticipant = (
  app: IApp,
  {
    accessToken,
    studyId,
    data = fakeData.participant(),
  }: CreateParticipantOptions,
) =>
  request(app).command({
    path: '/participants/create',
    accessToken,
    query: { studyId },
    data,
  });

export const createParticipantId = (
  app: IApp,
  options: CreateParticipantOptions,
) =>
  new Promise<string>((resolve, reject) => {
    createParticipant(app, options)
      .expect(201)

      .then((res) => {
        expect(validateUUID(res.text)).toBeTruthy();
        resolve(res.text);
      })
      .catch((err) => reject(err));
  });
