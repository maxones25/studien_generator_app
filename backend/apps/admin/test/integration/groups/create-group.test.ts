import { AppModule } from '@admin/app.module';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { getDirectorAccessToken } from '@test/admin/director';
import { createGroup } from '@test/admin/groups';
import { createStudyId, deleteStudy } from '@test/admin/studies';
import { IApp, createApp } from '@test/app';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

describe('create group', () => {
  let app: IApp;
  let accessToken: string;
  let studyId: string;

  beforeAll(async () => {
    app = await createApp(AppModule);
    accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );
    studyId = await createStudyId(app, { accessToken });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a group', () => {
    return createGroup(app, { accessToken, studyId })
      .expect(201)
      .then((res) => {
        expect(validateUUID(res.text)).toBeTruthy();
      });
  });

  it('should fail because study is deleted', async () => {
    const studyId = await createStudyId(app, { accessToken });

    await deleteStudy(app, { accessToken, studyId, hardDelete: false });

    return createGroup(app, {
      accessToken,
      studyId,
    }).expect(401);
  });

  it('should fail because name is missing', () => {
    const data = fakeData.group();
    delete data.name;
    return createGroup(app, { accessToken, studyId, data }).expect(400);
  });

  it('should fail because name is empty ', () => {
    const data = fakeData.group();
    data.name = '';
    return createGroup(app, { accessToken, studyId, data }).expect(400);
  });

  it('should fail because name already exists', async () => {
    const data = fakeData.group();

    await createGroup(app, { accessToken, studyId, data }).expect(201);

    return createGroup(app, { accessToken, studyId, data }).expect(422);
  });

  it('should fail because study id is unknown', () => {
    const studyId = fakeData.id();
    return createGroup(app, { accessToken, studyId }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    const johnAccessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );

    const studyId = await createStudyId(app, {
      accessToken: johnAccessToken,
    });

    return createGroup(app, { accessToken, studyId }).expect(401);
  });
});
