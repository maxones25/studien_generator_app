import { AppModule } from '@admin/app.module';
import {
  getDirectorAccessToken,
  getAdminAccessToken,
} from '@test/admin/director';
import {
  createGroupId,
  deleteGroup,
  getGroupById,
  restoreGroup,
} from '@test/admin/groups';
import { createStudyId } from '@test/admin/studies';
import { IApp, createApp } from '@test/app';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

describe('restore group', () => {
  let app: IApp;
  let accessToken: string;
  let otherAccessToken: string;
  let studyId: string;

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

  it('should restore group', async () => {
    const groupId = await createGroupId(app, { accessToken, studyId });

    await deleteGroup(app, {
      accessToken,
      studyId,
      groupId,
      hardDelete: false,
      deleteRelated: false,
    })
      .expect(200)
      .then((res) => {
        expect(parseInt(res.text)).toEqual(1);
      });

    await getGroupById(app, { accessToken, studyId, groupId }).expect(401);

    await restoreGroup(app, { accessToken, studyId, groupId }).expect(200);

    await getGroupById(app, { accessToken, studyId, groupId }).expect(200);
  });

  it('should fail because group is hard deleted', async () => {
    const groupId = await createGroupId(app, { accessToken, studyId });

    await deleteGroup(app, {
      accessToken,
      studyId,
      groupId,
      hardDelete: true,
      deleteRelated: false,
    })
      .expect(200)
      .then((res) => {
        expect(parseInt(res.text)).toEqual(1);
      });

    await getGroupById(app, { accessToken, studyId, groupId }).expect(401);

    await restoreGroup(app, { accessToken, studyId, groupId }).expect(401);
  });

  it('should fail because unauthorized', async () => {
    const groupId = await createGroupId(app, { accessToken, studyId });

    await deleteGroup(app, {
      accessToken,
      studyId,
      groupId,
      hardDelete: false,
    }).expect(200);

    return restoreGroup(app, {
      accessToken: undefined,
      studyId,
      groupId,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const groupId = await createGroupId(app, { accessToken, studyId });

    await deleteGroup(app, {
      accessToken,
      studyId,
      groupId,
      hardDelete: false,
    }).expect(200);

    const adminAccessToken = await getAdminAccessToken(app);

    return restoreGroup(app, {
      accessToken: adminAccessToken,
      studyId,
      groupId,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    const groupId = await createGroupId(app, { accessToken, studyId });

    await deleteGroup(app, {
      accessToken,
      studyId,
      groupId,
      hardDelete: false,
    }).expect(200);

    return restoreGroup(app, {
      accessToken: otherAccessToken,
      studyId,
      groupId,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    const groupId = await createGroupId(app, { accessToken, studyId });

    await deleteGroup(app, {
      accessToken,
      studyId,
      groupId,
      hardDelete: false,
    }).expect(200);

    return restoreGroup(app, {
      accessToken,
      studyId: undefined,
      groupId,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    const groupId = await createGroupId(app, { accessToken, studyId });

    await deleteGroup(app, {
      accessToken,
      studyId,
      groupId,
      hardDelete: false,
    }).expect(200);

    return restoreGroup(app, {
      accessToken,
      studyId: fakeData.text(),
      groupId,
    }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
    const groupId = await createGroupId(app, { accessToken, studyId });

    await deleteGroup(app, {
      accessToken,
      studyId,
      groupId,
      hardDelete: false,
    }).expect(200);

    return restoreGroup(app, {
      accessToken,
      studyId: fakeData.id(),
      groupId,
    }).expect(401);
  });

  it('should fail because groupId is missing', async () => {
    const groupId = await createGroupId(app, { accessToken, studyId });

    await deleteGroup(app, {
      accessToken,
      studyId,
      groupId,
      hardDelete: false,
    }).expect(200);

    return restoreGroup(app, {
      accessToken,
      studyId,
      groupId: undefined,
    }).expect(400);
  });

  it('should fail because groupId is invalid', async () => {
    const groupId = await createGroupId(app, { accessToken, studyId });

    await deleteGroup(app, {
      accessToken,
      studyId,
      groupId,
      hardDelete: false,
    }).expect(200);

    return restoreGroup(app, {
      accessToken,
      studyId,
      groupId: fakeData.text(),
    }).expect(401);
  });

  it('should fail because groupId is unknown', async () => {
    const groupId = await createGroupId(app, { accessToken, studyId });

    await deleteGroup(app, {
      accessToken,
      studyId,
      groupId,
      hardDelete: false,
    }).expect(200);

    return restoreGroup(app, {
      accessToken,
      studyId,
      groupId: fakeData.id(),
    }).expect(401);
  });
});
