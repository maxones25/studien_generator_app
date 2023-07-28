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
import { validateUUID } from '@shared/modules/uuid/uuid';

describe('Create Entity Field', () => {
  let app: INestApplication;
  let accessToken: string;
  let studyId: string;
  let entityId: string;

  beforeAll(async () => {
    app = await createApp(AppModule);
    accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );
    studyId = await createStudy(app, accessToken, fakeData.study());
    entityId = await createEntity(app, accessToken, studyId, fakeData.entity());
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create an entity field successfully', () => {
    const entityField = fakeData.entityField();

    return request(app.getHttpServer())
      .post(`/studies/${studyId}/entities/${entityId}/fields`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(entityField)
      .expect(201)
      .then((res) => {
        expect(validateUUID(res.text)).toBeTruthy();
      });
  });

  it('should fail because studyId invalid', () => {
    return request(app.getHttpServer())
      .post(`/studies/${false}/entities/${entityId}/fields`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(fakeData.entityField())
      .expect(401);
  });

  it('should fail because entityId invalid', () => {
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/entities/${123}/fields`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(fakeData.entityField())
      .expect(401);
  });

  it('should fail because studyId does not exist', () => {
    return request(app.getHttpServer())
      .post(`/studies/${fakeData.id()}/entities/${entityId}/fields`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(fakeData.entityField())
      .expect(401);
  });

  it('should fail because entityId does not exist', () => {
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/entities/${fakeData.id()}/fields`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(fakeData.entityField())
      .expect(401);
  });

  it('should fail because entityId belongs to other study', async () => {
    const studyId = await createStudy(app, accessToken, fakeData.study());

    return request(app.getHttpServer())
      .post(`/studies/${studyId}/entities/${entityId}/fields`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(fakeData.entityField())
      .expect(401);
  });

  it('should fail because name is missing', async () => {
    const entityField = fakeData.entityField();
    delete entityField.name;
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/entities/${entityId}/fields`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(entityField)
      .expect(400);
  });

  it('should fail because name is empty', async () => {
    const entityField = fakeData.entityField();
    entityField.name = '';
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/entities/${entityId}/fields`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(entityField)
      .expect(400);
  });

  it('should fail because type is empty', async () => {
    const entityField = fakeData.entityField();
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/entities/${entityId}/fields`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ ...entityField, type: '' })
      .expect(400);
  });

  it('should fail because type invalid', async () => {
    const entityField = fakeData.entityField();
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/entities/${entityId}/fields`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ ...entityField, type: 'invalid-type' })
      .expect(400);
  });

  it('should fail because entity field already exists', async () => {
    const entityField = fakeData.entityField();

    await request(app.getHttpServer())
      .post(`/studies/${studyId}/entities/${entityId}/fields`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(entityField)
      .expect(201);

    await request(app.getHttpServer())
      .post(`/studies/${studyId}/entities/${entityId}/fields`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(entityField)
      .expect(422);
  });

  it('should fail because director is not a member of the study', async () => {
    const accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );

    await request(app.getHttpServer())
      .post(`/studies/${studyId}/entities/${entityId}/fields`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(fakeData.entityField())
      .expect(401);
  });
});
