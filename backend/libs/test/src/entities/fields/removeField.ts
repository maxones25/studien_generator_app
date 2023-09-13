import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface RemoveFieldOptions extends StudyRequestOptions {
  fieldId: any;
}

export const removeField = (
  app: IApp,
  { accessToken, studyId, fieldId }: RemoveFieldOptions,
) =>
  request(app).command({
    path: '/entities/removeField',
    accessToken,
    query: { studyId, fieldId },
  });
