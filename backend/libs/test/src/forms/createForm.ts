import { INestApplication } from '@nestjs/common';
import { validateUUID } from '@shared/modules/uuid/uuid';
import fakeData from '@test/fakeData';
import { StudyRequestOptions } from '@test/types';
import request from 'supertest';

export interface CreateFormOptions extends StudyRequestOptions {
  data?: any;
}

export const createForm = (
  app: INestApplication,
  { accessToken, studyId, data = fakeData.form() }: CreateFormOptions,
) =>
  request(app.getHttpServer())
    .post('/forms/create')
    .query({
      studyId,
    })
    .send(data)
    .set('Authorization', `Bearer ${accessToken}`);

export const createFormId = (
  app: INestApplication,
  { accessToken, studyId, data }: CreateFormOptions,
) =>
  new Promise<string>((resolve, reject) => {
    createForm(app, { accessToken, studyId, data })
      .expect(201)
      .then((res) => {
        expect(validateUUID(res.text)).toBeTruthy();
        resolve(res.text);
      })
      .catch((err) => reject(err));
  });
