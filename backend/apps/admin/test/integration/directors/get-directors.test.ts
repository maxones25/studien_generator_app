import { AppModule } from '@admin/app.module';
import { IApp, createApp } from '@test/app';
import { Director } from '@entities/core/director';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { createDirector, getAdminAccessToken, getDirectorAccessToken, getDirectors } from '@test/admin/director';

describe('get directors', () => {
  let app: IApp;
  let accessToken: string;
  let createdDirectors: Director[];

  beforeAll(async () => {
    app = await createApp(AppModule);

    createdDirectors = [];

    createdDirectors.push(await createDirector(app));
    createdDirectors.push(await createDirector(app));
    createdDirectors.push(await createDirector(app));
    createdDirectors.push(await createDirector(app));
    createdDirectors.push(await createDirector(app));

    accessToken = await getAdminAccessToken(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get directors', async () => {
    return getDirectors(app, accessToken)
      .expect(200)
      .then((res) => {
        const directors = res.body;

        expect(Array.isArray(directors)).toBeTruthy();
        expect(directors.length).toBeGreaterThan(0);

        directors.forEach((director) => {
          expect(validateUUID(director.id)).toBeTruthy();
          expect(typeof director.email).toBe('string');
          expect(typeof director.firstName).toBe('string');
          expect(typeof director.lastName).toBe('string');
          expect(director.password).toBeUndefined();
        });

        createdDirectors.forEach((director) => {
          expect(directors.some((d) => d.id === director.id)).toBeTruthy();
        });
      });
  });

  it('should fail because unauthorized', async () => {
    return getDirectors(app, undefined).expect(401);
  });

  it('should fail because director authorized', async () => {
    const director = await createDirector(app);
    const accessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );
    return getDirectors(app, accessToken).expect(401);
  });
});
