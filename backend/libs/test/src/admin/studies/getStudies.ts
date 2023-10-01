import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface GetStudiesOptions
  extends Omit<StudyRequestOptions, 'studyId'> {}

export const getStudies = (app: IApp, { accessToken }: GetStudiesOptions) =>
  request(app).query({ path: '/studies/getAll', accessToken });
