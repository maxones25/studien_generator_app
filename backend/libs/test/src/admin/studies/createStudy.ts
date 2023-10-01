import { IApp } from '@test/app/createApp';
import { StudyRequestOptions } from '@test/types';
import fakeData from '@test/fakeData';
import { request } from '@test/app/request';

export interface CreateStudyOptions
  extends Omit<StudyRequestOptions, 'studyId'> {
  data?: object;
}

export const createStudy = (
  app: IApp,
  { accessToken, data = fakeData.study() }: CreateStudyOptions,
) => request(app).command({ path: '/studies/create', accessToken, data });

export const createStudyId = (
  app: IApp,
  { accessToken, data }: CreateStudyOptions,
) =>
  new Promise<string>((resolve, reject) => {
    createStudy(app, { accessToken, data })
      .expect(201)
      .then((res) => resolve(res.text))
      .catch((err) => reject(err));
  });
