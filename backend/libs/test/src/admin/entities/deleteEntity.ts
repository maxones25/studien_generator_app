import { IApp } from '@test/app/createApp';
import { StudyRequestOptions } from '@test/types';
import { request } from '@test/app/request';

export interface DeleteEntityOptions extends StudyRequestOptions {
  entityId: string;
}

export const deleteEntity = (
  app: IApp,
  { accessToken, entityId, studyId }: DeleteEntityOptions,
) =>
  request(app).command({
    path: `/entities/deleteEntity`,
    accessToken,
    query: { studyId, entityId },
  });
