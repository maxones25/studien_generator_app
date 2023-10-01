import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface RestoreGroupOptions extends StudyRequestOptions {
  groupId: string;
}

export const restoreGroup = (
  app: IApp,
  { accessToken, studyId, groupId }: RestoreGroupOptions,
) =>
  request(app).command({
    path: '/groups/restore',
    accessToken,
    query: { studyId, groupId },
  });
