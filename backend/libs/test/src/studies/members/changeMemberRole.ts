import { IApp } from '@test/app/createApp';
import { StudyRequestOptions } from '../../types';
import { request } from '@test/app/request';

export interface ChangeMemberRoleOptions extends StudyRequestOptions {
  directorId: string;
  role: any;
}
export const changeMemberRole = (
  app: IApp,
  { accessToken, directorId, role, studyId }: ChangeMemberRoleOptions,
) =>
  request(app).command({
    path: '/members/changeRole',
    accessToken,
    query: { studyId, directorId },
    data: { role },
  });
