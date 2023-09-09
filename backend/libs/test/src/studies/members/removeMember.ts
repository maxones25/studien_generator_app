import { INestApplication } from '@nestjs/common';
import { RequestOptions } from '../../types';
import request from 'supertest';

export interface RemoveMemberOptions extends RequestOptions {
  directorId: string;
}

export const removeMember = (
  app: INestApplication,
  { accessToken, studyId, directorId }: RemoveMemberOptions,
) =>
  request(app.getHttpServer())
    .post(`/members/remove`)
    .query({ studyId, directorId })
    .set('Authorization', `Bearer ${accessToken}`);
