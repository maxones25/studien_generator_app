import { INestApplication } from '@nestjs/common';
import { StudyRequestOptions } from '../types';
import request from 'supertest';
import fakeData from '@test/fakeData';
import { validateUUID } from '@shared/modules/uuid/uuid';

export interface AddStudyAppointmentOptions extends StudyRequestOptions {
  data?: object;
}

export const createStudyAppointment = (
  app: INestApplication,
  {
    accessToken,
    studyId,
    data = fakeData.appointment(),
  }: AddStudyAppointmentOptions,
) => {
  const action = request(app.getHttpServer()).post(`/studies/create`);

  if (accessToken !== undefined) {
    action.set('Authorization', `Bearer ${accessToken}`);
  }

  if (studyId !== undefined) {
    action.query({ studyId });
  }

  if (data !== undefined) {
    action.send(data);
  }

  return action;
};

export const createStudyAppointmentId = (
  app: INestApplication,
  {
    accessToken,
    studyId,
    data = fakeData.appointment(),
  }: AddStudyAppointmentOptions,
) =>
  new Promise<string>((resolve, reject) => {
    createStudyAppointment(app, { accessToken, studyId, data })
      .expect(201)
      .then((res) => {
        expect(validateUUID(res.text)).toBeTruthy();
        resolve(res.text)
      })
      .catch((err) => reject(err));
  });
