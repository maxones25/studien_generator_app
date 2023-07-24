import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SignupDirectorDto } from '../src/modules/auth/admin/dtos/SignupDirectorDto';
import { CreateStudyDto } from '../src/modules/studies/dtos/createStudyDto';
import { AddMemberDto } from '../src/modules/studies/members/dtos/AddMemberDto';
import { CreateGroupDto } from '../src/modules/groups/dtos/CreateGroupDto';
import { ParticipantDto } from '../src/modules/participants/dtos/participantDto';
import { LoginParticipantDto } from '../src/modules/auth/study/dtos/LoginParticipantDto';
import { Test, TestingModule } from '@nestjs/testing';

export const createApp = async (AppModule: any) => {
  if (global.__APP__) return global.__APP__;

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();

  return app;
};

export const getAccessToken = (key: string) => {
  const store = global.__ACCESS_TOKEN__;
  if (typeof store !== 'object') throw new Error('token store not initialized');
  if (typeof store[key] === undefined)
    throw new Error(`token ${key} not found`);
  return store[key];
};

export const createDirector = (
  app: INestApplication,
  data: SignupDirectorDto,
) =>
  new Promise<string>((resolve, reject) => {
    request(app.getHttpServer())
      .post('/auth/signUp')
      .send(data)
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty('id');
        resolve(res.body.id as string);
      })
      .catch((err) => reject(err));
  });

export const getDirectorAccessToken = (
  app: INestApplication,
  email: string,
  password: string,
) =>
  new Promise<string>((resolve, reject) => {
    request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email,
        password,
      })
      .expect(201)
      .then((res) => {
        expect(typeof res.body.accessToken).toBe('string');
        resolve(res.body.accessToken as string);
      })
      .catch((err) => reject(err));
  });

export const createStudy = (
  app: INestApplication,
  accessToken: string,
  data: CreateStudyDto,
) =>
  new Promise<string>((resolve, reject) => {
    request(app.getHttpServer())
      .post('/studies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(data)
      .expect(201)
      .then((res) => {
        expect(typeof res.text).toBe('string');
        resolve(res.text);
      })
      .catch((err) => reject(err));
  });

export const createGroup = (
  app: INestApplication,
  accessToken: string,
  studyId: string,
  data: CreateGroupDto,
) =>
  new Promise<string>((resolve, reject) => {
    request(app.getHttpServer())
      .post(`/studies/${studyId}/groups`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(data)
      .expect(201)
      .then((res) => {
        expect(typeof res.text).toBe('string');
        resolve(res.text);
      })
      .catch((err) => reject(err));
  });

export const createParticipant = (
  app: INestApplication,
  accessToken: string,
  studyId: string,
  data: ParticipantDto,
) =>
  new Promise<LoginParticipantDto>((resolve, reject) => {
    request(app.getHttpServer())
      .post(`/studies/${studyId}/participants`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(data)
      .expect(201)
      .then((res) => {
        expect(typeof res.body.id).toBe('string');
        resolve({ id: res.body.id, password: res.body.password });
      })
      .catch((err) => reject(err));
  });

export const addMember = (
  app: INestApplication,
  accessToken: string,
  studyId: string,
  data: AddMemberDto,
) =>
  new Promise<string>((resolve, reject) => {
    request(app.getHttpServer())
      .post(`/studies/${studyId}/members`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(data)
      .expect(201)
      .then((res) => resolve(res.body))
      .catch((err) => reject(err));
  });
