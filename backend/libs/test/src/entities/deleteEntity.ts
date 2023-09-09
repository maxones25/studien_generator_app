import { INestApplication } from '@nestjs/common';
import { StudyRequestOptions } from '../types';
import request from 'supertest';

export interface DeleteEntityOptions extends StudyRequestOptions {
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
    .set('Authorization', `Bearer ${accessToken}`);
