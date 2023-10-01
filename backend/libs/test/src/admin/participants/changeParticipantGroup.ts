import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface ChangeParticipantGroupOptions extends StudyRequestOptions {
  participantId: any;
  groupId: any;
}

export const changeParticipantGroup = (
  app: IApp,
  { accessToken, studyId, participantId, groupId }: ChangeParticipantGroupOptions,
) =>
  request(app).command({
    path: '/participants/changeGroup',
    accessToken,
    query: { studyId, participantId, groupId },
  });
