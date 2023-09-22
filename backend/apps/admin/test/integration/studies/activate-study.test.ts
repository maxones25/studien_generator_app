import { AppModule } from '@admin/app.module';
import datetime from '@shared/modules/datetime/datetime';
import { IApp, createApp } from '@test/app/createApp';
import { getAdminAccessToken } from '@test/auth/loginAdmin';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import { createDirector } from '@test/director/signUpDirector';
import fakeData from '@test/fakeData';
import { createStudyId } from '@test/studies/createStudy';
import { getStudyById } from '@test/studies/getStudyById';
import { addMember } from '@test/studies/members/addMember';
import { setStudyActivation } from '@test/studies/setStudyActivation';
import { setStudyDuration } from '@test/studies/setStudyDuration';
import { setStudyEnd } from '@test/studies/setStudyEnd';
import { setStudyStart } from '@test/studies/setStudyStart';
import { TEST_DIRECTOR } from '@test/testData';

describe('activate study', () => {
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

  it('should activate study', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = fakeData.futureDate();
    const endDate = datetime.addDays(startDate, 90);

    const duration = 30;

    await setStudyStart(app, {
      accessToken,
      studyId,
      startDate: datetime.formatDate(startDate),
    }).expect(200);

    await setStudyEnd(app, {
      accessToken,
      studyId,
      endDate: datetime.formatDate(endDate),
    }).expect(200);

    await setStudyDuration(app, {
      accessToken,
      studyId,
      duration,
    }).expect(200);

    await setStudyActivation(app, {
      accessToken,
      studyId,
      isActive: true,
    }).expect(200);

    return getStudyById(app, { accessToken, studyId })
      .expect(200)
      .then((res) => {
        const study = res.body;

        expect(study.isActive).toBeTruthy();
      });
  });

  it('should fail because start is missing', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = fakeData.futureDate();
    const endDate = datetime.addDays(startDate, 90);
    const duration = 30;

    await setStudyEnd(app, {
      accessToken,
      studyId,
      endDate: datetime.formatDate(endDate),
    }).expect(200);

    await setStudyDuration(app, {
      accessToken,
      studyId,
      duration,
    }).expect(200);

    await setStudyActivation(app, {
      accessToken,
      studyId,
      isActive: true,
    }).expect(400);
  });

  it('should fail because end is missing', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = fakeData.futureDate();
    const duration = 30;

    await setStudyStart(app, {
      accessToken,
      studyId,
      startDate: datetime.formatDate(startDate),
    }).expect(200);

    await setStudyDuration(app, {
      accessToken,
      studyId,
      duration,
    }).expect(200);

    await setStudyActivation(app, {
      accessToken,
      studyId,
      isActive: true,
    }).expect(400);
  });

  it('should fail because duration is missing', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = fakeData.futureDate();
    const endDate = datetime.addDays(startDate, 90);

    await setStudyStart(app, {
      accessToken,
      studyId,
      startDate: datetime.formatDate(startDate),
    }).expect(200);

    await setStudyEnd(app, {
      accessToken,
      studyId,
      endDate: datetime.formatDate(endDate),
    }).expect(200);

    await setStudyActivation(app, {
      accessToken,
      studyId,
      isActive: true,
    }).expect(400);
  });

  it('should fail unauthorized', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = fakeData.futureDate();
    const endDate = datetime.addDays(startDate, 90);
    const duration = 7;

    await setStudyStart(app, {
      accessToken,
      studyId,
      startDate: datetime.formatDate(startDate),
    }).expect(200);

    await setStudyEnd(app, {
      accessToken,
      studyId,
      endDate: datetime.formatDate(endDate),
    }).expect(200);

    await setStudyDuration(app, {
      accessToken,
      studyId,
      duration,
    }).expect(200);

    await setStudyActivation(app, {
      accessToken: undefined,
      studyId,
      isActive: true,
    }).expect(401);
  });

  it('should fail admin is authorized', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = fakeData.futureDate();
    const endDate = datetime.addDays(startDate, 90);
    const duration = 7;

    await setStudyStart(app, {
      accessToken,
      studyId,
      startDate: datetime.formatDate(startDate),
    }).expect(200);

    await setStudyEnd(app, {
      accessToken,
      studyId,
      endDate: datetime.formatDate(endDate),
    }).expect(200);

    await setStudyDuration(app, {
      accessToken,
      studyId,
      duration,
    }).expect(200);

    const adminAccessToken = await getAdminAccessToken(app);

    await setStudyActivation(app, {
      accessToken: adminAccessToken,
      studyId,
      isActive: true,
    }).expect(401);
  });

  it('should fail director is not member of study', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = fakeData.futureDate();
    const endDate = datetime.addDays(startDate, 90);
    const duration = 7;

    await setStudyStart(app, {
      accessToken,
      studyId,
      startDate: datetime.formatDate(startDate),
    }).expect(200);

    await setStudyEnd(app, {
      accessToken,
      studyId,
      endDate: datetime.formatDate(endDate),
    }).expect(200);

    await setStudyDuration(app, {
      accessToken,
      studyId,
      duration,
    }).expect(200);

    const otherAccessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );

    await setStudyActivation(app, {
      accessToken: otherAccessToken,
      studyId,
      isActive: true,
    }).expect(401);
  });

  it('should fail director is not admin', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = fakeData.futureDate();
    const endDate = datetime.addDays(startDate, 90);
    const duration = 7;

    await setStudyStart(app, {
      accessToken,
      studyId,
      startDate: datetime.formatDate(startDate),
    }).expect(200);

    await setStudyEnd(app, {
      accessToken,
      studyId,
      endDate: datetime.formatDate(endDate),
    }).expect(200);

    await setStudyDuration(app, {
      accessToken,
      studyId,
      duration,
    }).expect(200);

    const director = await createDirector(app);

    await addMember(app, {
      accessToken,
      studyId,
      directorId: director.id,
      role: 'employee',
    }).expect(201)

    const otherAccessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );

    await setStudyActivation(app, {
      accessToken: otherAccessToken,
      studyId,
      isActive: true,
    }).expect(401);
  });

  it('should fail studyId is missing', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = fakeData.futureDate();
    const endDate = datetime.addDays(startDate, 90);
    const duration = 7;

    await setStudyStart(app, {
      accessToken,
      studyId,
      startDate: datetime.formatDate(startDate),
    }).expect(200);

    await setStudyEnd(app, {
      accessToken,
      studyId,
      endDate: datetime.formatDate(endDate),
    }).expect(200);

    await setStudyDuration(app, {
      accessToken,
      studyId,
      duration,
    }).expect(200);

    await setStudyActivation(app, {
      accessToken,
      studyId: undefined,
      isActive: true,
    }).expect(400);
  });

  it('should fail studyId is invalid', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = fakeData.futureDate();
    const endDate = datetime.addDays(startDate, 90);
    const duration = 7;

    await setStudyStart(app, {
      accessToken,
      studyId,
      startDate: datetime.formatDate(startDate),
    }).expect(200);

    await setStudyEnd(app, {
      accessToken,
      studyId,
      endDate: datetime.formatDate(endDate),
    }).expect(200);

    await setStudyDuration(app, {
      accessToken,
      studyId,
      duration,
    }).expect(200);

    await setStudyActivation(app, {
      accessToken,
      studyId: fakeData.text(),
      isActive: true,
    }).expect(401);
  });

  it('should fail studyId is unknown', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = fakeData.futureDate();
    const endDate = datetime.addDays(startDate, 90);
    const duration = 7;

    await setStudyStart(app, {
      accessToken,
      studyId,
      startDate: datetime.formatDate(startDate),
    }).expect(200);

    await setStudyEnd(app, {
      accessToken,
      studyId,
      endDate: datetime.formatDate(endDate),
    }).expect(200);

    await setStudyDuration(app, {
      accessToken,
      studyId,
      duration,
    }).expect(200);

    await setStudyActivation(app, {
      accessToken,
      studyId: fakeData.id(),
      isActive: true,
    }).expect(401);
  });

  it('should fail isActive is missing', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = fakeData.futureDate();
    const endDate = datetime.addDays(startDate, 90);
    const duration = 7;

    await setStudyStart(app, {
      accessToken,
      studyId,
      startDate: datetime.formatDate(startDate),
    }).expect(200);

    await setStudyEnd(app, {
      accessToken,
      studyId,
      endDate: datetime.formatDate(endDate),
    }).expect(200);

    await setStudyDuration(app, {
      accessToken,
      studyId,
      duration,
    }).expect(200);

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
    const duration = 7;

    await setStudyStart(app, {
      accessToken,
      studyId,
      startDate: datetime.formatDate(startDate),
    }).expect(200);

    await setStudyEnd(app, {
      accessToken,
      studyId,
      endDate: datetime.formatDate(endDate),
    }).expect(200);

    await setStudyDuration(app, {
      accessToken,
      studyId,
      duration,
    }).expect(200);

    await setStudyActivation(app, {
      accessToken,
      studyId,
      isActive: 1,
    }).expect(400);
  });
});
