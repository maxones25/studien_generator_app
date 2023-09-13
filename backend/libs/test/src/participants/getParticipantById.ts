import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface GetParticipantByIdOptions extends StudyRequestOptions {
  participantId: string;
}

export const getParticipantById = (
  app: IApp,
  { accessToken, studyId, participantId }: GetParticipantByIdOptions,
) =>
  request(app).query({
    path: '/participants/getById',
    accessToken,
    query: { studyId, participantId },
  });
