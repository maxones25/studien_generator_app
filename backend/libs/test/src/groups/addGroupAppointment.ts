import { StudyRequestOptions } from '../types';
import fakeData from '@test/fakeData';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';

export interface AddGroupAppointmentOptions extends StudyRequestOptions {
  groupId: any;
  data?: object;
}

export const createGroupAppointment = (
  app: IApp,
  {
    accessToken,
    studyId,
    groupId,
    data = fakeData.appointment(),
  }: AddGroupAppointmentOptions,
) =>
  request(app).command({
    path: '/groups/createAppointment',
    accessToken,
    query: { studyId, groupId },
    data,
  });

export const createGroupAppointmentId = (
  app: IApp,
  {
    accessToken,
    studyId,
    groupId,
    data = fakeData.appointment(),
  }: AddGroupAppointmentOptions,
) =>
  new Promise<string>((resolve, reject) => {
    createGroupAppointment(app, { accessToken, studyId, groupId, data })
      .expect(201)
      .then((res) => {
        expect(validateUUID(res.text)).toBeTruthy();
        resolve(res.text);
      })
      .catch((err) => reject(err));
  });
