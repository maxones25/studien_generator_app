import { validateUUID } from '@shared/modules/uuid/uuid';
import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import fakeData from '@test/fakeData';
import { StudyRequestOptions } from '@test/types';

export interface CreateFormOptions extends StudyRequestOptions {
  data?: any;
}

export const createForm = (
  app: IApp,
  { accessToken, studyId, data = fakeData.form() }: CreateFormOptions,
) => request(app).command({ path: "/forms/create", accessToken, query: { studyId }, data })

export const createFormId = (
  app: IApp,
  { accessToken, studyId, data }: CreateFormOptions,
) =>
  new Promise<string>((resolve, reject) => {
    createForm(app, { accessToken, studyId, data })
      .expect(201)
      .then((res) => {
        expect(validateUUID(res.text)).toBeTruthy();
        resolve(res.text);
      })
      .catch((err) => reject(err));
  });
