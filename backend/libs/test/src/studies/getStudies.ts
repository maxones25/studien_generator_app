import { StudyRequestOptions } from '@test/types';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export interface GetEntityByIdOptions
  extends Omit<StudyRequestOptions, 'studyId'> {}

export const getStudies = (
  app: INestApplication,
  { accessToken }: GetEntityByIdOptions,
) =>
  request(app.getHttpServer())
    .get(`/studies/getAll`)
    .set('Authorization', `Bearer ${accessToken}`);
