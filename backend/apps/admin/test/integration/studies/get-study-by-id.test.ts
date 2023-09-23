import { AppModule } from '@admin/app.module';
import datetime from '@shared/modules/datetime/datetime';
import { IApp, createApp } from '@test/app/createApp';
import { getAdminAccessToken } from '@test/auth/loginAdmin';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import fakeData from '@test/fakeData';
import { createStudyId } from '@test/studies/createStudy';
import { getStudyById } from '@test/studies/getStudyById';
import { activateStudy } from '@test/studies/setStudyActivation';
import { TEST_DIRECTOR } from '@test/testData';

describe('get study by id', () => {
  let app: IApp;
  let accessToken: string;
  let otherAccessToken: string;

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
  });

  afterAll(async () => app.close());

  it('should get study by id', async () => {
    const data = fakeData.study();

    const studyId = await createStudyId(app, { accessToken, data });

    return await getStudyById(app, { accessToken, studyId })
      .expect(200)
      .then((res) => {
        const study = res.body;

        expect(study.id).toBe(studyId);
        expect(study.name).toBe(data.name);
        expect(study.deletedAt).toBeNull();
        expect(study.role).toBe('admin');
        expect(study.isActive).toBe(false);
        expect(study.startDate).toBe(null);
        expect(study.endDate).toBe(null);
        expect(study.duration).toBe(null);
      });
  });

  it('should get activated study by id', async () => {
    const data = fakeData.study();

    const studyId = await createStudyId(app, { accessToken, data });

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

    return await getStudyById(app, { accessToken, studyId })
      .expect(200)
      .then((res) => {
        const study = res.body;

        expect(study.id).toBe(studyId);
        expect(study.isActive).toBe(true);
        expect(study.startDate).toBe(
          datetime.formatDate(startDate) + 'T00:00:00.000Z',
        );
        expect(study.endDate).toBe(
          datetime.formatDate(endDate) + 'T00:00:00.000Z',
        );
        expect(study.duration).toBe(30);
      });
  });

  it('should fail because unauthorized', async () => {
    const studyId = await createStudyId(app, { accessToken });

    return await getStudyById(app, { accessToken: undefined, studyId }).expect(
      401,
    );
  });

  it('should fail because admin is authorized', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const adminAccessToken = await getAdminAccessToken(app);

    return await getStudyById(app, {
      accessToken: adminAccessToken,
      studyId,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    const studyId = await createStudyId(app, { accessToken });

    return await getStudyById(app, {
      accessToken: otherAccessToken,
      studyId,
    }).expect(401);
  });

  it('should fail because studyId missing', async () => {
    const studyId = await createStudyId(app, { accessToken });

    return await getStudyById(app, {
      accessToken,
      studyId: undefined,
    }).expect(400);
  });

  it('should fail because studyId invalid', async () => {
    await createStudyId(app, { accessToken });

    return await getStudyById(app, {
      accessToken,
      studyId: fakeData.text(),
    }).expect(401);
  });

  it('should fail because studyId unknown', async () => {
    await createStudyId(app, { accessToken });

    return await getStudyById(app, {
      accessToken,
      studyId: fakeData.id(),
    }).expect(401);
  });
});
