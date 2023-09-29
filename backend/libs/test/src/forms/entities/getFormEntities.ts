import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface GetFormEntitiesOptions extends StudyRequestOptions {
  formId: any;
}

export const getFormEntities = (
  app: IApp,
  { accessToken, studyId, formId }: GetFormEntitiesOptions,
) =>
  request(app).query({
    path: '/forms/getEntities',
    accessToken,
    query: { studyId, formId },
  });
