import { TEST_DIRECTOR } from '@test/testData';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@admin/app.module';
import fakeData from '@test/fakeData';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { createEntity } from '@test/entities/createEntity';
import { createStudyId } from '@test/studies/createStudy';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import { createApp } from '@test/app/createApp';

describe('Create Entity', () => {
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
    studyId = await createStudyId(app, { accessToken, data: fakeData.study() });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create an entity with a valid request', () => {
    const data = fakeData.entity();

    return createEntity(app, { accessToken, studyId, data })
      .expect(201)
      .then((res) => {
        expect(validateUUID(res.text)).toBeTruthy();
      });
  });

  it('should fail because body is empty', () => {
    const data = {};
    return createEntity(app, { accessToken, studyId, data }).expect(400);
  });

  it('should fail because name is empty', () => {
    const data = { name: '' };
    return createEntity(app, { accessToken, studyId, data }).expect(400);
  });

  it('should fail because name is not a string', () => {
    const data = { name: 123 };
    return createEntity(app, { accessToken, studyId, data }).expect(400);
  });

  it('should fail because studyId does not exist', () => {
    const studyId = fakeData.id();
    const data = fakeData.entity();
    return createEntity(app, { accessToken, studyId, data }).expect(401);
  });

  it('should fail if entity already exists', async () => {
    const data = fakeData.entity();

    await createEntity(app, { accessToken, studyId, data }).expect(201);

    return createEntity(app, { accessToken, studyId, data }).expect(422);
  });

  it('should create entity even if entity already exists in other study', async () => {
    const otherStudyId = await createStudyId(app, { accessToken });

    const data = fakeData.entity();

    await createEntity(app, {
      accessToken,
      studyId: otherStudyId,
      data,
    }).expect(201);

    return createEntity(app, {
      accessToken,
      studyId,
      data,
    }).expect(201);
  });
});
