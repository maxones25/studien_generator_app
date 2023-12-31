import { AppModule } from '@admin/app.module';
import { Role, Roles } from '@entities/core/study';
import { faker } from '@faker-js/faker';
import { getDirectorAccessToken, createDirector } from '@test/admin/director';
import { createStudyId, getStudyById, addMember } from '@test/admin/studies';
import { IApp, createApp } from '@test/app';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

describe('Add Study Member', () => {
  let app: IApp;
  let accessToken: string;
  let studyId: string;
  let directorId: string;
  let directorId2: string;
  let otherAccessToken: string;

  beforeAll(async () => {
    app = await createApp(AppModule);

    accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );

    studyId = await createStudyId(app, { accessToken, data: fakeData.study() });

    const director = await createDirector(app);

    directorId = director.id;

    const director2 = await createDirector(app);

    directorId2 = director2.id;

    otherAccessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );
  });

  afterAll(async () => {
    await app.close();
  });

  it('should add a new member to the study', async () => {
    await getStudyById(app, { accessToken: otherAccessToken, studyId }).expect(
      401,
    );

    const role: Role = 'admin';

    await addMember(app, { accessToken, studyId, role, directorId }).expect(
      201,
    );

    await getStudyById(app, { accessToken: otherAccessToken, studyId })
      .expect(200)
      .then((res) => {
        expect(res.body.role).toBe(role);
      });
  });

  it('should fail because director is already a member', () => {
    return addMember(app, {
      accessToken,
      studyId,
      directorId: TEST_DIRECTOR.MAX.ID,
      role: 'employee',
    }).expect(422);
  });

  it('should fail because director does not exist', () => {
    return addMember(app, {
      accessToken,
      studyId,
      directorId: fakeData.id(),
      role: 'employee',
    }).expect(401);
  });

  it('should fail because director is not an admin', async () => {
    const studyId = await createStudyId(app, {
      accessToken,
      data: fakeData.study(),
    });

    await addMember(app, {
      accessToken,
      studyId,
      directorId,
      role: 'employee',
    });

    return addMember(app, {
      accessToken: otherAccessToken,
      studyId,
      directorId: directorId2,
      role: Roles.Employee,
    }).expect(401);
  });

  it('should fail because directorId invalid', () => {
    return addMember(app, {
      accessToken,
      studyId,
      directorId: faker.string.alphanumeric(10),
      role: Roles.Employee,
    }).expect(401);
  });

  it('should fail because role invalid', () => {
    return addMember(app, {
      accessToken,
      studyId,
      directorId: fakeData.id(),
      role: faker.string.alphanumeric(6),
    }).expect(401);
  });
});
