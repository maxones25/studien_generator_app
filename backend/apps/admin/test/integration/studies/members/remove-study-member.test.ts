import { AppModule } from '@admin/app.module';
import { IApp, createApp } from '@test/app/createApp';
import { getDirectorAccessToken } from '@test/admin/auth/loginDirector';
import { createDirector } from '@test/director/signUpDirector';
import fakeData from '@test/fakeData';
import { createStudyId } from '@test/studies/createStudy';
import { addMember } from '@test/studies/members/addMember';
import { removeMember } from '@test/studies/members/removeMember';
import { TEST_DIRECTOR } from '@test/testData';

describe('Remove Study Member', () => {
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

  it('should successfully remove a study member given a valid studyId and directorId', async () => {
    const studyId = await createStudyId(app, {
      accessToken,
      data: fakeData.study(),
    });

    const director = await createDirector(app);

    const directorId = director.id;

    await addMember(app, {
      accessToken,
      studyId,
      directorId,
      role: 'employee',
    });

    await removeMember(app, { accessToken, studyId, directorId }).expect(200);
  });

  it('should successfully change admin and remove former admin', async () => {
    const studyId = await createStudyId(app, {
      accessToken,
      data: fakeData.study(),
    });

    const director = await createDirector(app);

    const directorId = director.id;

    await addMember(app, {
      accessToken,
      studyId,
      directorId,
      role: 'admin',
    });

    await removeMember(app, {
      accessToken,
      studyId,
      directorId: TEST_DIRECTOR.MAX.ID,
    }).expect(200);
  });

  it('should throw an error if invalid directorId is provided', async () => {
    const studyId = await createStudyId(app, {
      accessToken,
      data: fakeData.study(),
    });

    await removeMember(app, {
      accessToken,
      studyId,
      directorId: 'invalid-id',
    }).expect(401);
  });

  it('should throw an error if invalid studyId is provided', async () => {
    const studyId = await createStudyId(app, {
      accessToken,
      data: fakeData.study(),
    });

    await removeMember(app, {
      accessToken,
      studyId: 'invalid-id',
      directorId: TEST_DIRECTOR.MAX.ID,
    }).expect(401);
  });

  it('should throw an error when trying to remove a non-existing study member', async () => {
    const studyId = await createStudyId(app, {
      accessToken,
      data: fakeData.study(),
    });

    await removeMember(app, {
      accessToken,
      studyId,
      directorId: fakeData.id(),
    }).expect(401);
  });

  it('should throw an error when trying to remove a non-existing study', async () => {
    const studyId = await createStudyId(app, {
      accessToken,
      data: fakeData.study(),
    });

    await removeMember(app, {
      accessToken,
      studyId: fakeData.id(),
      directorId: TEST_DIRECTOR.MAX.ID,
    }).expect(401);
  });

  it('should fail because director is not an admin', async () => {
    const studyId = await createStudyId(app, {
      accessToken,
      data: fakeData.study(),
    });

    const director = await createDirector(app);

    const directorId = director.id;

    await addMember(app, {
      accessToken,
      studyId,
      directorId,
      role: 'employee',
    });

    const otherAccessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );

    await removeMember(app, {
      accessToken: otherAccessToken,
      studyId,
      directorId,
    }).expect(401);
  });

  it('should throw an error when trying to remove the last admin from the study', async () => {
    const studyId = await createStudyId(app, {
      accessToken,
      data: fakeData.study(),
    });
    await removeMember(app, {
      accessToken,
      studyId,
      directorId: TEST_DIRECTOR.MAX.ID,
    }).expect(400);
  });
});
