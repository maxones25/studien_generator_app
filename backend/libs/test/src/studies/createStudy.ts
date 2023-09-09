import { INestApplication } from '@nestjs/common';
import { StudyRequestOptions } from '../types';
import request from 'supertest';
import fakeData from '@test/fakeData';

export interface CreateStudyOptions
  extends Omit<StudyRequestOptions, 'studyId'> {
  data?: object;
}

export const createStudy = (
  app: INestApplication,
  { accessToken, data = fakeData.study() }: CreateStudyOptions,
) =>
  request(app.getHttpServer())
    .post(`/studies/create`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send(data);

export const createStudyId = (
  app: INestApplication,
  { accessToken, data }: CreateStudyOptions,
) =>
  new Promise<string>((resolve, reject) => {
    createStudy(app, { accessToken, data })
      .expect(201)
      .then((res) => resolve(res.text))
      .catch((err) => reject(err));
  });
