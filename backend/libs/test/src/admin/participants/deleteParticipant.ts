import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface DeleteParticipantOptions extends StudyRequestOptions {
  participantId: any;
  hardDelete?: any;
}

export const deleteParticipant = (
  app: IApp,
  {
    accessToken,
    studyId,
    participantId,
    hardDelete = true,
  }: DeleteParticipantOptions,
) =>
  request(app).command({
    path: '/participants/delete',
    accessToken,
    query: { studyId, participantId },
    data: {
      hardDelete,
    },
  });
