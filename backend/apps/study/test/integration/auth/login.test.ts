import { createApp } from '@test/utils';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@study/app.module';
import fakeData from '@test/fakeData';
import { JwtService } from '@nestjs/jwt';
import request from 'supertest';
import { TEST_CHAT, TEST_GROUP, TEST_PARTICIPANT, TEST_STUDY } from '@test/testData';
import { LoginParticipantDto } from '@study/modules/auth/dtos/LoginParticipantDto';

describe('login participant', () => {
  let app: INestApplication;
  let participant: LoginParticipantDto;
  let studyId: string;
  let groupId: string;
  let chatId: string;

  beforeAll(async () => {
    app = await createApp(AppModule);

    participant = {
      id: TEST_PARTICIPANT.ID,
      password: TEST_PARTICIPANT.PASSWORD,
    };

    studyId = TEST_STUDY.MAIN;

    groupId = TEST_GROUP.ID;

    chatId = TEST_CHAT.ID

  });

  it('should login participant successfully', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(participant)
      .expect(201)
      .then((res) => {
        expect(typeof res.body.accessToken).toEqual('string');
        const jwtService = app.get(JwtService);
        const payload = jwtService.verify(res.body.accessToken);
        expect(payload.participantId).toBe(participant.id);
        expect(payload.studyId).toBe(studyId);
        expect(payload.groupId).toBe(groupId);
        expect(payload.chatId).toBe(chatId);
      });
  });

  it('should fail because id is empty', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        id: '',
        password: participant.password,
      })
      .expect(400);
  });

  it('should fail because id is not a string', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        id: 123,
        password: participant.password,
      })
      .expect(400);
  });

  it('should fail because password is empty', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        id: participant.id,
        password: '',
      })
      .expect(400);
  });

  it('should fail because password is not a string', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        id: participant.id,
        password: true,
      })
      .expect(400);
  });

  it('should fail because id is missing', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        password: participant.password,
      })
      .expect(400);
  });

  it('should fail because password is missing', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        id: participant.id,
      })
      .expect(400);
  });

  it('should fail because password is missing', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        id: participant.id,
      })
      .expect(400);
  });

  it('should fail because id does not exist', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        id: fakeData.id(),
        password: participant.password,
      })
      .expect(401);
  });

  it('should fail because password is wrong', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        id: participant.id,
        password: '0123456789CD'
      })
      .expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
