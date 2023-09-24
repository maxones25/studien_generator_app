import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface GetAvailableFormConfigsOptions extends StudyRequestOptions {
  groupId: any;
}

export const getAvailableFormConfigs = (
  app: IApp,
  { accessToken, studyId, groupId }: GetAvailableFormConfigsOptions,
) =>
  request(app).query({
    path: '/groups/getAvailableForms',
    accessToken,
    query: { studyId, groupId },
  });
