import { AppModule } from '@admin/app.module';
import { INestApplication } from '@nestjs/common';
import fakeData from '@test/fakeData';
import { changeGroupName } from '@test/groups/changeGroupName';
import { createGroupId } from '@test/groups/createGroup';
import { getGroupById } from '@test/groups/getGroupById';
import { createStudyId } from '@test/studies/createStudy';
import { TEST_DIRECTOR } from '@test/testData';
import { createApp, getDirectorAccessToken } from '@test/utils';
import request from 'supertest';

describe('change group name', () => {
  let app: INestApplication;
  let accessToken: string;
  let johnAccessToken: string;
  let studyId: string;

  beforeAll(async () => {
    app = await createApp(AppModule);

    accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );

    johnAccessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );

    studyId = await createStudyId(app, { accessToken });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should update group successfully', async () => {
    const groupId = await createGroupId(app, { accessToken, studyId });

    const data = fakeData.group();

    await changeGroupName(app, { accessToken, studyId, groupId, data }).expect(
      200,
    );

    await getGroupById(app, { accessToken, studyId, groupId })
      .expect(200)
      .then((res) => {
        expect(res.body.id).toEqual(groupId);
        expect(res.body.name).toEqual(data.name);
      });
  });

  it('should fail because name is missing', async () => {
    const groupId = await createGroupId(app, { accessToken, studyId });

    await changeGroupName(app, {
      accessToken,
      studyId,
      groupId,
      data: {},
    }).expect(400);
  });

  it('should fail because name is empty', async () => {
    const groupId = await createGroupId(app, { accessToken, studyId });

    await changeGroupName(app, {
      accessToken,
      studyId,
      groupId,
      data: { name: '' },
    }).expect(400);
  });

  it('should fail because name already exists', async () => {
    const data = fakeData.group();

    await createGroupId(app, { accessToken, studyId, data });

    const groupId = await createGroupId(app, { accessToken, studyId });

    await changeGroupName(app, { accessToken, studyId, groupId, data }).expect(
      422,
    );
  });

  it('should fail because director is not part of the study', async () => {
    const studyId = await createStudyId(app, { accessToken: johnAccessToken });
    const groupId = await createGroupId(app, {
      accessToken: johnAccessToken,
      studyId,
    });

    await changeGroupName(app, {
      accessToken,
      studyId,
      groupId,
      data: fakeData.group(),
    }).expect(401);
  });
});
