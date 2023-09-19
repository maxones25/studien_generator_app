import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface GetFormsByGroupOptions extends StudyRequestOptions {
  groupId: any;
  isActive?: any;
  type?: any;
}

export const getFormsByGroup = (
  app: IApp,
  { accessToken, studyId, groupId, isActive, type }: GetFormsByGroupOptions,
) =>
  request(app).query({
    path: '/forms/getByGroup',
    accessToken,
    query: { studyId, groupId, isActive, type },
  });
