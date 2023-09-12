import { INestApplication } from '@nestjs/common';
import { validateUUID } from '@shared/modules/uuid/uuid';
import request from 'supertest';

export const getMe = (app: INestApplication, accessToken: any) =>
  request(app.getHttpServer())
    .get(`/directors/me`)
    .set('Authorization', `Bearer ${accessToken}`);

export const getDirectorById = (app: INestApplication, accessToken: string) => new Promise<any>((resolve, reject) => {
  getMe(app, accessToken)
  .expect(200).then(res => {
    const director = res.body;
    expect(validateUUID(director.id)).toBeTruthy();
    resolve(director);
  }).catch(reject);
})
