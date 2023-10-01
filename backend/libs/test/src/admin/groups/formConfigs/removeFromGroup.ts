import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface RemoveFormFromGroupOptions extends StudyRequestOptions {
  formId: any;
}

export const removeFormFromGroup = (
  app: IApp,
  { accessToken, studyId, formId }: RemoveFormFromGroupOptions,
) =>
  request(app).command({
    path: '/groups/removeFormConfig',
    accessToken,
    query: {
      studyId,
      configId: formId,
    },
  });
