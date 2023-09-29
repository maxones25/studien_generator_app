import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface DeleteFormOptions extends StudyRequestOptions {
  formId: any;
}

export const deleteForm = (
  app: IApp,
  { accessToken, studyId, formId }: DeleteFormOptions,
) =>
  request(app).command({
    path: '/forms/delete',
    accessToken,
    query: { studyId, formId },
  });
