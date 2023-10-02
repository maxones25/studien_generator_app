import { AppModule } from '@admin/app.module';
import datetime from '@shared/modules/datetime/datetime';
import { validateUUID } from '@shared/modules/uuid/uuid';
import {
  createMessage,
  getChatByParticipant,
  getChats,
  getMessages,
  writeMessage,
} from '@test/admin/chats';
import {
  getDirectorAccessToken,
  getAdminAccessToken,
  createDirector,
} from '@test/admin/director';
import { createParticipantId } from '@test/admin/participants';
import { addMember, createStudyId } from '@test/admin/studies';
import { IApp, createApp } from '@test/app';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

describe('get chat messages', () => {
  let app: IApp;
  let accessToken: string;
  let otherAccessToken: string;
  let studyId: string;
  let participantId: string;
  let chatId: string;
  let createdMessages: any[];

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

    await addMember(app, {
      accessToken,
      studyId,
      directorId: TEST_DIRECTOR.JOHN.ID,
      role: 'employee',
    });

    createdMessages = [];

    participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    chatId = await getChatByParticipant(app, {
      accessToken,
      studyId,
      participantId,
    });

    for (let i = 0; i < 6; i++) {
      const token = i % 2 === 0 ? accessToken : otherAccessToken;
      const director = i % 2 === 0 ? TEST_DIRECTOR.MAX : TEST_DIRECTOR.JOHN;
      const message = await createMessage(app, {
        accessToken: token,
        studyId,
        chatId,
      });
      createdMessages.push({ message, director });
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get all messages by chat', async () => {
    return getMessages(app, { accessToken, studyId, chatId })
      .expect(200)
      .then((res) => {
        const messages = res.body;

        expect(Array.isArray(messages)).toBe(true);
        expect(messages.length).toBe(6);

        messages.forEach((message) => {
          const data = createdMessages.find(
            (cm) => cm.message.id === message.id,
          );

          expect(message.id).toBe(data.message.id);
          expect(datetime.isValidDateTime(message.sentAt)).toBe(true);
          expect(message.content).toBe(data.message.content);
          expect(message.participant).toBeNull();
          expect(message.director.id).toBe(data.director.ID);
          expect(typeof message.director.firstName).toBe('string');
          expect(typeof message.director.lastName).toBe('string');
        });
      });
  });

  it('should fail because unauthorized', async () => {
    return getMessages(app, { accessToken: undefined, studyId, chatId }).expect(
      401,
    );
  });

  it('should fail because admin is authorized', async () => {
    const adminAccessToken = await getAdminAccessToken(app);
    return getMessages(app, {
      accessToken: adminAccessToken,
      studyId,
      chatId,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    const director = await createDirector(app);

    const otherAccessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );

    return getMessages(app, {
      accessToken: otherAccessToken,
      studyId,
      chatId,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    return getMessages(app, {
      accessToken,
      studyId: undefined,
      chatId,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    return getMessages(app, {
      accessToken,
      studyId: fakeData.text(),
      chatId,
    }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
    return getMessages(app, {
      accessToken,
      studyId: fakeData.id(),
      chatId,
    }).expect(401);
  });

  it('should fail because chatId is missing', async () => {
    return getMessages(app, {
      accessToken,
      studyId,
      chatId: undefined,
    }).expect(400);
  });

  it('should fail because chatId is invalid', async () => {
    return getMessages(app, {
      accessToken,
      studyId,
      chatId: fakeData.text(),
    }).expect(401);
  });

  it('should fail because chatId is unknown', async () => {
    return getMessages(app, {
      accessToken,
      studyId,
      chatId: fakeData.id(),
    }).expect(401);
  });
});
