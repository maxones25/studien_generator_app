import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { StudyRequestOptions } from '@test/types';

export interface WriteMessageOptions extends StudyRequestOptions {
  chatId: string;
  data: any;
}

export const writeMessage = (
  app: INestApplication,
  { accessToken, data, studyId, chatId }: WriteMessageOptions,
) =>
  request(app.getHttpServer())
    .post(`/studies/${studyId}/chats/${chatId}`)
    .send(data)
    .set('Authorization', `Bearer ${accessToken}`);
