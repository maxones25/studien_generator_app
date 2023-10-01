import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface RemoveParticipantGroupOptions extends StudyRequestOptions {
  participantId: any;
}

export const removeParticipantGroup = (
  app: IApp,
  { accessToken, studyId, participantId }: RemoveParticipantGroupOptions,
) =>
  request(app).command({
    path: '/participants/removeGroup',
    accessToken,
    query: { studyId, participantId },
  });
