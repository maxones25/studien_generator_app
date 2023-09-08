import { INestApplication } from '@nestjs/common';
import { RequestOptions } from '../../types';
import request from 'supertest';

export interface CreateFieldOptions extends RequestOptions {
  entityId: string;
  data: object;
}

export const createField = (
  app: INestApplication,
  { accessToken, studyId, entityId, data }: CreateFieldOptions,
) =>
  request(app.getHttpServer())
    .post(`/entities/addField`)
    .query({
      studyId,
      entityId,
    })
    .set('Authorization', `Bearer ${accessToken}`)
    .send(data);

export const createFieldId = (
  app: INestApplication,
  { accessToken, studyId, entityId, data }: CreateFieldOptions,
) =>
  new Promise<string>((resolve, reject) => {
    createField(app, { accessToken, studyId, entityId, data })
      .expect(201)
      .then((res) => resolve(res.text))
      .catch((err) => reject(err));
  });
