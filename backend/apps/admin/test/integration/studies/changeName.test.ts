import { AppModule } from '@admin/app.module';
import { Roles } from '@entities/core/study';
import { IApp, createApp } from '@test/app/createApp';
import { getAdminAccessToken } from '@test/auth/loginAdmin';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import { createDirector } from '@test/director/signUpDirector';
import fakeData from '@test/fakeData';
import { changeStudyName } from '@test/studies/changeStudyName';
import { createStudy, createStudyId } from '@test/studies/createStudy';
import { getStudyById } from '@test/studies/getStudyById';
import { addMember } from '@test/studies/members/addMember';
import { TEST_DIRECTOR } from '@test/testData';

describe('Change Study Name', () => {
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

  afterAll(async () => {
    await app.close();
  });

  it('should update study successfully', async () => {
    const data = fakeData.study();
    const studyId = await createStudyId(app, { accessToken, data });

    const updatedStudy = fakeData.study();

    await changeStudyName(app, {
      accessToken,
      studyId,
      data: updatedStudy,
    }).expect(200);

    await getStudyById(app, { accessToken, studyId })
      .expect(200)
      .then((res) => {
        expect(res.body.id).toEqual(studyId);
        expect(res.body.name).toEqual(updatedStudy.name);
        expect(res.body.role).toEqual(Roles.Admin);
      });
  });

  it('should fail because unauthorized', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const name = fakeData.study().name;

    await changeStudyName(app, {
      accessToken: undefined,
      studyId,
      data: {
        name,
      },
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const name = fakeData.study().name;

    const adminAccessToken = await getAdminAccessToken(app);

    await changeStudyName(app, {
      accessToken: adminAccessToken,
      studyId,
      data: {
        name,
      },
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const name = fakeData.study().name;

    const adminAccessToken = await getAdminAccessToken(app);

    await changeStudyName(app, {
      accessToken: adminAccessToken,
      studyId,
      data: {
        name,
      },
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    const studyId = await createStudyId(app, {
      accessToken,
    });

    const name = fakeData.study().name;

    await changeStudyName(app, {
      accessToken: otherAccessToken,
      studyId,
      data: {
        name,
      },
    }).expect(401);
  });

  it('should fail because director is not an admin', async () => {
    const director = await createDirector(app);

    const studyId = await createStudyId(app, {
      accessToken,
    });

    await addMember(app, {
      accessToken,
      studyId,
      directorId: director.id,
      role: 'employee',
    });

    const directorAccessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );

    const name = fakeData.study().name;

    await changeStudyName(app, {
      accessToken: directorAccessToken,
      studyId,
      data: {
        name,
      },
    }).expect(401);
  });

  it('should fail because name is empty', async () => {
    const data = fakeData.study();
    const studyId = await createStudyId(app, { accessToken, data });

    await changeStudyName(app, {
      accessToken,
      studyId,
      data: { name: '' },
    }).expect(400);
  });

  it('should fail because name already exists', async () => {
    const data = fakeData.study();

    await createStudy(app, {
      accessToken,
      data,
    });

    const studyId = await createStudyId(app, {
      accessToken,
      data: fakeData.study(),
    });

    await changeStudyName(app, {
      accessToken,
      studyId,
      data: { name: data.name },
    }).expect(422);
  });
});
