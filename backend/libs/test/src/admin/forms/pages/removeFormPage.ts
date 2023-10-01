import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface RemoveFormPageOptions extends StudyRequestOptions {
  pageId: any;
}

export const removeFormPage = (
  app: IApp,
  { accessToken, studyId, pageId }: RemoveFormPageOptions,
) =>
  request(app).command({
    path: '/forms/removePage',
    accessToken,
    query: { studyId, pageId },
  });
