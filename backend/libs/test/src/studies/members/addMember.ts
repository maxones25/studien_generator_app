import { INestApplication } from '@nestjs/common';
import { RequestOptions } from '../../types';
import request from 'supertest';
import { Role } from '@entities/core/study';

export interface AddMemberOptions extends RequestOptions {
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
