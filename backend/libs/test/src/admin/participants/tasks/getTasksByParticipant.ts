import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import fakeData from '@test/fakeData';
import { StudyRequestOptions } from '@test/types';

export interface GetTasksByParticipantOptions extends StudyRequestOptions {
  participantId: any;
}

export const getTasksByParticipant = (
  app: IApp,
  { accessToken, studyId, participantId }: GetTasksByParticipantOptions,
) =>
  request(app).query({
    path: '/participants/getTasks',
    accessToken,
    query: { studyId, participantId },
  });
