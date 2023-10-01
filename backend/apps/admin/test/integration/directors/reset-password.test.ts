import { AppModule } from '@admin/app.module';
import { IApp, createApp } from '@test/app/createApp';
import { createDirector } from '@test/director/signUpDirector';
import {
  getDirectorAccessToken,
  loginDirector,
} from '@test/admin/auth/loginDirector';
import { getAdminAccessToken } from '@test/admin/auth/loginAdmin';
import fakeData from '@test/fakeData';
import { resetPassword } from '@test/director/resetPassword';
import { TEST_DIRECTOR } from '@test/testData';
import { getDirectorById } from '@test/director/getMe';

describe('reset director password', () => {
  let app: IApp;
  let accessToken: string;

  beforeAll(async () => {
    app = await createApp(AppModule);

    accessToken = await getAdminAccessToken(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should reset password', async () => {
    const director = await createDirector(app);

    const password = fakeData.password();

    await resetPassword(app, {
      accessToken,
      directorId: director.id,
      data: { password },
    }).expect(200);

    loginDirector(app, director.email, director.password).expect(401);
    loginDirector(app, director.email, password).expect(200);
  });

  it('should fail because unauthorized', async () => {
    const director = await createDirector(app);
    const password = fakeData.password();

    await resetPassword(app, {
      accessToken: undefined,
      directorId: director.id,
      data: { password },
    }).expect(401);
  });

  it('should fail because directorId is invalid', async () => {
    await createDirector(app);
    const password = fakeData.password();

    await resetPassword(app, {
      accessToken,
      directorId: 'invalid-id',
      data: { password },
    }).expect(401);
  });

  it('should fail because directorId is unknown', async () => {
    await createDirector(app);
    const password = fakeData.password();

    await resetPassword(app, {
      accessToken,
      directorId: fakeData.id(),
      data: { password },
    }).expect(401);
  });

  it('should fail because password is missing', async () => {
    const director = await createDirector(app);

    await resetPassword(app, {
      accessToken,
      directorId: director.id,
      data: {},
    }).expect(400);
  });

  it('should fail because password is empty', async () => {
    const director = await createDirector(app);

    await resetPassword(app, {
      accessToken,
      directorId: director.id,
      data: { password: '' },
    }).expect(400);
  });

  it('should fail because password is too short', async () => {
    const director = await createDirector(app);
    const password = fakeData.password(7);

    await resetPassword(app, {
      accessToken,
      directorId: director.id,
      data: { password },
    }).expect(400);
  });

  it('should fail because director is authenticated', async () => {
    const accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );

    const director = await createDirector(app);
    const password = fakeData.password();

    await resetPassword(app, {
      accessToken,
      directorId: director.id,
      data: { password },
    }).expect(401);
  });

  it('should not update id', async () => {
    const director = await createDirector(app);
    const password = fakeData.password();

    await resetPassword(app, {
      accessToken,
      directorId: director.id,
      data: { password, id: fakeData.id() },
    }).expect(200);

    const directorAT = await getDirectorAccessToken(
      app,
      director.email,
      password,
    );

    const updatedDirector = await getDirectorById(app, directorAT);

    expect(updatedDirector.id).toBe(director.id);
  });
});
