import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface SetFormTimeIndependentOptions extends StudyRequestOptions {
  formId: any;
}

export const setFormTimeIndependent = (
  app: IApp,
  { accessToken, studyId, formId }: SetFormTimeIndependentOptions,
) =>
  request(app).command({
    path: '/forms/setTimeIndependent',
    accessToken,
    query: {
      studyId,
      configId: formId,
    },
  });
