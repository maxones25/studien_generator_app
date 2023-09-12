import request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { LoginParticipantDto } from '@study/modules/auth/dtos/LoginParticipantDto';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateEntityDto } from '@admin/entities/entities/dtos/CreateEntityDto';
import { CreatePushDto } from '@study/modules/push/dto/CreatePushDto';
import { MessageDto } from '@study/modules/chat/dtos/MessageDto';

export const createApp = async (AppModule: any) => {
  // if (global.__APP__) return global.__APP__;

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();

  app.useGlobalPipes(new ValidationPipe());

  await app.init();

  // global.__APP__ = app;

  return app;
};

export const createEntity = (
  app: INestApplication,
  accessToken: string,
  studyId: string,
  data: CreateEntityDto,
) =>
  new Promise<string>((resolve, reject) => {
    request(app.getHttpServer())
      .post(`/entities/createEntity`)
      .query({ studyId })
      .set('Authorization', `Bearer ${accessToken}`)
      .send(data)
      .expect(201)
      .then((res) => resolve(res.text))
      .catch((err) => reject(err));
  });

export const getParticipantAccessToken = (
  app: INestApplication,
  data: LoginParticipantDto,
) =>
  new Promise<string>((resolve, reject) => {
    request(app.getHttpServer())
      .post('/auth/login')
      .send(data)
      .expect(201)
      .then((res) => {
        expect(typeof res.body.accessToken).toEqual('string');
        resolve(res.body.accessToken as string);
      })
      .catch((err) => reject(err));
  });

export const createPush = (
  app: INestApplication,
  accessToken: string,
  data: CreatePushDto,
) =>
  new Promise<void>((resolve, reject) => {
    request(app.getHttpServer())
      .post('/push')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(data)
      .expect(201)
      .then(() => {
        resolve();
      })
      .catch((err) => reject(err));
  });

export const getMessagesParticipant = (
  app: INestApplication,
  accessToken: string,
) =>
  new Promise<MessageDto[]>((resolve, reject) => {
    request(app.getHttpServer())
      .get('/chat')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
        resolve(res.body);
      })
      .catch((err) => reject(err));
  });
