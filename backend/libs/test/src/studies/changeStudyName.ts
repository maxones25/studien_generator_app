import { INestApplication } from '@nestjs/common';
import { RequestOptions } from '../types';
import request from 'supertest';

export interface ChangeStudyNameOptions extends RequestOptions {
  data: object;
}

export const changeStudyName = (
  app: INestApplication,
  { accessToken, studyId, data }: ChangeStudyNameOptions,
) =>
  request(app.getHttpServer())
    .post(`/studies/changeName`)
    .query({ studyId })
    .set('Authorization', `Bearer ${accessToken}`)
    .send(data);
