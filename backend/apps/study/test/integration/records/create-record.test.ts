import { createApp, getParticipantAccessToken } from '@test/utils';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@study/app.module';
import request from 'supertest';
import { TEST_PARTICIPANT } from '@test/testData';
import { LoginParticipantDto } from '@study/modules/auth/dtos/LoginParticipantDto';
import { CreatePushDto } from '@study/modules/push/dto/createPushDto';
import { CreateRecordDto } from '@study/modules/records/dtos/createRecordDto';

describe('login participant', () => {
  let app: INestApplication;
  let participant: LoginParticipantDto;
  let accessToken: string;
  let record: CreateRecordDto;

  beforeAll(async () => {
    app = await createApp(AppModule);

    participant = {
      id: TEST_PARTICIPANT.ID,
      password: TEST_PARTICIPANT.PASSWORD,
    }

    accessToken = await getParticipantAccessToken(app, participant);
  });

  // it('should create push successfully', async () => {
  //   await request(app.getHttpServer())
  //     .post('/record')
  //     .set('Authorization', `Bearer ${accessToken}`)
  //     .send(createPushDto)
  //     .expect(201);

  //   return request(app.getHttpServer())
  //     .get('/push')
  //     .set('Authorization', `Bearer ${accessToken}`)
  //     .expect(200).then((res) => {
  //       expect(typeof res.body.subscription).toBe('string');
  //     })
  // });

  it('should fail because accessToken is invalid', async () => {
    return request(app.getHttpServer())
      .post('/records')
      .set('Authorization', `Bearer 123`)
      .send(record)
      .expect(401);
  });

  it('should fail because record is invalid', async () => {
    return request(app.getHttpServer())
      .post('/records')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(record)
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});