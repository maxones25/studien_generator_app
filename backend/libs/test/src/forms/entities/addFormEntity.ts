import { validateUUID } from '@shared/modules/uuid/uuid';
import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface AddFormEntityRequestOptions extends StudyRequestOptions {
  formId: any;
  entityId: any;
  name: any;
}

export const addFormEntity = (
  app: IApp,
  { accessToken, studyId, entityId, formId, name }: AddFormEntityRequestOptions,
) =>
  request(app).command({
    path: '/forms/addEntity',
    accessToken,
    query: { studyId, entityId, formId },
    data: { name },
  });

export const createFormEntityId = (
  app: IApp,
  options: AddFormEntityRequestOptions,
) =>
  new Promise((resolve, reject) => {
    addFormEntity(app, options)
      .expect(201)
      .then((res) => {
        const id = res.text;
        expect(validateUUID(id)).toBe(true);
        resolve(id);
      })
      .catch(reject);
  });
