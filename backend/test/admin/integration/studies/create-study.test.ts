import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/admin.module';
import fakeData from '../../fakeData';
import { createApp, createDirector, getDirectorAccessToken } from '../../utils';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let directorId: any;
  let accessToken: string;

  beforeAll(async () => {
    app = await createApp(AppModule)

    const director = fakeData.director();

    directorId = await createDirector(app, {
      ...director,
      activationPassword: process.env.ACTIVATION_PASSWORD,
    });

    accessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );
  });

  it('/POST create study successfully', () => {
    const study = fakeData.study();
    return request(app.getHttpServer())
      .post('/studies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(study)
      .expect(201)
      .then((res) => {
        expect(typeof res.body.id).toBe('string');
      });
  });

  it('/POST create study with empty name', () => {
    return request(app.getHttpServer())
      .post('/studies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: '',
      })
      .expect(400);
  });

  it('/POST create study with existing name', () => {
    const study = fakeData.study();

    return request(app.getHttpServer())
      .post('/studies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(study)
      .expect(201)
      .then((res) => {
        expect(typeof res.body.id).toBe('string');

        return request(app.getHttpServer())
          .post('/studies')
          .set('Authorization', `Bearer ${accessToken}`)
          .send(study)
          .expect(422);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
