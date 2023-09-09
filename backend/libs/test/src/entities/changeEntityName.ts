import { INestApplication } from '@nestjs/common';
import { StudyRequestOptions } from '../types';
import request from 'supertest';

export interface ChangeEntityNameOptions extends StudyRequestOptions {
  entityId: string;
  data: object;
}

export const changeEntityName = (
  app: INestApplication,
  { accessToken, entityId, studyId, data }: ChangeEntityNameOptions,
) =>
  request(app.getHttpServer())
    .post(`/entities/changeName`)
    .query({
      studyId,
      entityId,
    })
    .set('Authorization', `Bearer ${accessToken}`)
    .send(data);
