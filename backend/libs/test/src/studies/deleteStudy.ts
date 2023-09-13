import { IApp } from '@test/app/createApp';
import { StudyRequestOptions } from '../types';
import { request } from '@test/app/request';

export interface DeleteStudyOptions extends StudyRequestOptions {
  hardDelete?: boolean;
}

export const deleteStudy = (
  app: IApp,
  { accessToken, studyId, hardDelete = true }: DeleteStudyOptions,
) =>
  request(app).command({
    path: '/studies/delete',
    accessToken,
    query: { studyId },
    data: { hardDelete },
  });
