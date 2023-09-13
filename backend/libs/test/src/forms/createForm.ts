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
) => {
  const r = request(app.getHttpServer()).post('/forms/create');

  if (accessToken !== undefined) {
    r.set('Authorization', `Bearer ${accessToken}`);
  }

  if (studyId !== undefined) {
    r.query({
      studyId,
    });
  }

  if (data !== undefined) {
    r.send(data);
  }

  return r;
};

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
