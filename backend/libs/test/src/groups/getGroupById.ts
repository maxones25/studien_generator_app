import { INestApplication } from '@nestjs/common';
import { StudyRequestOptions } from '@test/types';
import request from 'supertest';

export interface GetGroupByIdOptions extends StudyRequestOptions {
  groupId: string;
}

export const getGroupById = (
  app: INestApplication,
  { accessToken, studyId, groupId }: GetGroupByIdOptions,
) =>
  request(app.getHttpServer())
    .get('/groups/getById')
    .query({
      studyId,
      groupId,
    })
    .set('Authorization', `Bearer ${accessToken}`);
