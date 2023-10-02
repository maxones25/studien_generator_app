import { AppModule } from '@admin/app.module';
import {
  createMessage,
  getChatByParticipant,
  writeMessage,
} from '@test/admin/chats';
import { readMessages } from '@test/admin/chats/readMessages';
import { unreadMessages } from '@test/admin/chats/unreadMessages';
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

describe('Read Message', () => {
  let app: IApp;
  let accessToken: string;
  let otherAccessToken: string;
  let studyId: string;
  let participantId: string;
  let chatId: string;

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
    }).expect(201);

    participantId = await createParticipantId(app, { accessToken, studyId });

    chatId = await getChatByParticipant(app, {
      accessToken,
      studyId,
      participantId,
    });
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await createMessage(app, {
      accessToken: otherAccessToken,
      studyId,
      chatId,
    });
  });

  it('should read messages', async () => {
    const { text: unreadMessagesBefore } = await unreadMessages(app, {
      accessToken,
      studyId,
    }).expect(200);

    expect(JSON.parse(unreadMessagesBefore)).toBe(1);

    await readMessages(app, { accessToken, studyId, chatId }).expect(200);

    const { text: unreadMessagesAfter } = await unreadMessages(app, {
      accessToken,
      studyId,
    }).expect(200);

    expect(JSON.parse(unreadMessagesAfter)).toBe(0);
  });

  it('should fail because unauthorized', async () => {
    return await readMessages(app, {
      accessToken: undefined,
      studyId,
      chatId,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const adminAccessToken = await getAdminAccessToken(app);
    return await readMessages(app, {
      accessToken: adminAccessToken,
      studyId,
      chatId,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const director = await createDirector(app);
    const otherAccessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );
    return await readMessages(app, {
      accessToken: otherAccessToken,
      studyId,
      chatId,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    return await readMessages(app, {
      accessToken,
      studyId: undefined,
      chatId,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    return await readMessages(app, {
      accessToken,
      studyId: fakeData.text(),
      chatId,
    }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
    return await readMessages(app, {
      accessToken,
      studyId: fakeData.id(),
      chatId,
    }).expect(401);
  });

  it('should fail because chatId is missing', async () => {
    return await readMessages(app, {
      accessToken,
      studyId,
      chatId: undefined,
    }).expect(400);
  });

  it('should fail because chatId is invalid', async () => {
    return await readMessages(app, {
      accessToken,
      studyId,
      chatId: fakeData.text(),
    }).expect(401);
  });

  it('should fail because chatId is unknown', async () => {
    return await readMessages(app, {
      accessToken,
      studyId,
      chatId: fakeData.id(),
    }).expect(401);
  });
});
