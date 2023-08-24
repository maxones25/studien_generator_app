import { createApp, createPush, getParticipantAccessToken } from '@test/utils';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@study/app.module';
import request from 'supertest';
import { TEST_PARTICIPANT } from '@test/testData';
import { LoginParticipantDto } from '@study/modules/auth/dtos/LoginParticipantDto';
import { CreatePushDto } from '@study/modules/push/dto/CreatePushDto';

describe('delete push', () => {
  let app: INestApplication;
  let participant: LoginParticipantDto;
  let accessToken: string;
  let createPushDto: CreatePushDto;

  beforeAll(async () => {
    app = await createApp(AppModule);

    participant = {
      id: TEST_PARTICIPANT.ID,
      password: TEST_PARTICIPANT.PASSWORD,
    }

    accessToken = await getParticipantAccessToken(app, participant);

    createPushDto = {
      subscription: TEST_PARTICIPANT.SUBSCRIPTION,
    }
  });

  it('should delete push successfully', async () => {
    await createPush(app, accessToken, createPushDto);

    await request(app.getHttpServer())
      .delete('/push')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    return request(app.getHttpServer())
      .get('/push')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200).then((res) => {
        expect(res.body.subscription).toBeNull();
      })
  });

  it('should fail because accessToken is invalid', async () => {
    return request(app.getHttpServer())
      .delete('/push')
      .set('Authorization', `Bearer 123`)
      .expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});