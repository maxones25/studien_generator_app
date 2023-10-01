import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface GetRecordsOptions extends StudyRequestOptions {
  entityId?: string;
  participantId?: string;
  groupId?: string;
  formId?: string;
}

export const getRecords = (
  app: IApp,
  {
    accessToken,
    studyId,
    entityId,
    formId,
    groupId,
    participantId,
  }: GetRecordsOptions,
) =>
  request(app).query({
    path: '/records',
    accessToken,
    query: { studyId, entityId, formId, groupId, participantId },
  });
