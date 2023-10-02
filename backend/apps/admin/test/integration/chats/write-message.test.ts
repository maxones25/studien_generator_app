import { AppModule } from '@admin/app.module';
import { TEST_DIRECTOR } from '@test/testData';
import faker from '@test/fakeData';
import { writeMessage } from '@test/admin/chats/writeMessage';
import { createParticipantId } from '@test/admin/participants/createParticipant';
import { getChatByParticipant } from '@test/admin/chats/getChatByParticipant';
import { getDirectorAccessToken } from '@test/admin/director/auth/loginDirector';
import { IApp, createApp } from '@test/app/createApp';
import { createStudyId } from '@test/admin/studies';
import { getAdminAccessToken } from '@test/admin/director';
import fakeData from '@test/fakeData';

describe('Write Message', () => {
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

  it('should post message successfully', async () => {
    const data = faker.chatMessageAdmin();
    return writeMessage(app, { accessToken, studyId, chatId, data }).expect(
      201,
    );
  });

  it('should fail because unauthorized', async () => {
    const data = faker.chatMessageAdmin();
    return writeMessage(app, {
      accessToken: undefined,
      studyId,
      chatId,
      data,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const data = faker.chatMessageAdmin();
    const adminAccessToken = await getAdminAccessToken(app);
    return writeMessage(app, {
      accessToken: adminAccessToken,
      studyId,
      chatId,
      data,
    }).expect(401);
  });

  it('should fail because director is not part of study', async () => {
    const data = faker.chatMessageAdmin();
    return writeMessage(app, {
      accessToken: otherAccessToken,
      studyId,
      chatId,
      data,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    const data = faker.chatMessageAdmin();
    return writeMessage(app, {
      accessToken,
      studyId: undefined,
      chatId,
      data,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    const data = faker.chatMessageAdmin();
    return writeMessage(app, {
      accessToken,
      studyId: fakeData.text(),
      chatId,
      data,
    }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
    const data = faker.chatMessageAdmin();
    return writeMessage(app, {
      accessToken,
      studyId: fakeData.id(),
      chatId,
      data,
    }).expect(401);
  });

  it('should fail because chatId is missing', async () => {
    const data = faker.chatMessageAdmin();
    return writeMessage(app, {
      accessToken,
      studyId,
      chatId: undefined,
      data,
    }).expect(400);
  });

  it('should fail because chatId is invalid', async () => {
    const data = faker.chatMessageAdmin();
    return writeMessage(app, {
      accessToken,
      studyId,
      chatId: fakeData.text(),
      data,
    }).expect(401);
  });

  it('should fail because chatId is unknown', async () => {
    const data = faker.chatMessageAdmin();
    return writeMessage(app, {
      accessToken,
      studyId,
      chatId: fakeData.id(),
      data,
    }).expect(401);
  });

  it('should fail because content is missing', async () => {
    return writeMessage(app, {
      accessToken,
      studyId,
      chatId,
      data: {},
    }).expect(400);
  });

  it('should fail because content is empty', async () => {
    return writeMessage(app, {
      accessToken,
      studyId,
      chatId,
      data: { content: '' },
    }).expect(400);
  });
});
