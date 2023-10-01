import { AppModule } from '@admin/app.module';
import { Roles } from '@entities/core/study';
import { getDirectorAccessToken, createDirector } from '@test/admin/director';
import {
  createStudyId,
  addMember,
  changeMemberRole,
  getStudyById,
} from '@test/admin/studies';
import { IApp, createApp } from '@test/app';
import { TEST_DIRECTOR } from '@test/testData';

describe('Change Member Role', () => {
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

  it('should update study members to admin successfully', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const director = await createDirector(app);

    await addMember(app, {
      accessToken,
      studyId,
      directorId: director.id,
      role: 'employee',
    });

    await changeMemberRole(app, {
      accessToken,
      studyId,
      directorId: director.id,
      role: 'admin',
    }).expect(200);

    const otherAccessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );

    await getStudyById(app, { accessToken: otherAccessToken, studyId })
      .expect(200)
      .then((res) => {
        expect(res.body.role).toBe(Roles.Admin);
      });
  });

  it('should successfully change admin', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const director = await createDirector(app);

    await addMember(app, {
      accessToken,
      studyId,
      directorId: director.id,
      role: 'employee',
    });

    await changeMemberRole(app, {
      accessToken,
      studyId,
      directorId: director.id,
      role: 'admin',
    }).expect(200);

    const otherAccessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );

    await changeMemberRole(app, {
      accessToken: otherAccessToken,
      studyId,
      directorId: TEST_DIRECTOR.MAX.ID,
      role: 'employee',
    }).expect(200);

    await getStudyById(app, { accessToken, studyId })
      .expect(200)
      .then((res) => {
        expect(res.body.role).toBe(Roles.Employee);
      });
  });

  it('should fail because one admin per study is required', async () => {
    const studyId = await createStudyId(app, { accessToken });

    await changeMemberRole(app, {
      accessToken,
      studyId,
      directorId: TEST_DIRECTOR.MAX.ID,
      role: 'employee',
    }).expect(400);
  });

  it('should fail director is not an admin', async () => {
    const studyId = await createStudyId(app, { accessToken });

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

    await changeMemberRole(app, {
      accessToken: otherAccessToken,
      studyId,
      directorId: director.id,
      role: 'admin',
    }).expect(401);
  });
});
