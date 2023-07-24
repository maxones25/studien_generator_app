import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/admin.module';
import fakeData from '../../fakeData';
import {
  addMember,
  createApp,
  createDirector,
  createStudy,
  getDirectorAccessToken,
} from '../../utils';
import { Roles } from '../../../src/enums/roles.enum';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let director1Id: any;
  let director2Id: any;
  let accessToken1: string;
  let accessToken2: string;
  let studyId: string;

  beforeAll(async () => {
    app = await createApp(AppModule)

    const director1 = fakeData.director();
    const director2 = fakeData.director();
    const study = fakeData.study();

    director1Id = await createDirector(app, {
      ...director1,
      activationPassword: process.env.ACTIVATION_PASSWORD,
    });

    director2Id = await createDirector(app, {
      ...director2,
      activationPassword: process.env.ACTIVATION_PASSWORD,
    });

    accessToken1 = await getDirectorAccessToken(
      app,
      director1.email,
      director1.password,
    );

    accessToken2 = await getDirectorAccessToken(
      app,
      director2.email,
      director2.password,
    );

    studyId = await createStudy(app, accessToken1, study);
    await addMember(app, accessToken1, studyId, {
      directorId: director2Id,
      role: Roles.employee,
    });
  });

  it('/PUT change last admin to employee', () => {
    return request(app.getHttpServer())
      .put(`/studies/${studyId}/members/${director1Id}`)
      .set('Authorization', `Bearer ${accessToken1}`)
      .send({
        role: Roles.employee,
      })
      .expect(409);
  });

  it('/PUT change employee to admin as employee', () => {
    return request(app.getHttpServer())
      .put(`/studies/${studyId}/members/${director2Id}`)
      .set('Authorization', `Bearer ${accessToken2}`)
      .send({
        role: Roles.admin,
      })
      .expect(401);
  });

  it('/PUT change employee to admin successfully', () => {
    return request(app.getHttpServer())
      .put(`/studies/${studyId}/members/${director2Id}`)
      .set('Authorization', `Bearer ${accessToken1}`)
      .send({
        role: Roles.admin,
      })
      .expect(200);
  });

  it('/PUT change admin to employee successfully', () => {
    return request(app.getHttpServer())
      .put(`/studies/${studyId}/members/${director2Id}`)
      .set('Authorization', `Bearer ${accessToken1}`)
      .send({
        role: Roles.employee,
      })
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
