import { createApp, getParticipantAccessToken } from '@test/utils';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@study/app.module';
import request from 'supertest';
import { TEST_PARTICIPANT } from '@test/testData';
import { LoginParticipantDto } from '@study/modules/auth/dtos/LoginParticipantDto';

describe('get forms', () => {
  let app: INestApplication;
  let participant: LoginParticipantDto;
  let accessToken: string;
  let formId: string;

  beforeAll(async () => {
    app = await createApp(AppModule);

    participant = {
      id: TEST_PARTICIPANT.ID,
      password: TEST_PARTICIPANT.PASSWORD,
    }

    accessToken = await getParticipantAccessToken(app, participant);

  });

  it('should get forms successfully', async () => {
    return request(app.getHttpServer())
      .get('/forms')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200).then((res) => {
        // expect(res.body[0]).toBeDefined();
        // formId = res.body[0].id;
      })
  });

  it('should fail because formId is no uuid ', async () => {
    return request(app.getHttpServer())
      .get(`/forms/123`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(400);
  });

  it('should fail because accessToken is invalid ', async () => {
    return request(app.getHttpServer())
      .get(`/forms/123`)
      .set('Authorization', `Bearer 123`)
      .expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
