import { INestApplication } from '@nestjs/common';
import { StudyRequestOptions } from '@test/types';
import request from 'supertest';

export interface GetChatsOptions extends StudyRequestOptions {}

export const getChats = (
  app: INestApplication,
  { accessToken, studyId }: GetChatsOptions,
) =>
  request(app.getHttpServer())
    .get(`/studies/${studyId}/chats`)
    .query({
      studyId,
    })
    .set('Authorization', `Bearer ${accessToken}`);
