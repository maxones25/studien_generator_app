import { TEST_DIRECTOR } from '@test/testData';
import { createApp, createStudy, getDirectorAccessToken } from '@test/utils';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@admin/app.module';
import fakeData from '@test/fakeData';
import request from 'supertest';
import { validateUUID } from '@shared/modules/uuid/uuid';

describe('Create Entity', () => {
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

  afterAll(async () => {
    await app.close();
  });

  it('should create an entity with a valid request', () => {
    const entity = fakeData.entity();

    return request(app.getHttpServer())
      .post(`/studies/${studyId}/entities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(entity)
      .expect(201)
      .then((res) => {
        expect(validateUUID(res.text)).toBeTruthy();
      });
  });

  it('should fail because body is empty', () => {
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/entities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({})
      .expect(400);
  });

  it('should fail because name is empty', () => {
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/entities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: '' })
      .expect(400);
  });

  it('should fail because name is not a string', () => {
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/entities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: 123 })
      .expect(400);
  });

  it('should fail because studyId does not exist', () => {
    const studyId = fakeData.id();
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/entities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(fakeData.entity())
      .expect(401);
  });

  it('should fail if entity already exists', async () => {
    const entity = fakeData.entity();

    await request(app.getHttpServer())
      .post(`/studies/${studyId}/entities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(entity)
      .expect(201);

    return request(app.getHttpServer())
      .post(`/studies/${studyId}/entities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(entity)
      .expect(422);
  });

  it('should create entity even if entity already exists in other study', async () => {
    const otherStudyId = await createStudy(app, accessToken, fakeData.study());

    const entity = fakeData.entity();

    await request(app.getHttpServer())
      .post(`/studies/${otherStudyId}/entities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(entity)
      .expect(201);

    return request(app.getHttpServer())
      .post(`/studies/${studyId}/entities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(entity)
      .expect(201);
  });
});
