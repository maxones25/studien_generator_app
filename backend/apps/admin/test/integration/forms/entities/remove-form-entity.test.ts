import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import fakeData from '@test/fakeData';
import {
  createApp,
  createEntity,
  createForm,
  createFormEntity,
  createStudy,
  getDirectorAccessToken,
} from '@test/utils';
import { TEST_DIRECTOR } from '@test/testData';
import { AppModule } from '@admin/app.module';

describe('Remove Form Entity', () => {
  let app: INestApplication;
  let accessToken: string;
  let studyId: string;
  let entityId: string;
  let formId: string;
  let formEntityId: string;

  beforeAll(async () => {
    app = await createApp(AppModule);
    accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );
    studyId = await createStudy(app, accessToken, fakeData.study());
    entityId = await createEntity(app, accessToken, studyId, fakeData.entity());
    formId = await createForm(app, accessToken, studyId, fakeData.form());
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    formEntityId = await createFormEntity(
      app,
      accessToken,
      studyId,
      formId,
      fakeData.formEntity(entityId),
    );
  });

  it('should remove form entity successfully', async () => {
    await request(app.getHttpServer())
      .delete(`/studies/${studyId}/forms/${formId}/entities/${formEntityId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/studies/${studyId}/forms/${formId}/entities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        res.body.forEach((formEntity) => {
          expect(typeof formEntity.id).toBe('string');
          expect(formEntity.id).not.toBe(formEntityId);
        });
      });
  });

  it('should fail because studyId invalid', () => {
    return request(app.getHttpServer())
      .delete(`/studies/invalid-id/forms/${formId}/entities/${formEntityId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(401);
  });

  it('should fail because studyId not exists', () => {
    return request(app.getHttpServer())
      .delete(
        `/studies/${fakeData.id()}/forms/${formId}/entities/${formEntityId}`,
      )
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(401);
  });

  it('should fail because formId invalid', () => {
    return request(app.getHttpServer())
      .delete(`/studies/${studyId}/forms/invalid-id/entities/${formEntityId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(401);
  });

  it('should fail because formId not exists', () => {
    return request(app.getHttpServer())
      .delete(
        `/studies/${studyId}/forms/${fakeData.id()}/entities/${formEntityId}`,
      )
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(401);
  });

  it('should fail because formEntityId invalid', () => {
    return request(app.getHttpServer())
      .delete(`/studies/${studyId}/forms/${formId}/entities/invalid-id`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(401);
  });

  it('should fail because formEntityId not exists', () => {
    return request(app.getHttpServer())
      .delete(`/studies/${studyId}/forms/${formId}/entities/${fakeData.id()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(401);
  });

  it('should fail because director is not member of study', async () => {
    const accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );
    return request(app.getHttpServer())
      .delete(`/studies/${studyId}/forms/${formId}/entities/${formEntityId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(401);
  });
});
