import { INestApplication } from '@nestjs/common';
import { StudyRequestOptions } from '../../types';
import request from 'supertest';

export interface ChangeMemberRoleOptions extends StudyRequestOptions {
  directorId: string;
  role: any;
}
export const changeMemberRole = (
  app: INestApplication,
  { accessToken, directorId, role, studyId }: ChangeMemberRoleOptions,
) =>
  request(app.getHttpServer())
    .post('/members/changeRole')
    .query({ studyId, directorId })
    .set('Authorization', `Bearer ${accessToken}`)
    .send({ role });
