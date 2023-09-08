import { RequestOptions } from '@test/types';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export interface GetEntitiesOptions extends RequestOptions {}

export const getEntities = (
  app: INestApplication,
  { accessToken, studyId }: GetEntitiesOptions,
) =>
  request(app.getHttpServer())
    .get(`/entities/getAll`)
    .query({
      studyId,
    })
    .set('Authorization', `Bearer ${accessToken}`);
