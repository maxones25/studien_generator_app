import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface RemoveFormComponentOptions extends StudyRequestOptions {
  pageId: any;
  formComponentId: any;
}

export const removeFormComponent = (
  app: IApp,
  { accessToken, studyId, formComponentId, pageId }: RemoveFormComponentOptions,
) =>
  request(app).command({
    path: '/forms/removeComponent',
    accessToken,
    query: { studyId, componentId: formComponentId, pageId },
  });
