import { AppModule } from '@admin/app.module';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { IApp, createApp } from '@test/app/createApp';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import fakeData from '@test/fakeData';
import { createStudyAppointment } from '@test/studies/addStudyAppointment';
import { createStudyId } from '@test/studies/createStudy';
import { TEST_DIRECTOR } from '@test/testData';

describe('add appointment to study', () => {
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
    return await app.close();
  });

  it('should add an appointment to a study', () => {
    return createStudyAppointment(app, { accessToken, studyId })
      .expect(201)
      .then((res) => {
        const id = res.text;
        expect(validateUUID(id)).toBeTruthy();
      });
  });

  it('should fail because unauthorized', () => {
    return createStudyAppointment(app, {
      accessToken: undefined,
      studyId,
    }).expect(401);
  });

  it('should fail because studyId missing', () => {
    return createStudyAppointment(app, {
      accessToken,
      studyId: undefined,
    }).expect(400);
  });

  it('should fail because studyId invalid', () => {
    return createStudyAppointment(app, {
      accessToken,
      studyId: 'invalid',
    }).expect(401);
  });

  it('should fail because studyId unknown', () => {
    return createStudyAppointment(app, {
      accessToken,
      studyId: fakeData.id(),
    }).expect(401);
  });

  it('should fail because director does not belong to study', async () => {
    const accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );

    return createStudyAppointment(app, {
      accessToken,
      studyId,
    }).expect(401);
  });

  it('should fail because startDate missing', async () => {
    const data = fakeData.appointment();
    delete data.startDate;
    return createStudyAppointment(app, {
      accessToken,
      studyId,
      data,
    }).expect(400);
  });

  it('should fail because startDate is wrong type', async () => {
    const data = fakeData.appointment();
    return createStudyAppointment(app, {
      accessToken,
      studyId,
      data: {
        ...data,
        startDate: true,
      },
    }).expect(400);
  });

  it('should fail because subject missing', async () => {
    const data = fakeData.appointment();
    delete data.subject;
    return createStudyAppointment(app, {
      accessToken,
      studyId,
      data,
    }).expect(400);
  });

  it('should fail because subject is empty', async () => {
    const data = fakeData.appointment();
    return createStudyAppointment(app, {
      accessToken,
      studyId,
      data: {
        ...data,
        subject: '',
      },
    }).expect(400);
  });

  it('should fail because subject is wrong type', async () => {
    const data = fakeData.appointment();
    return createStudyAppointment(app, {
      accessToken,
      studyId,
      data: {
        ...data,
        subject: true,
      },
    }).expect(400);
  });

  it('should fail because startTime missing', async () => {
    const data = fakeData.appointment();
    delete data.startTime;
    return createStudyAppointment(app, {
      accessToken,
      studyId,
      data,
    }).expect(400);
  });

  it('should fail because startTime is wrong type', async () => {
    const data = fakeData.appointment();
    return createStudyAppointment(app, {
      accessToken,
      studyId,
      data: {
        ...data,
        startTime: 123,
      },
    }).expect(400);
  });

  it('should fail because endDate missing', async () => {
    const data = fakeData.appointment();
    delete data.endDate;
    return createStudyAppointment(app, {
      accessToken,
      studyId,
      data,
    }).expect(400);
  });

  it('should fail because endDate is wrong type', async () => {
    const data = fakeData.appointment();
    return createStudyAppointment(app, {
      accessToken,
      studyId,
      data: {
        ...data,
        endDate: {},
      },
    }).expect(400);
  });

  it('should fail because endDate missing', async () => {
    const data = fakeData.appointment();
    delete data.endDate;
    return createStudyAppointment(app, {
      accessToken,
      studyId,
      data,
    }).expect(400);
  });

  it('should fail because endDate is wrong type', async () => {
    const data = fakeData.appointment();
    return createStudyAppointment(app, {
      accessToken,
      studyId,
      data: {
        ...data,
        endDate: {},
      },
    }).expect(400);
  });

  it('should fail because endTime missing', async () => {
    const data = fakeData.appointment();
    delete data.endTime;
    return createStudyAppointment(app, {
      accessToken,
      studyId,
      data,
    }).expect(400);
  });

  it('should fail because endDate is wrong type', async () => {
    const data = fakeData.appointment();
    return createStudyAppointment(app, {
      accessToken,
      studyId,
      data: {
        ...data,
        endTime: 456,
      },
    }).expect(400);
  });

  it('should fail because endTime is before startTime on the same day', async () => {
    const data = fakeData.appointment();
    data.startTime = '20:00';
    data.endTime = '19:59';
    return createStudyAppointment(app, {
      accessToken,
      studyId,
      data,
    }).expect(400);
  });

  it('should fail because endDate before startDate', async () => {
    const data = fakeData.appointment();
    data.startDate = '2020-02-02';
    data.endDate = '2020-02-01';
    return createStudyAppointment(app, {
      accessToken,
      studyId,
      data,
    }).expect(400);
  });

  it('should fail because end before start', async () => {
    const data = fakeData.appointment();
    data.startDate = '2020-02-02';
    data.endDate = '2020-02-01';
    data.startTime = '20:00';
    data.endTime = '19:59';
    return createStudyAppointment(app, {
      accessToken,
      studyId,
      data,
    }).expect(400);
  });
});
