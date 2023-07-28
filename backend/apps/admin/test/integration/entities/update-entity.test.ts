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

describe('Update Entity', () => {
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

  it('should update an entity when provided a valid studyId and entityId', async () => {
    const newData = fakeData.entity();

    await request(app.getHttpServer())
      .put(`/studies/${studyId}/entities/${entityId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(newData)
      .expect(200)
      .then((res) => {
        expect(parseInt(res.text)).toBe(1);
      });

    return request(app.getHttpServer())
      .get(`/studies/${studyId}/entities/${entityId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(newData)
      .expect(200)
      .then((res) => {
        expect(res.body.id).toBe(entityId);
        expect(res.body.name).toBe(newData.name);
      });
  });

  it('should fail if studyId invalid', () => {
    return request(app.getHttpServer())
      .put(`/studies/invalid-id/entities/${entityId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(fakeData.entity())
      .expect(401);
  });

  it('should fail if entityId invalid', () => {
    return request(app.getHttpServer())
      .put(`/studies/${studyId}/entities/invalid-id`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(fakeData.entity())
      .expect(401);
  });

  it('should fail if studyId does not exist', () => {
    return request(app.getHttpServer())
      .put(`/studies/${fakeData.id()}/entities/${entityId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(fakeData.entity())
      .expect(401);
  });

  it('should fail if entityId does not exist', () => {
    return request(app.getHttpServer())
      .put(`/studies/${studyId}/entities/${fakeData.id()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(fakeData.entity())
      .expect(401);
  });

  it('should fail because body is empty', () => {
    return request(app.getHttpServer())
      .put(`/studies/${studyId}/entities/${entityId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({})
      .expect(400);
  });

  it('should fail because name is empty', () => {
    return request(app.getHttpServer())
      .put(`/studies/${studyId}/entities/${entityId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: '' })
      .expect(400);
  });

  it('should fail because name is not a string', () => {
    return request(app.getHttpServer())
      .put(`/studies/${studyId}/entities/${entityId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: false })
      .expect(400);
  });

  it('should fail because entity already exists', async () => {
    const data = fakeData.entity();

    await createEntity(app, accessToken, studyId, data);

    return request(app.getHttpServer())
      .put(`/studies/${studyId}/entities/${entityId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(data)
      .expect(422);
  });

  it('should update entity even if entity already exists on other study', async () => {
    const otherStudyId = await createStudy(app, accessToken, fakeData.study());

    const data = fakeData.entity();

    await createEntity(app, accessToken, otherStudyId, data);

    return request(app.getHttpServer())
      .put(`/studies/${studyId}/entities/${entityId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(data)
      .expect(200);
  });

  it('should fail because director is not a member of the study', async () => {
    const accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );

    return request(app.getHttpServer())
      .put(`/studies/${studyId}/entities/${entityId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(fakeData.entity())
      .expect(401);
  });
});
