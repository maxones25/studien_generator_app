import { StudyRequestOptions } from '@test/types';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export interface GetStudiesOptions extends StudyRequestOptions {}

export const getStudyAppointments = (
  app: INestApplication,
  { accessToken, studyId }: GetStudiesOptions,
) => {
  const action = request(app.getHttpServer()).get(`/studies/appointments`);

  if (accessToken !== undefined) {
    action.set('Authorization', `Bearer ${accessToken}`);
  }

  if (studyId !== undefined) {
    action.query({ studyId });
  }

  return action;
};
