import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { AppModule } from '@admin/app.module';
import { createStudy } from '@test/studies/createStudy';
import { getStudyById } from '@test/studies/getStudyById';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import { IApp, createApp } from '@test/app/createApp';
import { Roles } from '@entities/core/study';

describe('Create Study', () => {
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

  afterAll(async () => {
    await app.close();
  });

  it('should create a study', async () => {
    const data = fakeData.study();
    await createStudy(app, { accessToken, data })
      .expect(201)
      .then(async (res) => {
        expect(validateUUID(res.text)).toBeTruthy();

        const studyId = res.text;

        await getStudyById(app, { accessToken, studyId })
          .expect(200)
          .then((res) => {
            expect(res.body.role).toBe(Roles.Admin);
          });
      });
  });

  it('should fail because name is missing', () => {
    const data = fakeData.study();
    delete data.name;
    return createStudy(app, { accessToken, data }).expect(400);
  });

  it('should fail because name is empty', () => {
    const data = fakeData.study();
    data.name = '';
    return createStudy(app, { accessToken, data }).expect(400);
  });

  it('should fail because name already exists', async () => {
    const data = fakeData.study();
    await createStudy(app, { accessToken, data }).expect(201);

    return await createStudy(app, { accessToken, data }).expect(422);
  });
});
