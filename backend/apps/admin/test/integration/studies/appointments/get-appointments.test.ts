import { AppModule } from '@admin/app.module';
import {
  getDirectorAccessToken,
  getAdminAccessToken,
} from '@test/admin/director';
import {
  createStudyId,
  createStudyAppointmentId,
  getStudyAppointments,
} from '@test/admin/studies';
import { IApp, createApp } from '@test/app';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

describe('get appointments', () => {
  let app: IApp;
  let accessToken: string;
  let studyId: string;
  let createdAppointments: any[];

  beforeAll(async () => {
    app = await createApp(AppModule);

    createdAppointments = [];

    accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );

    studyId = await createStudyId(app, { accessToken });

    for (let i = 0; i < 3; i++) {
      const data = fakeData.appointment();
      const id = await createStudyAppointmentId(app, {
        accessToken,
        studyId,
        data,
      });
      createdAppointments.push({ ...data, id });
    }
  });

  afterAll(async () => {
    return await app.close();
  });

  it('should list all study appointments', () => {
    return getStudyAppointments(app, { accessToken, studyId })
      .expect(200)
      .then((res) => {
        const appointments = res.body;

        expect(Array.isArray(appointments)).toBeTruthy();
        expect(appointments.length).toBeGreaterThan(0);

        createdAppointments.forEach((createdAppointment) => {
          const appointment = appointments.find(
            (a) => a.id === createdAppointment.id,
          );

          expect(appointment).toBeTruthy();
          expect(appointment.id).toBe(createdAppointment.id);
          expect(appointment.subject).toBe(createdAppointment.subject);
          expect(appointment.startDate).toBe(createdAppointment.startDate);
          expect(appointment.startTime).toBe(
            createdAppointment.startTime + ':00',
          );
          expect(appointment.endDate).toBe(createdAppointment.endDate);
          expect(appointment.endTime).toBe(createdAppointment.endTime + ':00');
        });
      });
  });

  it('should fail because unauthorized', () => {
    return getStudyAppointments(app, {
      accessToken: undefined,
      studyId,
    }).expect(401);
  });

  it('should fail because Admin authorized', async () => {
    const accessToken = await getAdminAccessToken(app);
    return getStudyAppointments(app, { accessToken, studyId }).expect(401);
  });

  it('should fail because director is not study member', async () => {
    const accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );
    return getStudyAppointments(app, { accessToken, studyId }).expect(401);
  });

  it('should fail because studyId missing', async () => {
    return getStudyAppointments(app, {
      accessToken,
      studyId: undefined,
    }).expect(400);
  });

  it('should fail because studyId invalid', async () => {
    return getStudyAppointments(app, {
      accessToken,
      studyId: 'invalid',
    }).expect(401);
  });

  it('should fail because studyId unknown', async () => {
    return getStudyAppointments(app, {
      accessToken,
      studyId: fakeData.id(),
    }).expect(401);
  });
});
