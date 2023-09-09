import { INestApplication } from '@nestjs/common';
import { StudyRequestOptions } from '@test/types';
import request from 'supertest';

export interface GetParticipantByIdOptions extends StudyRequestOptions {
  participantId: string;
}

export const getParticipantById = (
  app: INestApplication,
  { accessToken, studyId, participantId }: GetParticipantByIdOptions,
) =>
  request(app.getHttpServer())
    .get('/participants/getById')
    .query({
      studyId,
      participantId,
    })
    .set('Authorization', `Bearer ${accessToken}`);
