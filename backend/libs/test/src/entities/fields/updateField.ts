import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface UpdateFieldOptions extends StudyRequestOptions {
  fieldId: string;
  data: any;
}

export const updateField = (
  app: IApp,
  { accessToken, studyId, fieldId, data }: UpdateFieldOptions,
) =>
  request(app).command({
    path: '/entities/updateField',
    accessToken,
    query: { studyId, fieldId },
    data,
  });
