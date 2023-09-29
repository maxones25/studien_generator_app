import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface GetFormComponentsOptions extends StudyRequestOptions {
  pageId: any;
}

export const getFormComponents = (
  app: IApp,
  { accessToken, studyId, pageId }: GetFormComponentsOptions,
) =>
  request(app).query({
    path: '/forms/getComponents',
    accessToken,
    query: { studyId, pageId },
  });
