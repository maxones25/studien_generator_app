import request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import { SignupDirectorDto } from '@admin/auth/dtos/SignupDirectorDto';
import { CreateStudyDto } from '@admin/studies/studies/dtos/CreateStudyDto';
import { CreateGroupDto } from '@admin/groups/dtos/CreateGroupDto';
import { ParticipantDto } from '@admin/participants/participants/dtos/CreateParticipantDto';

import { LoginParticipantDto } from '@study/modules/auth/dtos/LoginParticipantDto';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AddMemberDto } from '@admin/studies/members/dtos/AddMemberDto';
import { CreateEntityDto } from '@admin/entities/entities/dtos/CreateEntityDto';
import { CreateFormDto } from '@admin/forms/forms/dtos/CreateFormDto';
import { CreateFormConfigurationDto } from '@admin/forms/configurations/dtos/CreateFormConfigurationDto';
import { CreateFormEntityDto } from '@admin/forms/entities/dtos/CreateFormEntityDto';
import { CreatePushDto } from '@study/modules/push/dto/CreatePushDto';
import { CreateParticipantDto } from '@admin/participants/dtos/CreateParticipantDto';
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

export const getEnv = (app: INestApplication, key: string) => {
  // if (!global.__APP_CONFIG__) {
  //   global.__APP_CONFIG__ = {};
  // } else if (global.__APP_CONFIG__[key]) {
  //   return global.__APP_CONFIG__[key];
  // }
  const configService = app.get(ConfigService);
  const env = configService.get(key);
  // global.__APP_CONFIG__[key] = env;
  return env;
};

export const getDirectorAccessToken = (
  app: INestApplication,
  email: string,
  password: string,
) =>
  new Promise<string>((resolve, reject) => {
    // if (!global.__ACCESS_TOKEN__) {
    //   global.__ACCESS_TOKEN__ = {};
    // } else if (global.__ACCESS_TOKEN__[email]) {
    //   resolve(global.__ACCESS_TOKEN__[email]);
    // }
    request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email,
        password,
      })
      .expect(201)
      .then((res) => {
        expect(typeof res.body.accessToken).toEqual('string');
        // global.__ACCESS_TOKEN__[email] = res.body.accessToken;
        resolve(res.body.accessToken as string);
      })
      .catch((err) => reject(err));
  });

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
        expect(validateUUID(res.text)).toBeTruthy();
        resolve(res.text as string);
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
        expect(validateUUID(res.text)).toBeTruthy();
        resolve(res.text);
      })
      .catch((err) => reject(err));
  });

export const createParticipant = (
  app: INestApplication,
  accessToken: string,
  studyId: string,
  data: CreateParticipantDto,
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
      .post(`/studies/${studyId}/directors`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(data)
      .expect(201)
      .then((res) => resolve(res.body))
      .catch((err) => reject(err));
  });

export const createEntity = (
  app: INestApplication,
  accessToken: string,
  studyId: string,
  data: CreateEntityDto,
) =>
  new Promise<string>((resolve, reject) => {
    request(app.getHttpServer())
      .post(`/studies/${studyId}/entities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(data)
      .expect(201)
      .then((res) => resolve(res.text))
      .catch((err) => reject(err));
  });

export const createForm = (
  app: INestApplication,
  accessToken: string,
  studyId: string,
  data: CreateFormDto,
) =>
  new Promise<string>((resolve, reject) => {
    request(app.getHttpServer())
      .post(`/studies/${studyId}/forms`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(data)
      .expect(201)
      .then((res) => resolve(res.text))
      .catch((err) => reject(err));
  });

// export const createFormConfig = (
//   app: INestApplication,
//   accessToken: string,
//   studyId: string,
//   formId: string,
//   data: CreateFormConfigurationDto,
// ) =>
//   new Promise<string>((resolve, reject) => {
//     request(app.getHttpServer())
//       .post(`/studies/${studyId}/forms/${formId}/configurations`)
//       .set('Authorization', `Bearer ${accessToken}`)
//       .send(data)
//       .expect(201)
//       .then((res) => resolve(res.text))
//       .catch((err) => reject(err));
//   });

export const createFormEntity = (
  app: INestApplication,
  accessToken: string,
  studyId: string,
  formId: string,
  data: CreateFormEntityDto,
) =>
  new Promise<string>((resolve, reject) => {
    request(app.getHttpServer())
      .post(`/studies/${studyId}/forms/${formId}/entities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(data)
      .expect(201)
      .then((res) => {
        expect(validateUUID(res.text)).toBeTruthy();
        resolve(res.text);
      })
      .catch(reject);
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
