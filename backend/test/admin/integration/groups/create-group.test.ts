import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../../src/admin.module';
import fakeData from '@test/fakeData';
import { createApp, createStudy, getDirectorAccessToken } from '@test/utils';
import { validate as validateAsUUID } from 'uuid';
import { TEST_DIRECTOR } from '@test/testData';

describe('create group', () => {
  let app: INestApplication;
  let accessToken: string;
  let studyId: string;

  beforeAll(async () => {
    app = await createApp(AppModule);
    accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );
    studyId = await createStudy(app, accessToken, fakeData.study());
  });

  it('should create a group', () => {
    const group = fakeData.group();
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/groups`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(group)
      .expect(201)
      .then((res) => {
        expect(validateAsUUID(res.text)).toBeTruthy();
      });
  });

  it('should fail because name is missing', () => {
    const group = fakeData.group();
    delete group.name;
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/groups`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(group)
      .expect(400);
  });

  it('should fail because name is empty', () => {
    const group = fakeData.group();
    group.name = '';
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/groups`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(group)
      .expect(400);
  });

  it('should fail because name already exists', async () => {
    const group = fakeData.group();
    await request(app.getHttpServer())
      .post(`/studies/${studyId}/groups`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(group)
      .expect(201);

    return await request(app.getHttpServer())
      .post(`/studies/${studyId}/groups`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(group)
      .expect(422);
  });

  it('should fail because study id is unknown', () => {
    const unknownStudyId = fakeData.id();
    const group = fakeData.group();
    delete group.name;
    return request(app.getHttpServer())
      .post(`/studies/${unknownStudyId}/groups`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(group)
      .expect(401);
  });

  it('should fail because director is not member of study', async () => {
    const johnAccessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );

    const newStudyId = await createStudy(
      app,
      johnAccessToken,
      fakeData.study(),
    );

    const group = fakeData.group();

    return request(app.getHttpServer())
      .post(`/studies/${newStudyId}/groups`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(group)
      .expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
