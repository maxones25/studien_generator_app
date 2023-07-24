import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

import { SignupDirectorDto } from '@admin/modules/auth/dtos/SignupDirectorDto';
import { CreateStudyDto } from '@admin/modules/studies/dtos/createStudyDto';
import { CreateGroupDto } from '@admin/modules/groups/dtos/CreateGroupDto';
import { ParticipantDto } from '@admin/modules/participants/dtos/participantDto';
import { AddMemberDto } from '@admin/modules/studies/members/dtos/AddMemberDto';

import { LoginParticipantDto } from '@study/modules/auth/dtos/LoginParticipantDto';

export const createApp = async () => {
  if (global.__APP__) return global.__APP__;
  throw new Error("integration test setup is missing")
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
