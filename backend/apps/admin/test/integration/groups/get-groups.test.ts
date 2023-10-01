import { AppModule } from '@admin/app.module';
import {
  createDirector,
  getDirectorAccessToken,
  getAdminAccessToken,
} from '@test/admin/director';
import { createGroupId, deleteGroup, getGroups } from '@test/admin/groups';
import { createStudyId } from '@test/admin/studies';
import { IApp, createApp } from '@test/app';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

describe('get groups', () => {
  let app: IApp;
  let accessToken: string;
  let otherAccessToken: string;
  let studyId: string;
  let otherStudyId: string;
  let groupIds: string[];
  let deletedGroupIds: string[];

  beforeAll(async () => {
    app = await createApp(AppModule);

    const director = await createDirector(app);

    accessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );

    studyId = await createStudyId(app, { accessToken });

    groupIds = [];
    groupIds.push(await createGroupId(app, { accessToken, studyId }));
    groupIds.push(await createGroupId(app, { accessToken, studyId }));
    groupIds.push(await createGroupId(app, { accessToken, studyId }));

    const deletedGroupId = await createGroupId(app, { accessToken, studyId });

    await deleteGroup(app, {
      accessToken,
      studyId,
      groupId: deletedGroupId,
      hardDelete: false,
    });

    deletedGroupIds = [];
    deletedGroupIds.push(deletedGroupId);

    otherAccessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );

    otherStudyId = await createStudyId(app, { accessToken: otherAccessToken });

    await createGroupId(app, {
      accessToken: otherAccessToken,
      studyId: otherStudyId,
    });

    await createGroupId(app, {
      accessToken: otherAccessToken,
      studyId: otherStudyId,
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get groups by study with deleted', async () => {
    return getGroups(app, { accessToken, studyId, deleted: true })
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
        res.body.forEach((group) => {
          expect(
            [...groupIds, ...deletedGroupIds].includes(group.id),
          ).toBeTruthy();
          expect(typeof group.name).toBe('string');
        });
      });
  });

  it('should get groups by study without deleted', async () => {
    return getGroups(app, { accessToken, studyId, deleted: false })
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
        res.body.forEach((group) => {
          expect(groupIds.includes(group.id)).toBeTruthy();
          expect(deletedGroupIds.includes(group.id)).toBeFalsy();
          expect(typeof group.name).toBe('string');
        });
      });
  });

  it('should fail because unauthorized', async () => {
    return getGroups(app, { accessToken: undefined, studyId }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const adminAccessToken = await getAdminAccessToken(app);

    return getGroups(app, { accessToken: adminAccessToken, studyId }).expect(
      401,
    );
  });

  it('should fail because director is not member of study', async () => {
    return getGroups(app, { accessToken, studyId: otherStudyId }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    return getGroups(app, { accessToken, studyId: undefined }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    return getGroups(app, { accessToken, studyId: fakeData.text() }).expect(
      401,
    );
  });

  it('should fail because studyId is unknown', async () => {
    return getGroups(app, { accessToken, studyId: fakeData.id() }).expect(401);
  });
});
