import { AppModule } from '@admin/app.module';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { IApp, createApp } from '@test/app/createApp';
import { getAdminAccessToken } from '@test/auth/loginAdmin';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import fakeData from '@test/fakeData';
import { createGroupAppointment } from '@test/groups/addGroupAppointment';
import { createGroupId } from '@test/groups/createGroup';
import { getGroupAppointments } from '@test/groups/getGroupAppointments';
import { createStudyId } from '@test/studies/createStudy';
import { deleteStudy } from '@test/studies/deleteStudy';
import { TEST_DIRECTOR } from '@test/testData';

describe('add appointment to group', () => {
  let app: IApp;
  let accessToken: string;
  let otherAccessToken: string;
  let studyId: string;
  let groupId: string;

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

    groupId = await createGroupId(app, { accessToken, studyId });
  });

  afterAll(async () => {
    return await app.close();
  });

  it('should add an appointment to a group', async () => {
    await createGroupAppointment(app, { accessToken, studyId, groupId })
      .expect(201)
      .then((res) => {
        const id = res.text;
        expect(validateUUID(id)).toBeTruthy();
      });

    return getGroupAppointments(app, { accessToken, studyId, groupId })
      .expect(200)
      .then((res) => {
        const appointments = res.body;

        expect(Array.isArray(appointments)).toBeTruthy();
        expect(appointments.length).toBeGreaterThan(0);
      });
  });

  it('should fail because study is deleted', async () => {
    const studyId = await createStudyId(app, { accessToken });

    await deleteStudy(app, { accessToken, studyId, hardDelete: false });

    return createGroupAppointment(app, {
      accessToken,
      studyId,
      groupId,
    }).expect(401);
  });

  it('should fail because unauthorized', () => {
    return createGroupAppointment(app, {
      accessToken: undefined,
      studyId,
      groupId,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const adminAccessToken = await getAdminAccessToken(app);
    return createGroupAppointment(app, {
      accessToken: adminAccessToken,
      studyId,
      groupId,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    return createGroupAppointment(app, {
      accessToken: otherAccessToken,
      studyId,
      groupId,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    return createGroupAppointment(app, {
      accessToken,
      studyId: undefined,
      groupId,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    return createGroupAppointment(app, {
      accessToken,
      studyId: fakeData.text(),
      groupId,
    }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
    return createGroupAppointment(app, {
      accessToken,
      studyId: fakeData.id(),
      groupId,
    }).expect(401);
  });

  it('should fail because groupId is missing', async () => {
    return createGroupAppointment(app, {
      accessToken,
      studyId,
      groupId: undefined,
    }).expect(400);
  });

  it('should fail because groupId is invalid', async () => {
    return createGroupAppointment(app, {
      accessToken,
      studyId,
      groupId: fakeData.text(),
    }).expect(401);
  });

  it('should fail because groupId is unknown', async () => {
    return createGroupAppointment(app, {
      accessToken,
      studyId,
      groupId: fakeData.id(),
    }).expect(401);
  });
});
