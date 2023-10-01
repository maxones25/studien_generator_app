import { TEST_DIRECTOR } from '@test/testData';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { AppModule } from '@admin/app.module';
import { createStudyId } from '@test/studies/createStudy';
import { createFormId } from '@test/forms/createForm';
import { getDirectorAccessToken } from '@test/admin/auth/loginDirector';
import { IApp, createApp } from '@test/app/createApp';
import { getAdminAccessToken } from '@test/admin/auth/loginAdmin';
import fakeData from '@test/fakeData';
import {
  addFormEntity,
  createFormEntityId,
} from '@test/forms/entities/addFormEntity';
import { createEntityId } from '@test/entities/createEntity';
import { getFormEntities } from '@test/forms/entities/getFormEntities';
import { changeFormEntityName } from '@test/forms/entities/changeFormEntityName';

describe('change form entity name', () => {
  let app: IApp;
  let accessToken: string;
  let otherAccessToken: string;
  let studyId: string;
  let formId: string;
  let entityId: string;
  let formEntityId: string;

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
    const name = fakeData.text();
    formEntityId = await createFormEntityId(app, {
      accessToken,
      studyId,
      formId,
      entityId,
      name,
    });
  });

  it('should change form entity name', async () => {
    const name = fakeData.text();

    await changeFormEntityName(app, {
      accessToken,
      studyId,
      formEntityId,
      name,
    }).expect(200);

    return getFormEntities(app, { accessToken, studyId, formId })
      .expect(200)
      .then((res) => {
        const formEntities = res.body;

        expect(Array.isArray(formEntities)).toBe(true);
        expect(formEntities.length).toBe(1);

        const formEntity = formEntities[0];

        expect(formEntity.id).toBe(formEntityId);
        expect(formEntity.name).toBe(name);
      });
  });

  it('should fail because unauthorized', async () => {
    const name = fakeData.text();

    await changeFormEntityName(app, {
      accessToken: undefined,
      studyId,
      formEntityId,
      name,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const name = fakeData.text();

    const adminAccessToken = await getAdminAccessToken(app);

    await changeFormEntityName(app, {
      accessToken: adminAccessToken,
      studyId,
      formEntityId,
      name,
    }).expect(401);
  });

  it('should fail because director is not member is study', async () => {
    const name = fakeData.text();

    await changeFormEntityName(app, {
      accessToken: otherAccessToken,
      studyId,
      formEntityId,
      name,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    const name = fakeData.text();

    await changeFormEntityName(app, {
      accessToken,
      studyId: undefined,
      formEntityId,
      name,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    const name = fakeData.text();

    await changeFormEntityName(app, {
      accessToken,
      studyId: fakeData.text(),
      formEntityId,
      name,
    }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
    const name = fakeData.text();

    await changeFormEntityName(app, {
      accessToken,
      studyId: fakeData.id(),
      formEntityId,
      name,
    }).expect(401);
  });

  it('should fail because formEntityId is missing', async () => {
    const name = fakeData.text();

    await changeFormEntityName(app, {
      accessToken,
      studyId,
      formEntityId: undefined,
      name,
    }).expect(400);
  });

  it('should fail because formEntityId is invalid', async () => {
    const name = fakeData.text();

    await changeFormEntityName(app, {
      accessToken,
      studyId,
      formEntityId: fakeData.text(),
      name,
    }).expect(401);
  });

  it('should fail because formEntityId is unknown', async () => {
    const name = fakeData.text();

    await changeFormEntityName(app, {
      accessToken,
      studyId,
      formEntityId: fakeData.id(),
      name,
    }).expect(401);
  });

  it('should fail because name is missing', async () => {
    await changeFormEntityName(app, {
      accessToken,
      studyId,
      formEntityId,
      name: undefined,
    }).expect(400);
  });

  it('should fail because name is empty', async () => {
    await changeFormEntityName(app, {
      accessToken,
      studyId,
      formEntityId,
      name: '',
    }).expect(400);
  });

  it('should fail because name is invalid type', async () => {
    await changeFormEntityName(app, {
      accessToken,
      studyId,
      formEntityId,
      name: 123,
    }).expect(400);
  });
});
