import { StudyRequestOptions } from '@test/types';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export interface GetStudiesOptions
  extends Omit<StudyRequestOptions, 'studyId'> {}

export const getStudies = (
  app: INestApplication,
  { accessToken }: GetStudiesOptions,
) =>
  request(app.getHttpServer())
    .get(`/studies/getAll`)
    .set('Authorization', `Bearer ${accessToken}`);
