import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface GetEntitiesOptions extends StudyRequestOptions {}

export const getEntities = (
  app: IApp,
  { accessToken, studyId }: GetEntitiesOptions,
) =>
  request(app).query({
    path: `/entities/getAll`,
    accessToken,
    query: { studyId },
  });
