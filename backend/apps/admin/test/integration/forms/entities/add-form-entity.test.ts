import { TEST_DIRECTOR } from '@test/testData';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { AppModule } from '@admin/app.module';
import { createStudyId } from '@test/studies/createStudy';
import { createFormId } from '@test/forms/createForm';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import { IApp, createApp } from '@test/app/createApp';
import { getAdminAccessToken } from '@test/auth/loginAdmin';
import fakeData from '@test/fakeData';
import { addFormEntity } from '@test/forms/entities/addFormEntity';
import { createEntityId } from '@test/entities/createEntity';
import { getFormEntities } from '@test/forms/entities/getFormEntities';

describe('add form entity', () => {
  let app: IApp;
  let accessToken: string;
  let otherAccessToken: string;
  let studyId: string;
  let formId: string;
  let entityId: string;

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
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    formId = await createFormId(app, { accessToken, studyId });
    entityId = await createEntityId(app, { accessToken, studyId });
  });

  it('should add form entity', async () => {
    const name = fakeData.text();

    await addFormEntity(app, { accessToken, studyId, formId, entityId, name })
      .expect(201)
      .then(async (res) => {
        const id = res.text;

        expect(validateUUID(id)).toBe(true);

        return getFormEntities(app, { accessToken, studyId, formId })
          .expect(200)
          .then((res) => {
            const formEntities = res.body;

            expect(Array.isArray(formEntities)).toBe(true);
            expect(formEntities.length).toBe(1);

            expect(formEntities[0].id).toBe(id);
          });
      });
  });

  it('should fail because unauthorized', async () => {
    const name = fakeData.text();
    await addFormEntity(app, {
      accessToken: undefined,
      studyId,
      formId,
      entityId,
      name,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const name = fakeData.text();
    const adminAccessToken = await getAdminAccessToken(app);
    await addFormEntity(app, {
      accessToken: adminAccessToken,
      studyId,
      formId,
      entityId,
      name,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    const name = fakeData.text();
    await addFormEntity(app, {
      accessToken: otherAccessToken,
      studyId,
      formId,
      entityId,
      name,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    const name = fakeData.text();
    await addFormEntity(app, {
      accessToken,
      studyId: undefined,
      formId,
      entityId,
      name,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    const name = fakeData.text();
    await addFormEntity(app, {
      accessToken,
      studyId: fakeData.text(),
      formId,
      entityId,
      name,
    }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
    const name = fakeData.text();
    await addFormEntity(app, {
      accessToken,
      studyId: fakeData.id(),
      formId,
      entityId,
      name,
    }).expect(401);
  });

  it('should fail because formId is missing', async () => {
    const name = fakeData.text();
    await addFormEntity(app, {
      accessToken,
      studyId,
      formId: undefined,
      entityId,
      name,
    }).expect(400);
  });

  it('should fail because formId is invalid', async () => {
    const name = fakeData.text();
    await addFormEntity(app, {
      accessToken,
      studyId,
      formId: fakeData.text(),
      entityId,
      name,
    }).expect(401);
  });

  it('should fail because formId is unknown', async () => {
    const name = fakeData.text();
    await addFormEntity(app, {
      accessToken,
      studyId,
      formId: fakeData.id(),
      entityId,
      name,
    }).expect(401);
  });

  it('should fail because entityId is missing', async () => {
    const name = fakeData.text();
    await addFormEntity(app, {
      accessToken,
      studyId,
      formId,
      entityId: undefined,
      name,
    }).expect(400);
  });

  it('should fail because entityId is invalid', async () => {
    const name = fakeData.text();
    await addFormEntity(app, {
      accessToken,
      studyId,
      formId,
      entityId: fakeData.text(),
      name,
    }).expect(401);
  });

  it('should fail because entityId is unknown', async () => {
    const name = fakeData.text();
    await addFormEntity(app, {
      accessToken,
      studyId,
      formId,
      entityId: fakeData.id(),
      name,
    }).expect(401);
  });

  it('should fail because name is missing', async () => {
    await addFormEntity(app, {
      accessToken,
      studyId,
      formId,
      entityId,
      name: undefined,
    }).expect(400);
  });

  it('should fail because name has wrong type', async () => {
    await addFormEntity(app, {
      accessToken,
      studyId,
      formId,
      entityId,
      name: true,
    }).expect(400);
  });

  it('should fail because name is empty', async () => {
    await addFormEntity(app, {
      accessToken,
      studyId,
      formId,
      entityId,
      name: '',
    }).expect(400);
  });

  it('should add name twice', async () => {
    const name = fakeData.text();
    await addFormEntity(app, {
      accessToken,
      studyId,
      formId,
      entityId,
      name,
    }).expect(201);
    await addFormEntity(app, {
      accessToken,
      studyId,
      formId,
      entityId,
      name,
    }).expect(201);
  });
});
