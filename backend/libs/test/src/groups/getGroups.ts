import { INestApplication } from '@nestjs/common';
import { StudyRequestOptions } from '@test/types';
import request from 'supertest';

export interface GetGroupsOptions extends StudyRequestOptions {}

export const getGroups = (
  app: INestApplication,
  { accessToken, studyId }: GetGroupsOptions,
) =>
  request(app.getHttpServer())
    .get('/groups/getByStudy')
    .query({
      studyId,
    })
    .set('Authorization', `Bearer ${accessToken}`);
