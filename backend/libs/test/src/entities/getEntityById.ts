import { StudyRequestOptions } from '@test/types';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export interface GetEntityByIdOptions extends StudyRequestOptions {
  entityId: string;
}

export const getEntityById = (
  app: INestApplication,
  { accessToken, studyId, entityId }: GetEntityByIdOptions,
) =>
  request(app.getHttpServer())
    .get(`/entities/getById`)
    .query({
      studyId,
      entityId,
    })
    .set('Authorization', `Bearer ${accessToken}`);
