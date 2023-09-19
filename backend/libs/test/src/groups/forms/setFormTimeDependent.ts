import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface SetFormTimeDependentOptions extends StudyRequestOptions {
  formId: any;
}

export const setFormTimeDependent = (
  app: IApp,
  { accessToken, studyId, formId }: SetFormTimeDependentOptions,
) =>
  request(app).command({
    path: '/groups/setFormConfigTimeDependent',
    accessToken,
    query: {
      studyId,
      configId: formId,
    },
  });
