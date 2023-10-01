import { StudyRequestOptions } from '@test/types';
import fakeData from '@test/fakeData';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';

export interface AddStudyAppointmentOptions extends StudyRequestOptions {
  data?: object;
}

export const createStudyAppointment = (
  app: IApp,
  {
    accessToken,
    studyId,
    data = fakeData.appointment(),
  }: AddStudyAppointmentOptions,
) =>
  request(app).command({
    path: '/studies/createAppointment',
    accessToken,
    query: { studyId },
    data,
  });

export const createStudyAppointmentId = (
  app: IApp,
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
        resolve(res.text);
      })
      .catch((err) => reject(err));
  });
