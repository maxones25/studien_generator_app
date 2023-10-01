import { AppModule } from '@admin/app.module';
import { IApp, createApp } from '@test/app';
import {
  createDirector,
  getDirectorAccessToken,
  loginDirector,
  deleteDirector,
  getAdminAccessToken,
  restoreDirector,
} from '@test/admin/director';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

describe('restore director', () => {
  let app: IApp;
  let accessToken: string;

  beforeAll(async () => {
    app = await createApp(AppModule);

    accessToken = await getAdminAccessToken(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should restore a director', async () => {
    const director = await createDirector(app);

    await deleteDirector(app, {
      accessToken,
      directorId: director.id,
      data: { hardDelete: false },
    }).expect(200);

    await loginDirector(app, director.email, director.password).expect(401);

    await restoreDirector(app, { accessToken, directorId: director.id }).expect(
      200,
    );

    await loginDirector(app, director.email, director.password).expect(200);
  });

  it('should fail because unauthorized', async () => {
    const director = await createDirector(app);

    await deleteDirector(app, {
      accessToken: undefined,
      directorId: director.id,
      data: { hardDelete: false },
    }).expect(401);
  });

  it('should fail because directorId invalid', async () => {
    await deleteDirector(app, {
      accessToken,
      directorId: 'invalid-id',
      data: { hardDelete: false },
    }).expect(401);
  });

  it('should fail because directorId unknown', async () => {
    await deleteDirector(app, {
      accessToken,
      directorId: fakeData.id(),
      data: { hardDelete: false },
    }).expect(401);
  });

  it('should fail because accessToken is director accessToken', async () => {
    const accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );

    const director = await createDirector(app);

    await deleteDirector(app, {
      accessToken,
      directorId: director.id,
      data: { hardDelete: false },
    }).expect(401);
  });

  it('should fail because hardDelete is missing', async () => {
    const director = await createDirector(app);

    await deleteDirector(app, {
      accessToken,
      directorId: director.id,
      data: {},
    }).expect(400);
  });

  it('should fail because hardDelete has wrong type', async () => {
    const director = await createDirector(app);

    await deleteDirector(app, {
      accessToken,
      directorId: director.id,
      data: { hardDelete: 'true' },
    }).expect(400);
  });
});
