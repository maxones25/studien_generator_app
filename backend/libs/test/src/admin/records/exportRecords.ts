import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface ExportRecordsOptions extends StudyRequestOptions {
  columns: any;
  entityId?: string;
  participantId?: string;
  groupId?: string;
  formId?: string;
}

export const exportRecords = (
  app: IApp,
  {
    accessToken,
    studyId,
    columns,
    entityId,
    formId,
    groupId,
    participantId,
  }: ExportRecordsOptions,
) =>
  request(app).command({
    path: '/records/export',
    accessToken,
    query: { studyId, entityId, formId, groupId, participantId },
    data: { entityId, formId, groupId, participantId, columns },
  });
