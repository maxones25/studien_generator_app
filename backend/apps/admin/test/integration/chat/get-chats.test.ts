import { createApp } from '@test/utils';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@admin/app.module';
import { TEST_DIRECTOR } from '@test/testData';
import { createParticipantId } from '@test/participants/createParticipant';
import { createStudyId } from '@test/studies/createStudy';
import { getChatByParticipant } from '@test/chats/getChatByParticipant';
import { getChats } from '@test/chats/getChats';
import { getDirectorAccessToken } from '@test/auth/loginDirector';

describe('Get Chats', () => {
  let app: INestApplication;
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
        expect(res.body.length).toBe(5);
      });
  });
});
