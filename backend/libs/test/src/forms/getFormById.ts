import { IApp } from '@test/app/createApp';
import { StudyRequestOptions } from '@test/types';
import request from 'supertest';

export interface GetFormByIdOptions extends StudyRequestOptions {
  formId: any;
}

export const getFormById = (
  app: IApp,
  { accessToken, formId, studyId }: GetFormByIdOptions,
) => {
  const r = request(app.getHttpServer()).get(`/forms/create`);

  if (accessToken !== undefined) {
    r.set('Authorization', `Bearer ${accessToken}`);
  }

  const qs: any = {};

  if (studyId !== undefined) {
    qs.studyId = studyId;
  }

  if (formId !== undefined) {
    qs.formId = formId;
  }

  if (Object.keys(qs).length > 0) {
    r.query(qs);
  }

  return r;
};
