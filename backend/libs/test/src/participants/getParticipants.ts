import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface GetParticipantsOptions extends StudyRequestOptions {
  deleted?: any;
}

export const getParticipants = (
  app: IApp,
  { accessToken, studyId, deleted = false }: GetParticipantsOptions,
) =>
  request(app).query({
    path: '/participants/getByStudy',
    accessToken,
    query: { studyId, deleted },
  });
