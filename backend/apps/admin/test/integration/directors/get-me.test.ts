import { AppModule } from '@admin/app.module';
import { createApp } from '@test/app/createApp';
import { INestApplication } from '@nestjs/common';
import { createDirector } from '@test/director/signUpDirector';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import { getAdminAccessToken } from '@test/auth/loginAdmin';
import { getMe } from '@test/director/getMe';
import { Director } from '@entities/core/director/Director';

describe('get me', () => {
  let app: INestApplication;
  let accessToken: string;
  let director: Director;

  beforeAll(async () => {
    app = await createApp(AppModule);

    director = await createDirector(app);

    accessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get me', async () => {
    return getMe(app, accessToken)
      .expect(200)
      .then((res) => {
        const me = res.body;

        expect(me.id).toBe(director.id);
        expect(me.firstName).toBe(director.firstName);
        expect(me.lastName).toBe(director.lastName);
        expect(me.email).toBe(director.email);
        expect(me.password).toBeUndefined();
      });
  });

  it('should fail because unauthorized', async () => {
    return getMe(app, undefined).expect(401);
  });

  it('should fail because Admin is authorized', async () => {
    const accessToken = await getAdminAccessToken(app);
    return getMe(app, accessToken).expect(401);
  });
});
