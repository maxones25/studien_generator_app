import { TEST_DIRECTOR } from '@test/testData';
import { AppModule } from '@admin/app.module';
import fakeData from '@test/fakeData';
import { changeEntityName } from '@test/entities/changeEntityName';
import { getEntityById } from '@test/entities/getEntityById';
import { createEntity, createEntityId } from '@test/entities/createEntity';
import { createStudyId } from '@test/studies/createStudy';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import { IApp, createApp } from '@test/app/createApp';

describe('Change Entity Name', () => {
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

  it('should change entity name when provided a valid studyId and entityId', async () => {
    const data = fakeData.entity();

    await changeEntityName(app, { accessToken, studyId, entityId, data })
      .expect(200)
      .then((res) => {
        expect(parseInt(res.text)).toBe(1);
      });

    return getEntityById(app, { accessToken, studyId, entityId })
      .expect(200)
      .then((res) => {
        expect(res.body.id).toBe(entityId);
        expect(res.body.name).toBe(data.name);
      });
  });

  it('should fail if studyId invalid', () => {
    return changeEntityName(app, {
      accessToken,
      studyId: 'invalid-id',
      entityId,
      data: fakeData.entity(),
    }).expect(401);
  });

  it('should fail if entityId invalid', () => {
    return changeEntityName(app, {
      accessToken,
      studyId,
      entityId: 'invalid-id',
      data: fakeData.entity(),
    }).expect(401);
  });

  it('should fail if studyId does not exist', () => {
    return changeEntityName(app, {
      accessToken,
      studyId: fakeData.id(),
      entityId,
      data: fakeData.entity(),
    }).expect(401);
  });

  it('should fail if entityId does not exist', () => {
    return changeEntityName(app, {
      accessToken,
      studyId,
      entityId: fakeData.id(),
      data: fakeData.entity(),
    }).expect(401);
  });

  it('should fail because body is empty', () => {
    return changeEntityName(app, {
      accessToken,
      studyId,
      entityId,
      data: {},
    }).expect(400);
  });

  it('should fail because name is empty', () => {
    return changeEntityName(app, {
      accessToken,
      studyId,
      entityId,
      data: { name: '' },
    }).expect(400);
  });

  it('should fail because name is not a string', () => {
    return changeEntityName(app, {
      accessToken,
      studyId,
      entityId,
      data: { name: false },
    }).expect(400);
  });

  it('should fail because entity already exists', async () => {
    const data = fakeData.entity();

    await createEntity(app, { accessToken, studyId, data }).expect(201);

    return changeEntityName(app, {
      accessToken,
      studyId,
      entityId,
      data,
    }).expect(400);
  });

  it('should update entity even if entity already exists on other study', async () => {
    const otherStudyId = await createStudyId(app, {
      accessToken,
      data: fakeData.study(),
    });
    const data = fakeData.entity();

    await createEntity(app, {
      accessToken,
      studyId: otherStudyId,
      data,
    }).expect(201);

    return changeEntityName(app, {
      accessToken,
      studyId,
      entityId,
      data,
    }).expect(200);
  });

  it('should fail because director is not a member of the study', async () => {
    const accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );

    return changeEntityName(app, {
      accessToken,
      studyId,
      entityId,
      data: fakeData.entity(),
    }).expect(401);
  });
});
