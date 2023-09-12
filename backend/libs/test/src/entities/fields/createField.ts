import { INestApplication } from '@nestjs/common';
import { StudyRequestOptions } from '../../types';
import request from 'supertest';
import { validateUUID } from '@shared/modules/uuid/uuid';

export interface CreateFieldOptions extends StudyRequestOptions {
  entityId: string;
  data: object;
}

export const createField = (
  app: INestApplication,
  { accessToken, studyId, entityId, data }: CreateFieldOptions,
) =>
  request(app.getHttpServer())
    .post(`/entities/addField`)
    .query({
      studyId,
      entityId,
    })
    .set('Authorization', `Bearer ${accessToken}`)
    .send(data);

export const createFieldId = (
  app: INestApplication,
  { accessToken, studyId, entityId, data }: CreateFieldOptions,
) =>
  new Promise<string>((resolve, reject) => {
    createField(app, { accessToken, studyId, entityId, data })
      .expect(201)
      .then((res) => {
        const { id } = res.body;
        expect(validateUUID(id)).toBeTruthy();
        resolve(id);
      })
      .catch((err) => reject(err));
  });
