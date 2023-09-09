import { INestApplication } from '@nestjs/common';
import { StudyRequestOptions } from '@test/types';
import request from 'supertest';

export interface DeleteGroupOptions extends StudyRequestOptions {
  groupId: string;
  hardDelete?: boolean;
}

export const deleteGroup = (
  app: INestApplication,
  { accessToken, studyId, groupId, hardDelete = true }: DeleteGroupOptions,
) =>
  request(app.getHttpServer())
    .post('/groups/delete')
    .query({
      studyId,
      groupId,
    })
    .set('Authorization', `Bearer ${accessToken}`)
    .send({ hardDelete });
