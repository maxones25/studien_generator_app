import { IApp } from '@test/app/createApp';
import { StudyRequestOptions } from '../types';
import { request } from '@test/app/request';
import fakeData from '@test/fakeData';

export interface CreateEntityOptions extends StudyRequestOptions {
  data?: object;
}

export const createEntity = (
  app: IApp,
  { accessToken, studyId, data = fakeData.entity() }: CreateEntityOptions,
) =>
  request(app).command({
    path: `/entities/createEntity`,
    accessToken,
    query: { studyId },
    data,
  });

export const createEntityId = (
  app: IApp,
  { accessToken, studyId, data = fakeData.entity() }: CreateEntityOptions,
) =>
  new Promise<string>((resolve, reject) => {
    createEntity(app, { accessToken, studyId, data })
      .expect(201)
      .then((res) => resolve(res.text))
      .catch((err) => reject(err));
  });
