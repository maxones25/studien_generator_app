import { INestApplication } from '@nestjs/common';
import { StudyRequestOptions } from '@test/types';
import request from 'supertest';

export interface ChangeGroupNameOptions extends StudyRequestOptions {
  groupId: string;
  data: any;
}

export const changeGroupName = (
  app: INestApplication,
  { accessToken, studyId, groupId, data }: ChangeGroupNameOptions,
) =>
  request(app.getHttpServer())
    .post('/groups/changeName')
    .query({
      studyId,
      groupId,
    })
    .set('Authorization', `Bearer ${accessToken}`)
    .send(data);
