import { TEST_DIRECTOR } from '@test/testData';
import {
  createApp,
  createEntity,
  createStudy,
  getDirectorAccessToken,
} from '@test/utils';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@admin/app.module';
import fakeData from '@test/fakeData';
import request from 'supertest';

describe('Get Entities', () => {
  let app: INestApplication;
  let accessToken: string;
  let studyId: string;
  let entities: string[];

  beforeAll(async () => {
    app = await createApp(AppModule);
    accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );
    studyId = await createStudy(app, accessToken, fakeData.study());

    entities = [];

    for (let i = 0; i < 3; i++) {
      entities.push(
        await createEntity(app, accessToken, studyId, fakeData.entity()),
      );
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return a list of entities for a valid studyId', () => {
    return request(app.getHttpServer())
      .get(`/studies/${studyId}/entities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
        res.body.forEach((entity) => {
          expect(entities.includes(entity.id)).toBeTruthy();
          expect(typeof entity.name).toBe('string');
        });
      });
  });

  it('should fail because studyId is not valid', () => {
    return request(app.getHttpServer())
      .get(`/studies/invalid-id/entities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(401);
  });

  it('should return an empty list if no entities exist for the given studyId', async () => {
    const studyId = await createStudy(app, accessToken, fakeData.study());

    return request(app.getHttpServer())
      .get(`/studies/${studyId}/entities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBe(0);
      });
  });

  it('should only return entites of the given study', async () => {
    const studyId = await createStudy(app, accessToken, fakeData.study());

    const entityId = await createEntity(
      app,
      accessToken,
      studyId,
      fakeData.entity(),
    );

    return request(app.getHttpServer())
      .get(`/studies/${studyId}/entities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBe(1);
        res.body.forEach((entity) => {
          expect(entities.includes(entity.id)).toBeFalsy();
          expect(entity.id).toBe(entityId);
        });
      });
  });
});
