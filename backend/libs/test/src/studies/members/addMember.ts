import { IApp } from '@test/app/createApp';
import { StudyRequestOptions } from '../../types';
import { request } from '@test/app/request';

export interface AddMemberOptions extends StudyRequestOptions {
  directorId: string;
  role: any;
}

export const addMember = (
  app: IApp,
  { accessToken, studyId, directorId, role }: AddMemberOptions,
) =>
  request(app).command({
    path: '/members/add',
    accessToken,
    query: { studyId, directorId },
    data: { role },
  });
