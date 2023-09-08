import { INestApplication } from '@nestjs/common';
import { RequestOptions } from '../types';
import request from 'supertest';

export interface DeleteEntityOptions extends RequestOptions {
  entityId: string;
}

export const deleteEntity = (
  app: INestApplication,
  { accessToken, entityId, studyId }: DeleteEntityOptions,
) =>
  request(app.getHttpServer())
    .post(`/entities/deleteEntity`)
    .query({
      studyId,
      entityId,
    })
    .set('Authorization', `Bearer ${accessToken}`)