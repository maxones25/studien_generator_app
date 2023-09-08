import { INestApplication } from '@nestjs/common';
import { RequestOptions } from '../types';
import request from 'supertest';

export interface CreateEntityOptions extends RequestOptions {
  data: object;
}

export const createEntity = (
  app: INestApplication,
  { accessToken, studyId, data }: CreateEntityOptions,
) =>
  request(app.getHttpServer())
    .post(`/entities/createEntity`)
    .query({
      studyId,
    })
    .send(data)
    .set('Authorization', `Bearer ${accessToken}`);

export const createEntityId = (
  app: INestApplication,
  { accessToken, studyId, data }: CreateEntityOptions,
) =>
  new Promise<string>((resolve, reject) => {
    createEntity(app, { accessToken, studyId, data })
      .expect(201)
      .then((res) => resolve(res.text))
      .catch((err) => reject(err));
  });
