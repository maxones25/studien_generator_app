import { TEST_DIRECTOR } from '@test/testData';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { AppModule } from '@admin/app.module';
import { createStudyId } from '@test/studies/createStudy';
import { createFormId } from '@test/forms/createForm';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import { IApp, createApp } from '@test/app/createApp';
import { getAdminAccessToken } from '@test/auth/loginAdmin';
import fakeData from '@test/fakeData';
import {
  addFormEntity,
  createFormEntityId,
} from '@test/forms/entities/addFormEntity';
import { createEntityId } from '@test/entities/createEntity';
import { getFormEntities } from '@test/forms/entities/getFormEntities';
import { removeFormEntity } from '@test/forms/entities/removeFormEntity';
import { createDirector } from '@test/director/signUpDirector';
import { addMember } from '@test/studies/members/addMember';

describe('remove form entity', () => {
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

  it('should remove form entity', async () => {
    await removeFormEntity(app, { accessToken, studyId, formEntityId }).expect(
      200,
    );

    return getFormEntities(app, { accessToken, studyId, formId })
      .expect(200)
      .then((res) => {
        const formEntities = res.body;

        expect(Array.isArray(formEntities)).toBe(true);
        expect(formEntities.length).toBe(0);
      });
  });

  it('should fail because unauthorized', async () => {
    await removeFormEntity(app, {
      accessToken: undefined,
      studyId,
      formEntityId,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const adminAccessToken = await getAdminAccessToken(app);
    await removeFormEntity(app, {
      accessToken: adminAccessToken,
      studyId,
      formEntityId,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    await removeFormEntity(app, {
      accessToken: otherAccessToken,
      studyId,
      formEntityId,
    }).expect(401);
  });

  it('should fail because director is not admin', async () => {
    const director = await createDirector(app);

    await addMember(app, {
      accessToken,
      studyId,
      directorId: director.id,
      role: 'employee',
    }).expect(201);

    const otherAccessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );

    await removeFormEntity(app, {
      accessToken: otherAccessToken,
      studyId,
      formEntityId,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    await removeFormEntity(app, {
      accessToken,
      studyId: undefined,
      formEntityId,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    await removeFormEntity(app, {
      accessToken,
      studyId: fakeData.text(),
      formEntityId,
    }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
    await removeFormEntity(app, {
      accessToken,
      studyId: fakeData.id(),
      formEntityId,
    }).expect(401);
  });

  it('should fail because formEntityId is missing', async () => {
    await removeFormEntity(app, {
      accessToken,
      studyId,
      formEntityId: undefined,
    }).expect(400);
  });

  it('should fail because formEntityId is invalid', async () => {
    await removeFormEntity(app, {
      accessToken,
      studyId,
      formEntityId: fakeData.text(),
    }).expect(401);
  });

  it('should fail because formEntityId is unknown', async () => {
    await removeFormEntity(app, {
      accessToken,
      studyId,
      formEntityId: fakeData.id(),
    }).expect(401);
  });
});
