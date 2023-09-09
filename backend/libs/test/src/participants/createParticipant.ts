import { INestApplication } from '@nestjs/common';
import { validateUUID } from '@shared/modules/uuid/uuid';
import fakeData from '@test/fakeData';
import { StudyRequestOptions } from '@test/types';
import request from 'supertest';

export interface CreateParticipantOptions extends StudyRequestOptions {
  data?: any;
}

export const createParticipant = (
  app: INestApplication,
  {
    accessToken,
    studyId,
    data = fakeData.participant(),
  }: CreateParticipantOptions,
) =>
  request(app.getHttpServer())
    .post(`/participants/create`)
    .query({ studyId })
    .set('Authorization', `Bearer ${accessToken}`)
    .send(data);

export const createParticipantId = (
  app: INestApplication,
  options: CreateParticipantOptions,
) =>
  new Promise<string>((resolve, reject) => {
    createParticipant(app, options)
      .expect(201)

      .then((res) => {
        expect(validateUUID(res.text)).toBeTruthy();
        resolve(res.text);
      })
      .catch((err) => reject(err));
  });
