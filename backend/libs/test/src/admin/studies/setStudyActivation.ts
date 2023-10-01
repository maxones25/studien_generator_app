import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';
import { setStudyStart } from './setStudyStart';
import datetime from '@shared/modules/datetime/datetime';
import { setStudyEnd } from './setStudyEnd';
import { setStudyDuration } from './setStudyDuration';

export interface SetStudyActivationOptions extends StudyRequestOptions {
  isActive: any;
}

export const setStudyActivation = (
  app: IApp,
  { accessToken, studyId, isActive }: SetStudyActivationOptions,
) =>
  request(app).command({
    path: '/studies/setActivation',
    accessToken,
    query: { studyId },
    data: { isActive },
  });

export interface ActivateStudyOptions extends StudyRequestOptions {
  startDate: Date;
  endDate: Date;
  duration: number;
}

export const activateStudy = async (
  app: IApp,
  { accessToken, studyId, startDate, endDate, duration }: ActivateStudyOptions,
) => {
  await setStudyStart(app, {
    accessToken,
    studyId,
    startDate: datetime.formatDate(startDate),
  }).expect(200);

  await setStudyEnd(app, {
    accessToken,
    studyId,
    endDate: datetime.formatDate(endDate),
  }).expect(200);

  await setStudyDuration(app, {
    accessToken,
    studyId,
    duration,
  }).expect(200);

  await setStudyActivation(app, {
    accessToken,
    studyId,
    isActive: true,
  }).expect(200);
};
