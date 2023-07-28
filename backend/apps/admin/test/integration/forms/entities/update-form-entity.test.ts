import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import fakeData from '@test/fakeData';
import {
  createApp,
  createEntity,
  createForm,
  createFormEntity,
  createStudy,
  getDirectorAccessToken,
  getEnv,
} from '@test/utils';
import { TEST_DIRECTOR } from '@test/testData';
import { AppModule } from '@admin/app.module';

describe('Update Form Entity', () => {
  let app: INestApplication;
  let accessToken: string;
  let studyId: string;
  let entityId: string;
  let formId: string;
  let formEntityId: string;
  let formEntity: { name: string; entityId: string };

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
    formEntity = fakeData.formEntity(entityId);
    formEntityId = await createFormEntity(
      app,
      accessToken,
      studyId,
      formId,
      formEntity,
    );
  });

  it('should update form entity successfully', async () => {
    const { name } = fakeData.formEntity(entityId);

    await request(app.getHttpServer())
      .put(`/studies/${studyId}/forms/${formId}/entities/${formEntityId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name })
      .expect(200)
      .then((res) => {
        expect(parseInt(res.text)).toBe(1);
      });

    await request(app.getHttpServer())
      .get(`/studies/${studyId}/forms/${formId}/entities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        let found = false;
        res.body.forEach((formEntity) => {
          expect(typeof formEntity.id).toBe('string');
          if (formEntity.id === formEntityId) {
            expect(formEntity.name).toBe(name);
            found = true;
          }
        });
        expect(found).toBeTruthy();
      });
  });

  it('should fail because studyId invalid', () => {
    return request(app.getHttpServer())
      .put(`/studies/invalid-id/forms/${formId}/entities/${formEntityId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: fakeData.name() })
      .expect(401);
  });

  it('should fail because studyId not exists', () => {
    return request(app.getHttpServer())
      .put(`/studies/${fakeData.id()}/forms/${formId}/entities/${formEntityId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: fakeData.name() })
      .expect(401);
  });

  it('should fail because formId invalid', () => {
    return request(app.getHttpServer())
      .put(`/studies/${studyId}/forms/invalid-id/entities/${formEntityId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: fakeData.name() })
      .expect(401);
  });

  it('should fail because formId not exists', () => {
    return request(app.getHttpServer())
      .put(
        `/studies/${studyId}/forms/${fakeData.id()}/entities/${formEntityId}`,
      )
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: fakeData.name() })
      .expect(401);
  });

  it('should fail because formEntityId invalid', () => {
    return request(app.getHttpServer())
      .put(`/studies/${studyId}/forms/${formId}/entities/invalid-id`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: fakeData.name() })
      .expect(401);
  });

  it('should fail because formEntityId not exists', () => {
    return request(app.getHttpServer())
      .put(`/studies/${studyId}/forms/${formId}/entities/${fakeData.id()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: fakeData.name() })
      .expect(401);
  });

  it('should fail because name is missing', () => {
    return request(app.getHttpServer())
      .put(`/studies/${studyId}/forms/${formId}/entities/${formEntityId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({})
      .expect(400);
  });

  it('should fail because name is missing', () => {
    return request(app.getHttpServer())
      .put(`/studies/${studyId}/forms/${formId}/entities/${formEntityId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: '' })
      .expect(400);
  });

  it('should fail because name is missing', () => {
    return request(app.getHttpServer())
      .put(`/studies/${studyId}/forms/${formId}/entities/${formEntityId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: true })
      .expect(400);
  });

  it('should fail because form entity already exists', async () => {
    const otherFormEntityId = await createFormEntity(
      app,
      accessToken,
      studyId,
      formId,
      fakeData.formEntity(entityId),
    );
    return request(app.getHttpServer())
      .put(`/studies/${studyId}/forms/${formId}/entities/${otherFormEntityId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: formEntity.name })
      .expect(422);
  });
});
