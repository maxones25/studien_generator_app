import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface ChangeParticipantNumberOptions extends StudyRequestOptions {
  participantId: any;
  data: any;
}

export const changeParticipantNumber = (
  app: IApp,
  { accessToken, studyId, participantId, data }: ChangeParticipantNumberOptions,
) =>
  request(app).command({
    path: '/participants/changeNumber',
    accessToken,
    query: { studyId, participantId },
    data,
  });
