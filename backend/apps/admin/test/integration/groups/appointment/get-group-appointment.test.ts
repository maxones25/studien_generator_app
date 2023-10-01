import { AppModule } from '@admin/app.module';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { IApp, createApp } from '@test/app/createApp';
import { getAdminAccessToken } from '@test/admin/auth/loginAdmin';
import { getDirectorAccessToken } from '@test/admin/auth/loginDirector';
import fakeData from '@test/fakeData';
import { createGroupAppointmentId } from '@test/groups/addGroupAppointment';
import { createGroupId } from '@test/groups/createGroup';
import { getGroupAppointments } from '@test/groups/getGroupAppointments';
import { createStudyAppointmentId } from '@test/studies/addStudyAppointment';
import { createStudyId } from '@test/studies/createStudy';
import { deleteStudy } from '@test/studies/deleteStudy';
import { TEST_DIRECTOR } from '@test/testData';

describe('get groups appointments', () => {
  let app: IApp;
  let accessToken: string;
  let otherAccessToken: string;
  let studyId: string;
  let groupId: string;
  let otherGroupId: string;
  let studyAppointmentIds: string[];
  let groupAppointmentIds: string[];
  let otherGroupAppointmentIds: string[];

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

    studyAppointmentIds = [];

    studyAppointmentIds.push(
      await createStudyAppointmentId(app, { accessToken, studyId }),
    );

    studyAppointmentIds.push(
      await createStudyAppointmentId(app, { accessToken, studyId }),
    );

    groupId = await createGroupId(app, { accessToken, studyId });

    groupAppointmentIds = [];

    groupAppointmentIds.push(
      await createGroupAppointmentId(app, { accessToken, studyId, groupId }),
    );
    groupAppointmentIds.push(
      await createGroupAppointmentId(app, { accessToken, studyId, groupId }),
    );
    groupAppointmentIds.push(
      await createGroupAppointmentId(app, { accessToken, studyId, groupId }),
    );

    otherGroupId = await createGroupId(app, { accessToken, studyId });

    otherGroupAppointmentIds = [];

    otherGroupAppointmentIds.push(
      await createGroupAppointmentId(app, {
        accessToken,
        studyId,
        groupId: otherGroupId,
      }),
    );
  });

  afterAll(async () => {
    return await app.close();
  });

  it('should get group appointments', async () => {
    return getGroupAppointments(app, { accessToken, studyId, groupId })
      .expect(200)
      .then((res) => {
        const appointments = res.body;

        expect(Array.isArray(appointments)).toBeTruthy();
        expect(appointments.length).toBeGreaterThan(0);

        appointments.forEach((appointment) => {
          expect(
            [...studyAppointmentIds, ...groupAppointmentIds].includes(
              appointment.id,
            ),
          ).toBeTruthy();
          expect(otherGroupAppointmentIds.includes(appointment.id)).toBeFalsy();
        });
      });
  });

  it('should get study appointments', async () => {
    return getGroupAppointments(app, { accessToken, studyId, groupId })
      .expect(200)
      .then((res) => {
        const appointments = res.body;

        expect(Array.isArray(appointments)).toBeTruthy();
        expect(appointments.length).toBeGreaterThan(0);

        appointments.forEach((appointment) => {
          expect(
            [...studyAppointmentIds, ...groupAppointmentIds].includes(
              appointment.id,
            ),
          ).toBeTruthy();
          expect(otherGroupAppointmentIds.includes(appointment.id)).toBeFalsy();
        });
      });
  });

  it('should not get group appointments of other group', async () => {
    return getGroupAppointments(app, { accessToken, studyId, groupId })
      .expect(200)
      .then((res) => {
        const appointments = res.body;

        expect(Array.isArray(appointments)).toBeTruthy();
        expect(appointments.length).toBeGreaterThan(0);

        appointments.forEach((appointment) => {
          expect(
            [...studyAppointmentIds, ...groupAppointmentIds].includes(
              appointment.id,
            ),
          ).toBeTruthy();
          expect(otherGroupAppointmentIds.includes(appointment.id)).toBeFalsy();
        });
      });
  });

  it('should fail because unauthorized', async () => {
    return getGroupAppointments(app, {
      accessToken: undefined,
      studyId,
      groupId,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const adminAccessToken = await getAdminAccessToken(app);
    return getGroupAppointments(app, {
      accessToken: adminAccessToken,
      studyId,
      groupId,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    return getGroupAppointments(app, {
      accessToken: otherAccessToken,
      studyId,
      groupId,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    return getGroupAppointments(app, {
      accessToken,
      studyId: undefined,
      groupId,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    return getGroupAppointments(app, {
      accessToken,
      studyId: fakeData.text(),
      groupId,
    }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
    return getGroupAppointments(app, {
      accessToken,
      studyId: fakeData.id(),
      groupId,
    }).expect(401);
  });

  it('should fail because groupId is missing', async () => {
    return getGroupAppointments(app, {
      accessToken,
      studyId,
      groupId: undefined,
    }).expect(400);
  });

  it('should fail because groupId is invalid', async () => {
    return getGroupAppointments(app, {
      accessToken,
      studyId,
      groupId: fakeData.text(),
    }).expect(401);
  });

  it('should fail because groupId is unknown', async () => {
    return getGroupAppointments(app, {
      accessToken,
      studyId,
      groupId: fakeData.id(),
    }).expect(401);
  });
});
