import { AppModule } from '@admin/app.module';
import datetime from '@shared/modules/datetime/datetime';
import {
  getDirectorAccessToken,
  getAdminAccessToken,
  createDirector,
} from '@test/admin/director';
import {
  createStudyId,
  activateStudy,
  setStudyActivation,
  getStudyById,
} from '@test/admin/studies';
import { IApp, createApp } from '@test/app';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

describe('deactivate study', () => {
  let app: IApp;
  let accessToken: string;
  beforeAll(async () => {
    app = await createApp(AppModule);

    accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );
  });

  afterAll(async () => app.close());

  it('should deactivate study', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = fakeData.futureDate();
    const endDate = datetime.addDays(startDate, 90);
    const duration = 30;

    await activateStudy(app, {
      accessToken,
      studyId,
      startDate,
      endDate,
      duration,
    });

    await setStudyActivation(app, {
      accessToken,
      studyId,
      isActive: false,
    }).expect(200);

    return getStudyById(app, { accessToken, studyId })
      .expect(200)
      .then((res) => {
        const study = res.body;

        expect(study.isActive).toBeFalsy();
      });
  });

  it('should fail because unauthorized', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = fakeData.futureDate();
    const endDate = datetime.addDays(startDate, 90);
    const duration = 30;

    await activateStudy(app, {
      accessToken,
      studyId,
      startDate,
      endDate,
      duration,
    });

    await setStudyActivation(app, {
      accessToken: undefined,
      studyId,
      isActive: false,
    }).expect(401);
  });

  it('should fail because unauthorized', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = fakeData.futureDate();
    const endDate = datetime.addDays(startDate, 90);

    const duration = 30;

    await activateStudy(app, {
      accessToken,
      studyId,
      startDate,
      endDate,
      duration,
    });

    await setStudyActivation(app, {
      accessToken: undefined,
      studyId,
      isActive: false,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = fakeData.futureDate();
    const endDate = datetime.addDays(startDate, 90);
    const duration = 30;

    const adminAccessToken = await getAdminAccessToken(app);

    await activateStudy(app, {
      accessToken,
      studyId,
      startDate,
      endDate,
      duration,
    });

    await setStudyActivation(app, {
      accessToken: adminAccessToken,
      studyId,
      isActive: false,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = fakeData.futureDate();
    const endDate = datetime.addDays(startDate, 90);
    const duration = 30;

    await activateStudy(app, {
      accessToken,
      studyId,
      startDate,
      endDate,
      duration,
    });

    const otherAccessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );

    await setStudyActivation(app, {
      accessToken: otherAccessToken,
      studyId,
      isActive: false,
    }).expect(401);
  });

  it('should fail because director is not admin', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = fakeData.futureDate();
    const endDate = datetime.addDays(startDate, 90);
    const duration = 30;

    await activateStudy(app, {
      accessToken,
      studyId,
      startDate,
      endDate,
      duration,
    });

    const director = await createDirector(app);

    const otherAccessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );

    await setStudyActivation(app, {
      accessToken: otherAccessToken,
      studyId,
      isActive: false,
    }).expect(401);
  });

  it('should fail studyId is missing', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = fakeData.futureDate();
    const endDate = datetime.addDays(startDate, 90);
    const duration = 30;

    await activateStudy(app, {
      accessToken,
      studyId,
      startDate,
      endDate,
      duration,
    });

    await setStudyActivation(app, {
      accessToken,
      studyId: undefined,
      isActive: false,
    }).expect(400);
  });

  it('should fail studyId is invalid', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = fakeData.futureDate();
    const endDate = datetime.addDays(startDate, 90);
    const duration = 30;

    await activateStudy(app, {
      accessToken,
      studyId,
      startDate,
      endDate,
      duration,
    });

    await setStudyActivation(app, {
      accessToken,
      studyId: fakeData.text(),
      isActive: false,
    }).expect(401);
  });

  it('should fail studyId is unknown', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = fakeData.futureDate();
    const endDate = datetime.addDays(startDate, 90);
    const duration = 30;

    await activateStudy(app, {
      accessToken,
      studyId,
      startDate,
      endDate,
      duration,
    });

    await setStudyActivation(app, {
      accessToken,
      studyId: fakeData.id(),
      isActive: false,
    }).expect(401);
  });

  it('should fail isActive is missing', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = fakeData.futureDate();
    const endDate = datetime.addDays(startDate, 90);
    const duration = 30;

    await activateStudy(app, {
      accessToken,
      studyId,
      startDate,
      endDate,
      duration,
    });

    await setStudyActivation(app, {
      accessToken,
      studyId,
      isActive: undefined,
    }).expect(400);
  });

  it('should fail isActive is wrong type', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = fakeData.futureDate();
    const endDate = datetime.addDays(startDate, 90);
    const duration = 30;

    await activateStudy(app, {
      accessToken,
      studyId,
      startDate,
      endDate,
      duration,
    });

    await setStudyActivation(app, {
      accessToken,
      studyId,
      isActive: 0,
    }).expect(400);
  });
});
