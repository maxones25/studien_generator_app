import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface GetFormPagesRequestOptions extends StudyRequestOptions {
  formId: any;
}

export const getFormPages = (
  app: IApp,
  { accessToken, studyId, formId }: GetFormPagesRequestOptions,
) =>
  request(app).query({
    path: '/forms/getPages',
    accessToken,
    query: { studyId, formId },
  });
