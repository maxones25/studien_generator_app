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
import * as request from 'supertest';

describe('Update Entity', () => {
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

  it('should delete an entity when provided a valid studyId and entityId', async () => {
    const entityId = await createEntity(
      app,
      accessToken,
      studyId,
      fakeData.entity(),
    );

    await request(app.getHttpServer())
      .delete(`/studies/${studyId}/entities/${entityId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
        expect(parseInt(res.text)).toBe(1);
      });

    return request(app.getHttpServer())
      .get(`/studies/${studyId}/entities/${entityId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(401);
  });

  it('should fail because studyId is invalid', async () => {
    const entityId = await createEntity(
      app,
      accessToken,
      studyId,
      fakeData.entity(),
    );

    await request(app.getHttpServer())
      .delete(`/studies/invalid-id/entities/${entityId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(401);
  });

  it('should fail because entityId is invalid', async () => {
    await request(app.getHttpServer())
      .delete(`/studies/${studyId}/entities/invalid-id`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(401);
  });

  it('should fail because studyId does not exist', async () => {
    const entityId = await createEntity(
      app,
      accessToken,
      studyId,
      fakeData.entity(),
    );

    await request(app.getHttpServer())
      .delete(`/studies/${fakeData.id()}/entities/${entityId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(401);
  });

  it('should fail because entityId does not exist', async () => {
    await request(app.getHttpServer())
      .delete(`/studies/${studyId}/entities/${fakeData.id()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(401);
  });

  it('should fail because director is not a member of that study', async () => {
    const entityId = await createEntity(
      app,
      accessToken,
      studyId,
      fakeData.entity(),
    );

    const otherAccessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );

    await request(app.getHttpServer())
      .delete(`/studies/${studyId}/entities/${entityId}`)
      .set('Authorization', `Bearer ${otherAccessToken}`)
      .expect(401);
  });
});
