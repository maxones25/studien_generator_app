import { IApp } from '@test/app/createApp';
import { StudyRequestOptions } from '@test/types';
import { request } from '@test/app/request';

export interface ChangeEntityNameOptions extends StudyRequestOptions {
  entityId: string;
  data: object;
}

export const changeEntityName = (
  app: IApp,
  { accessToken, entityId, studyId, data }: ChangeEntityNameOptions,
) =>
  request(app).command({
    path: `/entities/changeName`,
    accessToken,
    query: { studyId, entityId },
    data,
  });
