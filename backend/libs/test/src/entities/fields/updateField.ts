import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface UpdateFieldOptions extends StudyRequestOptions {
  entityId: string;
  data: any;
}

export const updateField = (
  app: IApp,
  { accessToken, studyId, entityId, data }: UpdateFieldOptions,
) =>
  request(app).command({
    path: '/entities/updateField',
    accessToken,
    query: { studyId, entityId },
    data,
  });
