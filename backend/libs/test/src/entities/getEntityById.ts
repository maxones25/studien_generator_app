import { StudyRequestOptions } from '@test/types';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export interface GetEntityByIdOptions extends StudyRequestOptions {
  entityId: string;
}

export const getEntityById = (
  app: INestApplication,
  { accessToken, studyId, entityId }: GetEntityByIdOptions,
) => {
  const action = request(app.getHttpServer()).get(`/entities/getById`);

  const qs: any = {};

  if (studyId !== undefined) {
    qs.studyId = studyId;
  }

  if (entityId !== undefined) {
    qs.entityId = entityId;
  }

  if (Object.keys(qs).length > 0) {
    action.query(qs);
  }

  if (accessToken !== undefined) {
    action.set('Authorization', `Bearer ${accessToken}`);
  }

  return action;
};
