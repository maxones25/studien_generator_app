import { INestApplication } from '@nestjs/common';
import { RequestOptions } from '../types';
import request from 'supertest';

export interface CreateStudyOptions extends Omit<RequestOptions, 'studyId'> {
  data: object;
}

export const createStudy = (
  app: INestApplication,
  { accessToken, data }: CreateStudyOptions,
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
