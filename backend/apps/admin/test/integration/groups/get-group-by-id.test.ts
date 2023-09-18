import { TEST_DIRECTOR } from '@test/testData';
import { AppModule } from '@admin/app.module';
import { createStudyId } from '@test/studies/createStudy';
import { createDirector } from '@test/director/signUpDirector';
import { createGroupId } from '@test/groups/createGroup';
import { getGroups } from '@test/groups/getGroups';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import { IApp, createApp } from '@test/app/createApp';
import { getAdminAccessToken } from '@test/auth/loginAdmin';
import fakeData from '@test/fakeData';
import { getGroupById } from '@test/groups/getGroupById';
import { deleteGroup } from '@test/groups/deleteGroup';

describe('get group by id', () => {
  let app: IApp;
  let accessToken: string;
  let otherAccessToken: string;
  let studyId: string;
  let groupId: string;
  let groupData: any;

  beforeAll(async () => {
    app = await createApp(AppModule);

    const director = await createDirector(app);

    accessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );

    otherAccessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );

    studyId = await createStudyId(app, { accessToken });

    groupData = fakeData.group();

    groupId = await createGroupId(app, {
      accessToken,
      studyId,
      data: groupData,
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get groups by study', async () => {
    return getGroupById(app, { accessToken, studyId, groupId })
      .expect(200)
      .then((res) => {
        const group = res.body;
        expect(group).toBeTruthy();
        expect(group.id).toBe(groupId);
        expect(group.name).toBe(groupData.name);
      });
  });

  it('should fail because group is hard deleted', async () => {
    const groupId = await createGroupId(app, { accessToken, studyId });

    await deleteGroup(app, { accessToken, studyId, groupId, hardDelete: true });

    return getGroupById(app, { accessToken, studyId, groupId }).expect(401);
  });

  it('should fail because group is soft deleted', async () => {
    const groupId = await createGroupId(app, { accessToken, studyId });

    await deleteGroup(app, {
      accessToken,
      studyId,
      groupId,
      hardDelete: false,
    });

    return getGroupById(app, { accessToken, studyId, groupId }).expect(401);
  });

  it('should fail because unauthorized', async () => {
    return getGroupById(app, {
      accessToken: undefined,
      studyId,
      groupId,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    return getGroupById(app, {
      accessToken: otherAccessToken,
      studyId,
      groupId,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const adminAccessToken = await getAdminAccessToken(app);

    return getGroupById(app, {
      accessToken: adminAccessToken,
      studyId,
      groupId,
    }).expect(401);
  });

  it('should fail because studyId missing', async () => {
    return getGroupById(app, {
      accessToken,
      studyId: undefined,
      groupId,
    }).expect(400);
  });

  it('should fail because studyId invalid', async () => {
    return getGroupById(app, {
      accessToken,
      studyId: fakeData.text(),
      groupId,
    }).expect(401);
  });

  it('should fail because studyId unknown', async () => {
    return getGroupById(app, {
      accessToken,
      studyId: fakeData.id(),
      groupId,
    }).expect(401);
  });

  it('should fail because groupId missing', async () => {
    return getGroupById(app, {
      accessToken,
      studyId,
      groupId: undefined,
    }).expect(400);
  });

  it('should fail because groupId invalid', async () => {
    return getGroupById(app, {
      accessToken,
      studyId,
      groupId: fakeData.text(),
    }).expect(401);
  });

  it('should fail because groupId unknown', async () => {
    return getGroupById(app, {
      accessToken,
      studyId,
      groupId: fakeData.id(),
    }).expect(401);
  });
});
