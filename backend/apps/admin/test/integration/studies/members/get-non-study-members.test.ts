import { TEST_DIRECTOR } from '@test/testData';
import { AppModule } from '@admin/app.module';
import fakeData from '@test/fakeData';
import { createStudyId } from '@test/studies/createStudy';
import { addMember } from '@test/studies/members/addMember';
import { getDirectorAccessToken } from '@test/admin/auth/loginDirector';
import { createDirector } from '@test/director/signUpDirector';
import { IApp, createApp } from '@test/app/createApp';
import { Roles } from '@entities/core/study';
import { getNonMembers } from '@test/studies/members/getNonMembers';
import { deleteDirector } from '@test/director/deleteDirector';
import { getAdminAccessToken } from '@test/admin/auth/loginAdmin';

describe('Get Non Study Members', () => {
  let app: IApp;
  let accessToken: string;
  let studyId: string;
  let members: any[];
  let nonMembers: any[];

  beforeAll(async () => {
    app = await createApp(AppModule);

    members = [];
    nonMembers = [];

    members.push({
      directorId: TEST_DIRECTOR.MAX.ID,
      role: Roles.Admin,
    });

    accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );

    studyId = await createStudyId(app, { accessToken, data: fakeData.study() });

    for (let i = 0; i < 2; i++) {
      const director = await createDirector(app);

      const directorId = director.id;

      const role = Roles.Employee;

      await addMember(app, {
        accessToken,
        studyId,
        directorId,
        role,
      });

      members.push({ directorId, role });
    }

    for (let i = 0; i < 2; i++) {
      const director = await createDirector(app);
      nonMembers.push(director);
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get directors which are no study members', () => {
    return getNonMembers(app, { accessToken, studyId })
      .expect(200)
      .then((res) => {
        const directors = res.body;

        expect(Array.isArray(directors)).toBeTruthy();
        expect(directors.length).toBeGreaterThan(0);

        nonMembers.forEach((nonMember) => {
          const director = directors.find(
            (director) => director.id === nonMember.id,
          );

          expect(director).not.toBeUndefined();
          expect(director.email).toBe(nonMember.email);
          expect(director.firstName).toBe(nonMember.firstName);
          expect(director.lastName).toBe(nonMember.lastName);
        });
      });
  });

  it('should not get deleted directors', async () => {
    const director = await createDirector(app);

    const adminAccessToken = await getAdminAccessToken(app);

    await deleteDirector(app, {
      accessToken: adminAccessToken,
      directorId: director.id,
      data: { hardDelete: false },
    }).expect(200);

    return getNonMembers(app, { accessToken, studyId })
      .expect(200)
      .then((res) => {
        const directors = res.body;

        expect(Array.isArray(directors)).toBeTruthy();
        expect(directors.length).toBeGreaterThan(0);

        const nonMember = directors.find((d) => d.id === director.id);
        expect(nonMember).toBeUndefined();
      });
  });

  it('should fail because unauthorized', async () => {
    return getNonMembers(app, { accessToken: undefined, studyId }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const adminAccessToken = await getAdminAccessToken(app);

    return getNonMembers(app, {
      accessToken: adminAccessToken,
      studyId,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    const otherAccessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );

    return getNonMembers(app, {
      accessToken: otherAccessToken,
      studyId,
    }).expect(401);
  });

  it('should fail because study is missing', async () => {
    return getNonMembers(app, {
      accessToken,
      studyId: undefined,
    }).expect(400);
  });

  it('should fail because study is invalid', async () => {
    return getNonMembers(app, {
      accessToken,
      studyId: fakeData.text(),
    }).expect(401);
  });

  it('should fail because study is unknown', async () => {
    return getNonMembers(app, {
      accessToken,
      studyId: fakeData.id(),
    }).expect(401);
  });
});
