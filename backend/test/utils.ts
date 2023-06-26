import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { SignupDirectorDto } from '../src/modules/auth/dtos/SignupDirectorDto';
import { CreateStudyDto } from '../src/modules/studies/dtos/createStudyDto';
import { GroupDto } from '../src/modules/groups/dtos/groupDto';
import { ParticipantDto } from '../src/modules/participants/dtos/participantDto';

export const createDirector = (
  app: INestApplication,
  data: SignupDirectorDto,
) =>
  new Promise<string>((resolve, reject) => {
    request(app.getHttpServer())
      .post('/auth/directors/signUp')
      .send(data)
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty('id');
        resolve(res.body.id as string);
      })
      .catch((err) => reject(err));
  });

export const deleteDirector = (app: INestApplication, accessToken: string) =>
  new Promise<void>((resolve, reject) => {
    request(app.getHttpServer())
      .delete('/directors')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then(() => {
        resolve();
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
      .post('/auth/directors/login')
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
        expect(typeof res.body.id).toBe('string');
        resolve(res.body.id);
      })
      .catch((err) => reject(err));
  });

export const deleteStudy = (
  app: INestApplication,
  accessToken: string,
  studyId: string,
) => new Promise<void>((resolve, reject) => {
    request(app.getHttpServer())
      .delete(`/studies/${studyId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then(() => {
        resolve();
      })
      .catch((err) => reject(err));
  });

export const createGroup = (
    app: INestApplication,
    accessToken: string,
    studyId: string,
    data: GroupDto,
  ) => 
    new Promise<string>((resolve, reject) => {
      request(app.getHttpServer())
        .post(`/studies/${studyId}/groups`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(data)
        .expect(201)
        .then((res) => {
          expect(typeof res.body.id).toBe('string');
          resolve(res.body.id);
        })
        .catch((err) => reject(err));
  });

export const createParticipant = (
  app: INestApplication,
  accessToken: string,
  studyId: string,
  groupId: string,
  data: ParticipantDto,
  ) => 
    new Promise<string>((resolve, reject) => {
      request(app.getHttpServer())
        .post(`/studies/${studyId}/groups/${groupId}/participants`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(data)
        .expect(201)
        .then((res) => {
          expect(typeof res.body.id).toBe('string');
          resolve(res.body.id);
        })
        .catch((err) => reject(err));
  });