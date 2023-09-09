import { StudyRequestOptions } from '@test/types';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export interface GetMembersOptions extends StudyRequestOptions {}

export const getMembers = (
  app: INestApplication,
  { accessToken, studyId }: GetMembersOptions,
) =>
  request(app.getHttpServer())
    .get(`/members/getByStudy`)
    .query({ studyId })
    .set('Authorization', `Bearer ${accessToken}`);
