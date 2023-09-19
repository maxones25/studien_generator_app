import { validateUUID } from '@shared/modules/uuid/uuid';
import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface AddFormToGroupOptions extends StudyRequestOptions {
  formId: any;
  groupId: any;
}

export const addFormToGroup = (
  app: IApp,
  { accessToken, studyId, formId, groupId }: AddFormToGroupOptions,
) =>
  request(app).command({
    path: '/groups/addFormConfig',
    accessToken,
    query: {
      studyId,
      formId,
      groupId,
    },
  });

export const createGroupFormId = (
  app: IApp,
  { accessToken, studyId, formId, groupId }: AddFormToGroupOptions,
) =>
  new Promise((resolve, reject) => {
    addFormToGroup(app, { accessToken, studyId, formId, groupId })
      .expect(201)
      .then((res) => {
        expect(validateUUID(res.body.id)).toBeTruthy();
        resolve(res.body.id);
      })
      .catch(reject);
  });
