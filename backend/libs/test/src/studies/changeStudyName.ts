import { INestApplication } from '@nestjs/common';
import { StudyRequestOptions } from '../types';
import request from 'supertest';

export interface ChangeStudyNameOptions extends StudyRequestOptions {
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
