import { AppModule } from '@admin/app.module';
import datetime from '@shared/modules/datetime/datetime';
import {
  getDirectorAccessToken,
  getAdminAccessToken,
  createDirector,
} from '@test/admin/director';
import {
  createStudyId,
  setStudyEnd,
  getStudyById,
  setStudyDuration,
  addMember,
} from '@test/admin/studies';
import { setStudyStart } from '@test/admin/studies/setStudyStart';
import { IApp, createApp } from '@test/app';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

describe('set study end', () => {
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

  it('should set end when there is no start and duration', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const endDate = datetime.formatDate(fakeData.futureDate());

    await setStudyEnd(app, {
      accessToken,
      studyId,
      endDate,
    }).expect(200);

    return getStudyById(app, { accessToken, studyId })
      .expect(200)
      .then((res) => {
        const study = res.body;

        expect(study.endDate).toBe(endDate + 'T00:00:00.000Z');
      });
  });

  it('should set end when study duration is bigger than duration', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = fakeData.futureDate();
    const endDate = datetime.addDays(startDate, 90);

    const duration = 7;

    await setStudyDuration(app, {
      accessToken,
      studyId,
      duration,
    }).expect(200);

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
  });

  it('should fail because end is before start', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = fakeData.futureDate();
    const endDate = datetime.addDays(startDate, -1);

    await setStudyStart(app, {
      accessToken,
      studyId,
      startDate: datetime.formatDate(startDate),
    }).expect(200);

    await setStudyEnd(app, {
      accessToken,
      studyId,
      endDate: datetime.formatDate(endDate),
    }).expect(400);
  });

  it('should fail because study duration is smaller than duration', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = fakeData.futureDate();
    const endDate = datetime.addDays(startDate, 30);

    const duration = 31;

    await setStudyDuration(app, {
      accessToken,
      studyId,
      duration,
    }).expect(200);

    await setStudyStart(app, {
      accessToken,
      studyId,
      startDate: datetime.formatDate(startDate),
    }).expect(200);

    await setStudyEnd(app, {
      accessToken,
      studyId,
      endDate: datetime.formatDate(endDate),
    }).expect(400);
  });

  it('should fail because unauthorized', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const endDate = datetime.formatDate(fakeData.futureDate());

    await setStudyEnd(app, {
      accessToken: undefined,
      studyId,
      endDate,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const endDate = datetime.formatDate(fakeData.futureDate());

    const adminAccessToken = await getAdminAccessToken(app);

    await setStudyEnd(app, {
      accessToken: adminAccessToken,
      studyId,
      endDate,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const endDate = datetime.formatDate(fakeData.futureDate());

    const otherAccessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );

    await setStudyEnd(app, {
      accessToken: otherAccessToken,
      studyId,
      endDate,
    }).expect(401);
  });

  it('should fail because director is not admin', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const endDate = datetime.formatDate(fakeData.futureDate());

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

    await setStudyEnd(app, {
      accessToken: otherAccessToken,
      studyId,
      endDate,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    await createStudyId(app, { accessToken });

    const endDate = datetime.formatDate(fakeData.futureDate());

    await setStudyEnd(app, {
      accessToken,
      studyId: undefined,
      endDate,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    await createStudyId(app, { accessToken });

    const endDate = datetime.formatDate(fakeData.futureDate());

    await setStudyEnd(app, {
      accessToken,
      studyId: fakeData.text(),
      endDate,
    }).expect(401);
  });

  it('should fail because studyId is invalid', async () => {
    await createStudyId(app, { accessToken });

    const endDate = datetime.formatDate(fakeData.futureDate());

    await setStudyEnd(app, {
      accessToken,
      studyId: fakeData.id(),
      endDate,
    }).expect(401);
  });

  it('should fail because startDate is missing', async () => {
    const studyId = await createStudyId(app, { accessToken });

    await setStudyEnd(app, {
      accessToken,
      studyId,
      endDate: undefined,
    }).expect(400);
  });

  it('should fail because startDate is not a date', async () => {
    const studyId = await createStudyId(app, { accessToken });

    await setStudyEnd(app, {
      accessToken,
      studyId,
      endDate: 'undefined',
    }).expect(400);
  });
});
