import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/admin.module';
import fakeData from '../../fakeData';
import {
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
  let director3Id: any;
  let director4Id: any;
  let accessToken1: string;
  let accessToken2: string;
  let studyId: string;

  beforeAll(async () => {
    app = await createApp(AppModule);

    const director1 = fakeData.director();
    const director2 = fakeData.director();
    const director3 = fakeData.director();
    const director4 = fakeData.director();
    const study = fakeData.study();

    director1Id = await createDirector(app, {
      ...director1,
      activationPassword: process.env.ACTIVATION_PASSWORD,
    });

    director2Id = await createDirector(app, {
      ...director2,
      activationPassword: process.env.ACTIVATION_PASSWORD,
    });

    director3Id = await createDirector(app, {
      ...director3,
      activationPassword: process.env.ACTIVATION_PASSWORD,
    });

    director4Id = await createDirector(app, {
      ...director4,
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

    await getDirectorAccessToken(app, director3.email, director3.password);

    await getDirectorAccessToken(app, director4.email, director4.password);

    studyId = await createStudy(app, accessToken1, study);
  });

  it('/POST add employee to study successfully', () => {
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/members`)
      .set('Authorization', `Bearer ${accessToken1}`)
      .send({
        directorId: director2Id,
        role: Roles.employee,
      })
      .expect(201);
  });

  it('/POST add admin to study successfully', () => {
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/members`)
      .set('Authorization', `Bearer ${accessToken1}`)
      .send({
        directorId: director3Id,
        role: Roles.admin,
      })
      .expect(201);
  });

  it('/POST add employee to study as employee', () => {
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/members`)
      .set('Authorization', `Bearer ${accessToken2}`)
      .send({
        directorId: director4Id,
        role: Roles.employee,
      })
      .expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
