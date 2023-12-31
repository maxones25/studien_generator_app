import { AppModule } from '@admin/app.module';
import {
  getDirectorAccessToken,
  getAdminAccessToken,
} from '@test/admin/director';
import { createEntityId, createFieldId } from '@test/admin/entities';
import {
  createFormId,
  createFormEntityId,
  getFormEntities,
} from '@test/admin/forms';
import { createStudyId } from '@test/admin/studies';
import { IApp, createApp } from '@test/app';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

describe('get form entities', () => {
  let app: IApp;
  let accessToken: string;
  let otherAccessToken: string;
  let studyId: string;
  let formId: string;
  let entityId: string;
  let fieldId: string;
  let fieldData: any;
  let createdFormEntities: any[];

  beforeAll(async () => {
    app = await createApp(AppModule);

    accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );

    otherAccessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );

    studyId = await createStudyId(app, { accessToken });
    formId = await createFormId(app, { accessToken, studyId });
    entityId = await createEntityId(app, { accessToken, studyId });

    fieldData = fakeData.entityField();

    fieldId = await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
      data: fieldData,
    });

    createdFormEntities = [];

    for (let i = 0; i < 3; i++) {
      const name = fakeData.text();
      const formEntityId = await createFormEntityId(app, {
        accessToken,
        studyId,
        formId,
        entityId,
        name,
      });
      createdFormEntities.push({ id: formEntityId, name });
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get form entities', async () => {
    return getFormEntities(app, { accessToken, studyId, formId })
      .expect(200)
      .then((res) => {
        const formEntities = res.body;

        expect(Array.isArray(formEntities)).toBe(true);
        expect(formEntities.length).toBe(3);

        formEntities.forEach((formEntity) => {
          const createdFormEntity = createdFormEntities.find(
            (cfe) => cfe.id === formEntity.id,
          );

          expect(formEntity.id).toBe(createdFormEntity.id);
          expect(formEntity.name).toBe(createdFormEntity.name);
          expect(formEntity.entity.id).toBe(entityId);
          expect(Array.isArray(formEntity.fields)).toBe(true);
          expect(formEntity.fields.length).toBe(1);

          formEntity.fields.forEach((field) => {
            expect(field.id).toBe(fieldId);
            expect(field.name).toBe(fieldData.name);
            expect(field.type).toBe(fieldData.type);
            expect(field.component).toBe(null);
          });
        });
      });
  });

  it('should fail because unauthorized', async () => {
    return getFormEntities(app, {
      accessToken: undefined,
      studyId,
      formId,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const adminAccessToken = await getAdminAccessToken(app);
    return getFormEntities(app, {
      accessToken: adminAccessToken,
      studyId,
      formId,
    }).expect(401);
  });

  it('should fail because director is not a member of study', async () => {
    return getFormEntities(app, {
      accessToken: otherAccessToken,
      studyId,
      formId,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    return getFormEntities(app, {
      accessToken,
      studyId: undefined,
      formId,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    return getFormEntities(app, {
      accessToken,
      studyId: fakeData.text(),
      formId,
    }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
    return getFormEntities(app, {
      accessToken,
      studyId: fakeData.id(),
      formId,
    }).expect(401);
  });

  it('should fail because formId is missing', async () => {
    return getFormEntities(app, {
      accessToken,
      studyId,
      formId: undefined,
    }).expect(400);
  });

  it('should fail because formId is invalid', async () => {
    return getFormEntities(app, {
      accessToken,
      studyId,
      formId: fakeData.text(),
    }).expect(401);
  });

  it('should fail because formId is unknown', async () => {
    return getFormEntities(app, {
      accessToken,
      studyId,
      formId: fakeData.id(),
    }).expect(401);
  });
});
