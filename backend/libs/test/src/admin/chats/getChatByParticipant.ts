import { validateUUID } from '@shared/modules/uuid/uuid';
import { IApp } from '@test/app/createApp';
import { getParticipantById } from '@test/admin/participants/getParticipantById';
import { StudyRequestOptions } from '@test/types';

export interface GetChatByParticipantOptions extends StudyRequestOptions {
  participantId: string;
}

export const getChatByParticipant = (
  app: IApp,
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
