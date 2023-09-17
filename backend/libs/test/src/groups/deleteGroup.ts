import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface DeleteGroupOptions extends StudyRequestOptions {
  groupId: string;
  hardDelete?: any;
  deleteRelated?: any;
}

export const deleteGroup = (
  app: IApp,
  {
    accessToken,
    studyId,
    groupId,
    hardDelete = true,
    deleteRelated = false,
  }: DeleteGroupOptions,
) =>
  request(app).command({
    path: '/groups/delete',
    accessToken,
    query: { studyId, groupId },
    data: { hardDelete, deleteRelated },
  });
