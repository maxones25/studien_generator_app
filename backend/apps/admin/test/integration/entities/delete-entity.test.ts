import { TEST_DIRECTOR } from '@test/testData';
import { createApp, createStudy, getDirectorAccessToken } from '@test/utils';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@admin/app.module';
import fakeData from '@test/fakeData';
import request from 'supertest';
import { deleteEntity } from '@test/entities/deleteEntity';
import { createEntity, createEntityId } from '@test/entities/createEntity';
import { getEntityById } from '@test/entities/getEntityById';

describe('Delete Entity', () => {
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
    const entityId = await createEntityId(app, {
      accessToken,
      studyId,
      data: fakeData.entity(),
    });

    await deleteEntity(app, { accessToken, studyId, entityId })
      .expect(200)
      .then((res) => {
        expect(parseInt(res.text)).toBe(1);
      });

    return getEntityById(app, { accessToken, studyId, entityId }).expect(401);
  });

  it('should fail because studyId is invalid', async () => {
    const entityId = await createEntityId(app, {
      accessToken,
      studyId,
      data: fakeData.entity(),
    });

    await deleteEntity(app, {
      studyId: 'invalid-id',
      accessToken,
      entityId,
    }).expect(401);
  });

  it('should fail because entityId is invalid', async () => {
    await deleteEntity(app, {
      accessToken,
      studyId,
      entityId: 'invalid-id',
    }).expect(401);
  });

  it('should fail because studyId does not exist', async () => {
    const entityId = await createEntityId(app, {
      accessToken,
      studyId,
      data: fakeData.entity(),
    });

    await deleteEntity(app, {
      accessToken,
      studyId: fakeData.id(),
      entityId,
    }).expect(401);
  });

  it('should fail because entityId does not exist', async () => {
    await deleteEntity(app, {
      accessToken,
      studyId,
      entityId: fakeData.id(),
    }).expect(401);
  });

  it('should fail because director is not a member of that study', async () => {
    const entityId = await createEntityId(app, {
      accessToken,
      studyId,
      data: fakeData.entity(),
    });

    const otherAccessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );

    await deleteEntity(app, {
      accessToken: otherAccessToken,
      studyId,
      entityId,
    }).expect(401);
  });
});
