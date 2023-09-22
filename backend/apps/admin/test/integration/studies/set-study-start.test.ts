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
import { setStudyDuration } from '@test/studies/setStudyDuration';
import { setStudyEnd } from '@test/studies/setStudyEnd';
import { setStudyStart } from '@test/studies/setStudyStart';
import { TEST_DIRECTOR } from '@test/testData';

describe('set study start', () => {
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

  it('should set start when there is no end and duration', async () => {
    const studyId = await createStudyId(app, { accessToken });
    const startDate = datetime.formatDate(fakeData.futureDate());

    await setStudyStart(app, {
      accessToken,
      studyId,
      startDate,
    }).expect(200);

    return getStudyById(app, { accessToken, studyId })
      .expect(200)
      .then((res) => {
        const study = res.body;

        expect(study.startDate).toBe(startDate + 'T00:00:00.000Z');
      });
  });

  it('should set start when study duration is bigger than duration', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = fakeData.futureDate();
    const endDate = datetime.addDays(startDate, 90);

    const duration = 7;

    await setStudyDuration(app, {
      accessToken,
      studyId,
      duration,
    }).expect(200);

    await setStudyEnd(app, {
      accessToken,
      studyId,
      endDate: datetime.formatDate(endDate),
    }).expect(200);

    await setStudyStart(app, {
      accessToken,
      studyId,
      startDate: datetime.formatDate(startDate),
    }).expect(200);
  });

  it('should fail because start is after end', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = fakeData.futureDate();
    const endDate = datetime.addDays(startDate, -1);

    await setStudyEnd(app, {
      accessToken,
      studyId,
      endDate: datetime.formatDate(endDate),
    }).expect(200);

    await setStudyStart(app, {
      accessToken,
      studyId,
      startDate: datetime.formatDate(startDate),
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

    await setStudyEnd(app, {
      accessToken,
      studyId,
      endDate: datetime.formatDate(endDate),
    }).expect(200);

    await setStudyStart(app, {
      accessToken,
      studyId,
      startDate: datetime.formatDate(startDate),
    }).expect(400);
  });

  it('should fail because unauthorized', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = datetime.formatDate(fakeData.futureDate());

    await setStudyStart(app, {
      accessToken: undefined,
      studyId,
      startDate,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = datetime.formatDate(fakeData.futureDate());

    const adminAccessToken = await getAdminAccessToken(app);

    await setStudyStart(app, {
      accessToken: adminAccessToken,
      studyId,
      startDate,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = datetime.formatDate(fakeData.futureDate());

    const otherAccessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );

    await setStudyStart(app, {
      accessToken: otherAccessToken,
      studyId,
      startDate,
    }).expect(401);
  });

  it('should fail because director is not admin', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const startDate = datetime.formatDate(fakeData.futureDate());

    const director = await createDirector(app);

    await addMember(app, {
      accessToken,
      studyId,
      directorId: director.id,
      role: 'employee',
    });

    const otherAccessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );

    await setStudyStart(app, {
      accessToken: otherAccessToken,
      studyId,
      startDate,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    await createStudyId(app, { accessToken });

    const startDate = datetime.formatDate(fakeData.futureDate());

    await setStudyStart(app, {
      accessToken,
      studyId: undefined,
      startDate,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    await createStudyId(app, { accessToken });

    const startDate = datetime.formatDate(fakeData.futureDate());

    await setStudyStart(app, {
      accessToken,
      studyId: fakeData.text(),
      startDate,
    }).expect(401);
  });

  it('should fail because studyId is invalid', async () => {
    await createStudyId(app, { accessToken });

    const startDate = datetime.formatDate(fakeData.futureDate());

    await setStudyStart(app, {
      accessToken,
      studyId: fakeData.id(),
      startDate,
    }).expect(401);
  });

  it('should fail because startDate is missing', async () => {
    const studyId = await createStudyId(app, { accessToken });

    await setStudyStart(app, {
      accessToken,
      studyId,
      startDate: undefined,
    }).expect(400);
  });

  it('should fail because startDate is not a date', async () => {
    const studyId = await createStudyId(app, { accessToken });

    await setStudyStart(app, {
      accessToken,
      studyId,
      startDate: 'undefined',
    }).expect(400);
  });
});
