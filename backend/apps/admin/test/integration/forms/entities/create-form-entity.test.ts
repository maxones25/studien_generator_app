import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import fakeData from '@test/fakeData';
import {
  createApp,
  createEntity,
  createForm,
  createStudy,
  getDirectorAccessToken,
} from '@test/utils';
import { TEST_DIRECTOR } from '@test/testData';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { AppModule } from '@admin/app.module';

describe.skip('Create Form Entity', () => {
  let app: INestApplication;
  let accessToken: string;
  let studyId: string;
  let entityId: string;
  let formId: string;

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

  it('should create a form entity successfully', () => {
    const name = fakeData.name();
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/forms/${formId}/entities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        entityId,
        name,
      })
      .expect(201)
      .then((res) => {
        expect(validateUUID(res.text)).toBeTruthy();
      });
  });

  it('should fail because studyId invalid', () => {
    const name = fakeData.name();
    return request(app.getHttpServer())
      .post(`/studies/invalid-id/forms/${formId}/entities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        entityId,
        name,
      })
      .expect(401);
  });

  it('should fail because formId invalid', () => {
    const name = fakeData.name();
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/forms/invalid-id/entities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        entityId,
        name,
      })
      .expect(401);
  });

  it('should fail because studyId not exists', () => {
    const name = fakeData.name();
    return request(app.getHttpServer())
      .post(`/studies/${fakeData.id()}/forms/${formId}/entities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        entityId,
        name,
      })
      .expect(401);
  });

  it('should fail because formID not exists', () => {
    const name = fakeData.name();
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/forms/${fakeData.id()}/entities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        entityId,
        name,
      })
      .expect(401);
  });

  it('should fail because entityId missing', () => {
    const name = fakeData.name();
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/forms/${formId}/entities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name,
      })
      .expect(400);
  });

  it('should fail because entityId is empty', () => {
    const name = fakeData.name();
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/forms/${formId}/entities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name,
        entityId: '',
      })
      .expect(400);
  });

  it('should fail because entityId is invalid', () => {
    const name = fakeData.name();
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/forms/${formId}/entities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name,
        entityId: '123',
      })
      .expect(400);
  });

  it('should fail because name is missing', () => {
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/forms/${formId}/entities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        entityId,
      })
      .expect(400);
  });

  it('should fail because name is empty', () => {
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/forms/${formId}/entities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: '',
        entityId,
      })
      .expect(400);
  });

  it('should fail because name is invalid', () => {
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/forms/${formId}/entities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 123,
        entityId,
      })
      .expect(400);
  });
});
