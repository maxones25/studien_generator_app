import { RequestOptions } from '@test/types';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export interface GetEntityByIdOptions extends RequestOptions {}

export const getStudyById = (
  app: INestApplication,
  { accessToken, studyId }: GetEntityByIdOptions,
) =>
  request(app.getHttpServer())
    .get(`/studies/getById`)
    .query({
      studyId,
    })
    .set('Authorization', `Bearer ${accessToken}`);
