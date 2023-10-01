import { AppModule } from '@admin/app.module';
import { IApp, createApp } from '@test/app';
import {
  createDirector,
  deleteDirector,
  getMe,
  getDirectors,
  getAdminAccessToken,
  getDirectorAccessToken,
  loginDirector,
} from '@test/admin/director';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

describe('delete director', () => {
  let app: IApp;
  let accessToken: string;

  beforeAll(async () => {
    app = await createApp(AppModule);
    accessToken = await getAdminAccessToken(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should hard delete director', async () => {
    const data = fakeData.director();

    const director = await createDirector(app, data);

    const directorAT = await getDirectorAccessToken(
      app,
      data.email,
      data.password,
    );

    await deleteDirector(app, {
      accessToken,
      directorId: director.id,
      data: { hardDelete: true },
    }).expect(200);

    await getMe(app, directorAT).expect(401);

    return loginDirector(app, data.email, data.password).expect(401);
  });

  it('should soft delete director', async () => {
    const data = fakeData.director();

    const director = await createDirector(app, data);

    await loginDirector(app, data.email, data.password).expect(200);

    await deleteDirector(app, {
      accessToken,
      directorId: director.id,
      data: { hardDelete: false },
    }).expect(200);

    await getDirectors(app, accessToken)
      .expect(200)
      .then((res) => {
        const directors = res.body;
        expect(Array.isArray(directors)).toBeTruthy();
        expect(directors.length).toBeGreaterThan(0);

        const found = directors.find((d) => d.id === director.id);

        expect(found).not.toBeUndefined();
        expect(found.deletedAt).not.toBeNull();
      });

    return loginDirector(app, data.email, data.password).expect(401);
  });

  it('should fail because not authenticated', async () => {
    const director = await createDirector(app);

    await deleteDirector(app, {
      accessToken: undefined,
      directorId: director.id,
      data: { hardDelete: true },
    }).expect(401);
  });

  it('should fail because director id invalid', async () => {
    await deleteDirector(app, {
      accessToken,
      directorId: 'invalid-id',
      data: { hardDelete: true },
    }).expect(401);
  });

  it('should fail because director id is unknown', async () => {
    const directorId = fakeData.id();
    await deleteDirector(app, {
      accessToken,
      directorId,
      data: { hardDelete: true },
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

  it('should fail because hardDelete wrong type', async () => {
    const director = await createDirector(app);
    await deleteDirector(app, {
      accessToken,
      directorId: director.id,
      data: { hardDelete: 'test' },
    }).expect(400);
  });

  it('should fail because accessToken is director token', async () => {
    const director = await createDirector(app);
    const accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );
    await deleteDirector(app, {
      accessToken,
      directorId: director.id,
      data: { hardDelete: true },
    }).expect(401);
  });
});
