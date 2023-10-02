import { validateUUID } from '@shared/modules/uuid/uuid';
import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import fakeData from '@test/fakeData';
import { StudyRequestOptions } from '@test/types';
import {
  CreateParticipantOptions,
  createParticipant,
} from './createParticipant';

export interface StartParticipantStudyOptions extends StudyRequestOptions {
  participantId: any;
  startDate: any;
  configs: any;
}

export const startParticipantStudy = (
  app: IApp,
  {
    accessToken,
    studyId,
    participantId,
    startDate,
    configs,
  }: StartParticipantStudyOptions,
) =>
  request(app).command({
    path: '/participants/startStudy',
    accessToken,
    query: { studyId, participantId },
    data: { startDate, configs },
  });

export const createParticipantId = (
  app: IApp,
  options: CreateParticipantOptions,
) =>
  new Promise<string>((resolve, reject) => {
    createParticipant(app, options)
      .expect(201)

      .then((res) => {
        expect(validateUUID(res.text)).toBeTruthy();
        resolve(res.text);
      })
      .catch((err) => reject(err));
  });
