import { INestApplication } from '@nestjs/common';
import fakeData from '@test/fakeData';
import { createApp, getDirectorAccessToken } from '@test/utils';
import { TEST_DIRECTOR } from '@test/testData';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { AppModule } from '@admin/app.module';
import { createStudyId } from '@test/studies/createStudy';
import { createGroup } from '@test/groups/createGroup';

describe('create group', () => {
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
