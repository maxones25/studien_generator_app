import { TEST_DIRECTOR } from '@test/testData';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@admin/app.module';
import fakeData from '@test/fakeData';
import { createEntityId } from '@test/entities/createEntity';
import { getEntities } from '@test/entities/getEntities';
import { createStudyId } from '@test/studies/createStudy';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import { createApp } from '@test/app/createApp';

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
    studyId = await createStudyId(app, { accessToken, data: fakeData.study() });

    entities = [];

    for (let i = 0; i < 3; i++) {
      entities.push(
        await createEntityId(app, {
          accessToken,
          studyId,
          data: fakeData.entity(),
        }),
      );
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return a list of entities for a valid studyId', () => {
    return getEntities(app, { accessToken, studyId })
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
    return getEntities(app, { accessToken, studyId: 'invalid-id' }).expect(401);
  });

  it('should return an empty list if no entities exist for the given studyId', async () => {
    const studyId = await createStudyId(app, {
      accessToken,
      data: fakeData.study(),
    });

    return getEntities(app, { accessToken, studyId })
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBe(0);
      });
  });

  it('should only return entites of the given study', async () => {
    const studyId = await createStudyId(app, {
      accessToken,
      data: fakeData.study(),
    });

    const entityId = await createEntityId(app, {
      accessToken,
      studyId,
      data: fakeData.entity(),
    });

    return getEntities(app, { accessToken, studyId })
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
