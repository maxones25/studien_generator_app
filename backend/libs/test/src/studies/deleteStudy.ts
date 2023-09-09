import { INestApplication } from '@nestjs/common';
import { StudyRequestOptions } from '../types';
import request from 'supertest';

export interface DeleteStudyOptions extends StudyRequestOptions {
  hardDelete?: boolean;
}

export const deleteStudy = (
  app: INestApplication,
  { accessToken, studyId, hardDelete = true }: DeleteStudyOptions,
) =>
  request(app.getHttpServer())
    .post(`/studies/delete`)
    .query({ studyId })
    .set('Authorization', `Bearer ${accessToken}`)
    .send({ hardDelete });
