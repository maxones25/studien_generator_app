import { AppModule } from '@admin/app.module';
import datetime from '@shared/modules/datetime/datetime';
import {
  getDirectorAccessToken,
  getAdminAccessToken,
  createDirector,
} from '@test/admin/director';
import {
  createStudyId,
  setStudyDuration,
  getStudyById,
  setStudyEnd,
  addMember,
} from '@test/admin/studies';
import { setStudyStart } from '@test/admin/studies/setStudyStart';
import { IApp, createApp } from '@test/app';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

describe('set study duration', () => {
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

  it('should set duration to positive integer', async () => {
    const studyId = await createStudyId(app, { accessToken });
    const duration = fakeData.positiveInteger();

    await setStudyDuration(app, {
      accessToken,
      studyId,
      duration,
    }).expect(200);

    return getStudyById(app, { accessToken, studyId })
      .expect(200)
      .then((res) => {
        const study = res.body;

        expect(study.duration).toBe(duration);
      });
  });

  it('should set duration smaller than the study duration', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const studyDuration = 30;

    const startDate = fakeData.futureDate();

    const endDate = datetime.addDays(startDate, studyDuration);

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

    const duration = 7;

    return await setStudyDuration(app, {
      accessToken,
      studyId,
      duration,
    }).expect(200);
  });

  it('should fail because duration is missing', async () => {
    const studyId = await createStudyId(app, { accessToken });

    return await setStudyDuration(app, {
      accessToken,
      studyId,
      duration: undefined,
    }).expect(400);
  });

  it('should fail because duration is wrong type', async () => {
    const studyId = await createStudyId(app, { accessToken });

    return await setStudyDuration(app, {
      accessToken,
      studyId,
      duration: fakeData.text(),
    }).expect(400);
  });

  it('should fail because duration is zero', async () => {
    const studyId = await createStudyId(app, { accessToken });
    const duration = 0;

    return await setStudyDuration(app, {
      accessToken,
      studyId,
      duration,
    }).expect(400);
  });

  it('should fail because duration is negative', async () => {
    const studyId = await createStudyId(app, { accessToken });
    const duration = -1;

    return await setStudyDuration(app, {
      accessToken,
      studyId,
      duration,
    }).expect(400);
  });

  it('should fail because duration is not integer', async () => {
    const studyId = await createStudyId(app, { accessToken });
    const duration = 2.5;

    return await setStudyDuration(app, {
      accessToken,
      studyId,
      duration,
    }).expect(400);
  });

  it('should fail because start and end date is smaller', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const studyDuration = 30;

    const startDate = fakeData.futureDate();

    const endDate = datetime.addDays(startDate, studyDuration);

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

    const duration = 31;

    return await setStudyDuration(app, {
      accessToken,
      studyId,
      duration,
    }).expect(400);
  });

  it('should fail because unauthorized', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const duration = fakeData.positiveInteger();

    return await setStudyDuration(app, {
      accessToken: undefined,
      studyId,
      duration,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const duration = fakeData.positiveInteger();

    const adminAccessToken = await getAdminAccessToken(app);

    return await setStudyDuration(app, {
      accessToken: adminAccessToken,
      studyId,
      duration,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const duration = fakeData.positiveInteger();

    const otherAccessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );

    return await setStudyDuration(app, {
      accessToken: otherAccessToken,
      studyId,
      duration,
    }).expect(401);
  });

  it('should fail because director is not admin', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const duration = fakeData.positiveInteger();

    const director = await createDirector(app);

    await addMember(app, {
      accessToken,
      studyId,
      directorId: director.id,
      role: 'employee',
    }).expect(201);

    const otherAccessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );

    return await setStudyDuration(app, {
      accessToken: otherAccessToken,
      studyId,
      duration,
    }).expect(401);
  });

  it('should fail because studyId missing', async () => {
    await createStudyId(app, { accessToken });

    const duration = fakeData.positiveInteger();

    return await setStudyDuration(app, {
      accessToken,
      studyId: undefined,
      duration,
    }).expect(400);
  });

  it('should fail because studyId invalid', async () => {
    await createStudyId(app, { accessToken });

    const duration = fakeData.positiveInteger();

    return await setStudyDuration(app, {
      accessToken,
      studyId: fakeData.text(),
      duration,
    }).expect(401);
  });

  it('should fail because studyId unknown', async () => {
    await createStudyId(app, { accessToken });

    const duration = fakeData.positiveInteger();

    return await setStudyDuration(app, {
      accessToken,
      studyId: fakeData.id(),
      duration,
    }).expect(401);
  });
});
