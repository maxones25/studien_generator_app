import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface GetFormsOptions extends StudyRequestOptions {}

export const getForms = (
  app: IApp,
  { accessToken, studyId }: GetFormsOptions,
) =>
  request(app).query({
    path: '/forms/getAll',
    accessToken,
    query: { studyId },
  });
