import { createApp, getMessagesParticipant, getParticipantAccessToken } from '@test/utils';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@study/app.module';
import request from 'supertest';
import { TEST_CHAT, TEST_PARTICIPANT } from '@test/testData';
import { LoginParticipantDto } from '@study/modules/auth/dtos/LoginParticipantDto';
import faker from '@test/fakeData'; 

describe('update message receipts', () => {
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

  it('should update message receipt successfully', async () => {
    const readMessagesDto = {
      readAt: new Date(),
    }
    return request(app.getHttpServer())
      .put('/chat')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(readMessagesDto)
      .expect(200).then((res) => {
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
