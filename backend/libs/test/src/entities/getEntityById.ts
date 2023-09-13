import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface GetEntityByIdOptions extends StudyRequestOptions {
  entityId: string;
}

export const getEntityById = (
  app: IApp,
  { accessToken, studyId, entityId }: GetEntityByIdOptions,
) =>
  request(app).query({
    path: `/entities/getById`,
    accessToken,
    query: { studyId, entityId },
  });
