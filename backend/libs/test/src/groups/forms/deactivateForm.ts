import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface ActivateFormOptions extends StudyRequestOptions {
  formId: any;
}

export const deactivateForm = (
  app: IApp,
  { accessToken, studyId, formId }: ActivateFormOptions,
) =>
  request(app).command({
    path: '/groups/deactivateFormConfig',
    accessToken,
    query: {
      studyId,
      configId: formId,
    },
  });
