import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface RestoreParticipantOptions extends StudyRequestOptions {
  participantId: any;
}

export const restoreParticipant = (
  app: IApp,
  { accessToken, studyId, participantId }: RestoreParticipantOptions,
) =>
  request(app).command({
    path: '/participants/restore',
    accessToken,
    query: { studyId, participantId },
  });
