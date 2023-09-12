import { AppModule } from '@admin/app.module';
import { createApp } from '@test/app/createApp';
import { INestApplication } from '@nestjs/common';
import { createDirector } from '@test/director/signUpDirector';
import {
  getDirectorAccessToken,
  loginDirector,
} from '@test/auth/loginDirector';
import { getAdminAccessToken } from '@test/auth/loginAdmin';
import fakeData from '@test/fakeData';
import { updateDirector } from '@test/director/updateDirector';
import { Director } from '@entities/core/director/Director';
import { resetPassword } from '@test/director/resetPassword';

describe('reset director password', () => {
  let app: INestApplication;
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

    await updateDirector(app, {
      accessToken: undefined,
      directorId: director.id,
      data: { password },
    }).expect(401);
  });
});
