import { createApp, getParticipantAccessToken } from '@test/utils';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@study/app.module';
import request from 'supertest';
import { TEST_CHAT, TEST_PARTICIPANT } from '@test/testData';
import { LoginParticipantDto } from '@study/modules/auth/dtos/LoginParticipantDto';

describe('get messages', () => {
  let app: INestApplication;
  let participant: LoginParticipantDto;
  let chatId: string;
  let accessToken: string;

  beforeAll(async () => {
    app = await createApp(AppModule);

    participant = {
      id: TEST_PARTICIPANT.ID,
      password: TEST_PARTICIPANT.PASSWORD,
    }

    chatId = TEST_CHAT.ID;

    accessToken = await getParticipantAccessToken(app, participant);

  });

  it('should get messages successfully', async () => {
    return request(app.getHttpServer())
      .get('/chat')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200).then((res) => {
      });
  });

  afterAll(async () => {
    await app.close();
  });
});