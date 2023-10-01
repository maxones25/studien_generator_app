import { validateUUID } from '@shared/modules/uuid/uuid';
import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import fakeData from '@test/fakeData';
import { StudyRequestOptions } from '@test/types';

export interface AddFormPageOptions extends StudyRequestOptions {
  formId: any;
}

export const addFormPage = (
  app: IApp,
  { accessToken, studyId, formId }: AddFormPageOptions,
) =>
  request(app).command({
    path: '/forms/addPage',
    accessToken,
    query: { studyId, formId },
  });

export const createFormPage = (app: IApp, options: AddFormPageOptions) =>
  new Promise<string>((resolve, reject) => {
    addFormPage(app, options)
      .expect(201)
      .then((res) => {
        const page = res.body;

        expect(validateUUID(page.id)).toBeTruthy();
        resolve(page.id);
      })
      .catch((err) => reject(err));
  });
