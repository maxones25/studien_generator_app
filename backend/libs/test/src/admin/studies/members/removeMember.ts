import { IApp } from '@test/app/createApp';
import { StudyRequestOptions } from '@test/types';
import { request } from '@test/app/request';

export interface RemoveMemberOptions extends StudyRequestOptions {
  directorId: string;
}

export const removeMember = (
  app: IApp,
  { accessToken, studyId, directorId }: RemoveMemberOptions,
) =>
  request(app).command({
    path: '/members/remove',
    accessToken,
    query: { studyId, directorId },
  });
