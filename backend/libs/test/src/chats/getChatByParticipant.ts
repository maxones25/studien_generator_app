import { INestApplication } from '@nestjs/common';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { getParticipantById } from '@test/participants/getParticipantById';
import { StudyRequestOptions } from '@test/types';
import request from 'supertest';

export interface GetChatByParticipantOptions extends StudyRequestOptions {
  participantId: string;
}

export const getChatByParticipant = (
  app: INestApplication,
  { accessToken, studyId, participantId }: GetChatByParticipantOptions,
) =>
  new Promise<string>((resolve, reject) => {
    getParticipantById(app, { accessToken, studyId, participantId })
      .expect(200)
      .then((res) => {
        expect(validateUUID(res.body.chat.id)).toBeTruthy();
        resolve(res.body.chat.id);
      })
      .catch(reject);
  });
