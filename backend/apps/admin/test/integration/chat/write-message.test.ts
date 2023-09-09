import { createApp, getDirectorAccessToken } from '@test/utils';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@admin/app.module';
import { TEST_DIRECTOR } from '@test/testData';
import faker from '@test/fakeData';
import { writeMessage } from '@test/chats/writeMessage';
import { createParticipantId } from '@test/participants/createParticipant';
import { createStudyId } from '@test/studies/createStudy';
import { getChatByParticipant } from '@test/chats/getChatByParticipant';

describe('Write Message', () => {
  let app: INestApplication;
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

  it('should fail because director is not part of study', async () => {
    const data = faker.chatMessageAdmin();
    return writeMessage(app, {
      accessToken: otherAccessToken,
      studyId,
      chatId,
      data,
    }).expect(401);
  });
});
