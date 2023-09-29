import { validateUUID } from '@shared/modules/uuid/uuid';
import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface AddFormComponentOptions extends StudyRequestOptions {
  pageId: any;
  type: any;
  formFields: any;
  attributes: any;
}

export const addFormComponent = (
  app: IApp,
  {
    accessToken,
    studyId,
    pageId,
    attributes,
    formFields,
    type,
  }: AddFormComponentOptions,
) =>
  request(app).command({
    path: '/forms/addComponent',
    accessToken,
    query: { studyId, pageId },
    data: { attributes, formFields, type },
  });

export const createFormComponentId = (
  app: IApp,
  options: AddFormComponentOptions,
) =>
  new Promise((resolve, reject) => {
    addFormComponent(app, options)
      .expect(201)
      .then((res) => {
        const id = res.text;

        expect(validateUUID(id)).toBe(true);

        resolve(id);
      })
      .catch(reject);
  });
