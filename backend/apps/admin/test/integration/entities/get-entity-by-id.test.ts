import { TEST_DIRECTOR } from '@test/testData';
import { AppModule } from '@admin/app.module';
import fakeData from '@test/fakeData';
import { createEntityId } from '@test/entities/createEntity';
import { createStudyId } from '@test/studies/createStudy';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import { IApp, createApp } from '@test/app/createApp';
import { getEntityById } from '@test/entities/getEntityById';
import { createFieldId } from '@test/entities/fields/createField';
import { getAdminAccessToken } from '@test/auth/loginAdmin';

describe('Get Entities', () => {
  let app: IApp;
  let accessToken: string;
  let studyId: string;
  let entityId: string;
  let data: any;
  let createdFields: any[];

  beforeAll(async () => {
    app = await createApp(AppModule);

    createdFields = [];

    accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );

    studyId = await createStudyId(app, { accessToken });

    data = fakeData.entity();

    entityId = await createEntityId(app, {
      accessToken,
      studyId,
      data,
    });

    for (let i = 0; i < 3; i++) {
      const fieldData = fakeData.entityField();
      const id = await createFieldId(app, {
        accessToken,
        studyId,
        entityId,
        data: fieldData,
      });
      createdFields.push({ ...fieldData, id });
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get entity by id', () => {
    return getEntityById(app, { accessToken, studyId, entityId })
      .expect(200)
      .then((res) => {
        const entity = res.body;

        expect(typeof entity).toBe('object');
        expect(entity.id).toBe(entityId);
        expect(entity.name).toBe(data.name);
        expect(Array.isArray(entity.fields)).toBeTruthy();
        expect(entity.fields.length).toBeGreaterThan(0);

        entity.fields.forEach((field) => {
          const createdField = createdFields.find((f) => f.id === field.id);
          expect(createdField).not.toBeUndefined();
          expect(createdField.id).toBe(field.id);
          expect(createdField.name).toBe(field.name);
          expect(createdField.type).toBe(field.type);
        });
      });
  });

  it('should fail because unauthorized', () => {
    return getEntityById(app, {
      accessToken: undefined,
      studyId,
      entityId,
    }).expect(401);
  });

  it('should fail because studyId is missing', () => {
    return getEntityById(app, {
      accessToken,
      studyId: undefined,
      entityId,
    }).expect(400);
  });

  it('should fail because entityId is missing', () => {
    return getEntityById(app, {
      accessToken,
      studyId,
      entityId: undefined,
    }).expect(400);
  });

  it('should fail because studyId invalid', () => {
    return getEntityById(app, {
      accessToken,
      studyId: 'invalid',
      entityId,
    }).expect(401);
  });

  it('should fail because studyId unknown', () => {
    return getEntityById(app, {
      accessToken,
      studyId: fakeData.id(),
      entityId,
    }).expect(401);
  });

  it('should fail because entityId invalid', () => {
    return getEntityById(app, {
      accessToken,
      studyId,
      entityId: 'invalid',
    }).expect(401);
  });

  it('should fail because entityId unknown', () => {
    return getEntityById(app, {
      accessToken,
      studyId,
      entityId: fakeData.id(),
    }).expect(401);
  });

  it('should fail because entityId belongs to other study', async () => {
    const studyId = await createStudyId(app, { accessToken });
    return getEntityById(app, {
      accessToken,
      studyId,
      entityId,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const accessToken = await getAdminAccessToken(app);
    return getEntityById(app, {
      accessToken,
      studyId,
      entityId,
    }).expect(401);
  });
});
