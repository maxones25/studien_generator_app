import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface ChangeFormNameOptions extends StudyRequestOptions {
  formId: any;
  data: any;
}

export const changeFormName = (
  app: IApp,
  { accessToken, studyId, formId, data }: ChangeFormNameOptions,
) =>
  request(app).command({
    path: '/forms/changeName',
    accessToken,
    query: { studyId, formId },
    data,
  });
