import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import fakeData from '@test/fakeData';
import {
  createApp,
  createDirector,
  createStudy,
  getDirectorAccessToken,
  getEnv,
} from '@test/utils';
import { TEST_DIRECTOR } from '@test/testData';
import { AppModule } from '@admin/app.module';
import { Roles } from '@admin/modules/roles/roles.enum';
import { ConfigService } from '@nestjs/config';

describe('Get Studies', () => {
  let app: INestApplication;
  let accessToken: string;
  let johnAccessToken: string;
  let studyIds: string[];

  beforeAll(async () => {
    app = await createApp(AppModule);

    const activationPassword = getEnv(app, "ACTIVATION_PASSWORD")

    const director = fakeData.director();

    await createDirector(app, { activationPassword, ...director });

    accessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );

    studyIds = [];
    studyIds.push(await createStudy(app, accessToken, fakeData.study()));
    studyIds.push(await createStudy(app, accessToken, fakeData.study()));
    studyIds.push(await createStudy(app, accessToken, fakeData.study()));

    johnAccessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );

    await createStudy(app, johnAccessToken, fakeData.study());
  });

  it('should get all studies by director', async () => {
    return request(app.getHttpServer())
      .get(`/studies`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBe(3);
        res.body.forEach((study) => {
          expect(studyIds.includes(study.id)).toBeTruthy();
          expect(typeof study.name).toBe('string');
          expect(study.role).toBe(Roles.admin);
        });
      });
  });

  it('should not get studies by another director', async () => {
    return request(app.getHttpServer())
      .get(`/studies`)
      .set('Authorization', `Bearer ${johnAccessToken}`)
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        res.body.forEach((study) => {
          expect(studyIds.includes(study.id)).toBeFalsy();
        });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
