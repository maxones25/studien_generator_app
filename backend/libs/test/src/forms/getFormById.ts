import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface GetFormByIdOptions extends StudyRequestOptions {
  formId: any;
}

export const getFormById = (
  app: IApp,
  { accessToken, formId, studyId }: GetFormByIdOptions,
) =>
  request(app).query({
    path: '/forms/getById',
    accessToken,
    query: { studyId, formId },
  });
