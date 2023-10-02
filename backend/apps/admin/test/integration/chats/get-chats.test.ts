import { AppModule } from '@admin/app.module';
import datetime from '@shared/modules/datetime/datetime';
import { getChatByParticipant, getChats } from '@test/admin/chats';
import {
  getDirectorAccessToken,
  getAdminAccessToken,
} from '@test/admin/director';
import { createParticipantId } from '@test/admin/participants';
import { createStudyId } from '@test/admin/studies';
import { IApp, createApp } from '@test/app';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

describe('Get Chats', () => {
  let app: IApp;
  let accessToken: string;
  let otherAccessToken: string;
  let studyId: string;
  let participantIds: string[] = [];
  let chatIds: string[] = [];

  beforeAll(async () => {
    app = await createApp(AppModule);

    accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );

    otherAccessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );

    studyId = await createStudyId(app, { accessToken });

    for (let i = 0; i < 5; i++) {
      const participantId = await createParticipantId(app, {
        accessToken,
        studyId,
      });
      participantIds.push(participantId);
      chatIds.push(
        await getChatByParticipant(app, {
          accessToken,
          studyId,
          participantId,
        }),
      );
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('should list all chats by study', async () => {
    return getChats(app, { accessToken, studyId })
      .expect(200)
      .then((res) => {
        const chats = res.body;

        expect(chats.length).toBe(5);

        chats.forEach((chat) => {
          expect(chatIds.includes(chat.id)).toBe(true);
          expect(participantIds.includes(chat.participant.id)).toBe(true);
          expect(typeof chat.participant.number).toBe('string');
          expect(Array.isArray(chat.messages)).toBe(true);
          expect(datetime.isValidDateTime(chat.newestMessage.sentAt)).toBe(
            true,
          );
          expect(chat.unread).toBe(0);
        });
      });
  });

  it('should fail because unauthorized', async () => {
    return getChats(app, { accessToken: undefined, studyId }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const adminAccessToken = await getAdminAccessToken(app);
    return getChats(app, { accessToken: adminAccessToken, studyId }).expect(
      401,
    );
  });

  it('should fail because director is not member of study', async () => {
    return getChats(app, { accessToken: otherAccessToken, studyId }).expect(
      401,
    );
  });

  it('should fail because studyId is missing', async () => {
    return getChats(app, { accessToken, studyId: undefined }).expect(404);
  });

  it('should fail because studyId is invalid', async () => {
    return getChats(app, { accessToken, studyId: fakeData.text() }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
    return getChats(app, { accessToken, studyId: fakeData.id() }).expect(401);
  });
});
