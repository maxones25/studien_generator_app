import { INestApplication } from '@nestjs/common';
import { IApp } from '@test/app/createApp';
import { StudyRequestOptions } from '@test/types';
import request from 'supertest';

export interface ChangeFormNameOptions extends StudyRequestOptions {
  formId: any;
  data: any;
}

export const changeFormName = (
  app: IApp,
  { accessToken, studyId, formId, data }: ChangeFormNameOptions,
) => {
  const r = request(app.getHttpServer()).post('/forms/changeName');

  if (accessToken !== undefined) {
    r.set('Authorization', `Bearer ${accessToken}`);
  }

  const qs: any = {}

  if (studyId !== undefined) {
    qs.studyId = studyId
  }

  if (formId !== undefined) {
    qs.formId = formId
  }

  if(Object.keys(qs).length > 0) {
    r.query(qs)
  }

  if (data !== undefined) {
    r.send(data);
  }

  return r;
};
