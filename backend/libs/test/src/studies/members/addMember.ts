import { INestApplication } from '@nestjs/common';
import { StudyRequestOptions } from '../../types';
import request from 'supertest';

export interface AddMemberOptions extends StudyRequestOptions {
  directorId: string;
  role: any;
}

export const addMember = (
  app: INestApplication,
  { accessToken, studyId, directorId, role }: AddMemberOptions,
) =>
  request(app.getHttpServer())
    .post(`/members/add`)
    .query({ studyId, directorId })
    .set('Authorization', `Bearer ${accessToken}`)
    .send({ role });
