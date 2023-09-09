import { INestApplication } from '@nestjs/common';
import { validateUUID } from '@shared/modules/uuid/uuid';
import fakeData from '@test/fakeData';
import { StudyRequestOptions } from '@test/types';
import request from 'supertest';

export interface CreateGroupOptions extends StudyRequestOptions {
  data?: any;
}

export const createGroup = (
  app: INestApplication,
  { accessToken, studyId, data = fakeData.group() }: CreateGroupOptions,
) =>
  request(app.getHttpServer())
    .post('/groups/create')
    .query({
      studyId,
    })
    .send(data)
    .set('Authorization', `Bearer ${accessToken}`);

export const createGroupId = (
  app: INestApplication,
  { accessToken, studyId, data }: CreateGroupOptions,
) =>
  new Promise<string>((resolve, reject) => {
    createGroup(app, { accessToken, studyId, data })
      .expect(201)
      .then((res) => {
        expect(validateUUID(res.text)).toBeTruthy();
        resolve(res.text);
      })
      .catch((err) => reject(err));
  });
