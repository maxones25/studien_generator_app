import { AppModule } from "@admin/app.module";
import { validateUUID } from "@shared/modules/uuid/uuid";
import { getDirectorAccessToken } from "@test/admin/director";
import { createEntityId, createField } from "@test/admin/entities";
import { createStudyId } from "@test/admin/studies";
import { IApp, createApp } from "@test/app";
import fakeData from "@test/fakeData";
import { TEST_DIRECTOR } from "@test/testData";

describe('Create Entity Field', () => {
  let app: IApp;
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
    studyId = await createStudyId(app, { accessToken, data: fakeData.study() });
    entityId = await createEntityId(app, {
      accessToken,
      studyId,
      data: fakeData.entity(),
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create an entity field successfully', () => {
    const data = fakeData.entityField();
    return createField(app, { accessToken, studyId, entityId, data })
      .expect(201)
      .then((res) => {
        expect(validateUUID(res.body.id)).toBeTruthy();
      });
  });

  it('should fail because studyId invalid', () => {
    const data = fakeData.entityField();
    return createField(app, {
      accessToken,
      studyId: 'false',
      entityId,
      data,
    }).expect(401);
  });

  it('should fail because entityId invalid', () => {
    const data = fakeData.entityField();
    return createField(app, {
      accessToken,
      studyId,
      entityId: 'invalid',
      data,
    }).expect(401);
  });

  it('should fail because studyId does not exist', () => {
    const data = fakeData.entityField();
    return createField(app, {
      accessToken,
      studyId: fakeData.id(),
      entityId,
      data,
    }).expect(401);
  });

  it('should fail because entityId does not exist', () => {
    const data = fakeData.entityField();
    return createField(app, {
      accessToken,
      studyId,
      entityId: fakeData.id(),
      data,
    }).expect(401);
  });

  it('should fail because entityId belongs to other study', async () => {
    const studyId = await createStudyId(app, {
      accessToken,
      data: fakeData.study(),
    });
    return createField(app, {
      accessToken,
      studyId,
      entityId,
      data: fakeData.entityField(),
    }).expect(401);
  });

  it('should fail because name is missing', async () => {
    const data = fakeData.entityField();
    delete data.name;
    return createField(app, {
      accessToken,
      studyId,
      entityId,
      data,
    }).expect(400);
  });

  it('should fail because name is empty', async () => {
    const data = fakeData.entityField();
    data.name = '';
    return createField(app, {
      accessToken,
      studyId,
      entityId,
      data,
    }).expect(400);
  });

  it('should fail because type is empty', async () => {
    const data = fakeData.entityField();
    return createField(app, {
      accessToken,
      studyId,
      entityId,
      data: { ...data, type: '' },
    }).expect(400);
  });

  it('should fail because type invalid', async () => {
    const data = fakeData.entityField();
    return createField(app, {
      accessToken,
      studyId,
      entityId,
      data: { ...data, type: 'invalid' },
    }).expect(400);
  });

  it('should fail because entity field already exists', async () => {
    const data = fakeData.entityField();

    await createField(app, { accessToken, studyId, entityId, data }).expect(
      201,
    );

    await createField(app, { accessToken, studyId, entityId, data }).expect(
      422,
    );
  });

  it('should fail because director is not a member of the study', async () => {
    const data = fakeData.entityField();
    const accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );

    await createField(app, { accessToken, studyId, entityId, data }).expect(
      401,
    );
  });
});
