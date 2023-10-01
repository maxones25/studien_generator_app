import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface ChangeGroupNameOptions extends StudyRequestOptions {
  groupId: string;
  data: any;
}

export const changeGroupName = (
  app: IApp,
  { accessToken, studyId, groupId, data }: ChangeGroupNameOptions,
) =>
  request(app).command({
    path: '/groups/changeName',
    accessToken,
    query: { studyId, groupId },
    data,
  });
