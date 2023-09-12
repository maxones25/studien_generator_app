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
import { getDirectorById } from '@test/director/getMe';
import { Director } from '@entities/core/director/Director';

describe('update director', () => {
  let app: INestApplication;
  let accessToken: string;
  let directorAccessToken: string;
  let director: Director;

  beforeAll(async () => {
    app = await createApp(AppModule);

    accessToken = await getAdminAccessToken(app);

    director = await createDirector(app);

    directorAccessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );
  });

  afterAll(async () => {
    await app.close();
  });

  it('should update email, firstName and lastName director', async () => {
    const { email, firstName, lastName } = fakeData.director();

    await updateDirector(app, {
      accessToken,
      directorId: director.id,
      data: { email, firstName, lastName },
    }).expect(200);

    const updatedDirector = await getDirectorById(app, directorAccessToken);

    expect(updatedDirector.id).toBe(director.id);
    expect(updatedDirector.email).toBe(email);
    expect(updatedDirector.firstName).toBe(firstName);
    expect(updatedDirector.lastName).toBe(lastName);
  });

  it('should fail because unauthorized', async () => {
    const { email, firstName, lastName } = fakeData.director();

    await updateDirector(app, {
      accessToken: undefined,
      directorId: director.id,
      data: { email, firstName, lastName },
    }).expect(401);
  });

  it('should fail because directorId invalid', async () => {
    const { email, firstName, lastName } = fakeData.director();

    await updateDirector(app, {
      accessToken,
      directorId: 'invalid-id',
      data: { email, firstName, lastName },
    }).expect(401);
  });

  it('should fail because directorId unknown', async () => {
    const { email, firstName, lastName } = fakeData.director();

    await updateDirector(app, {
      accessToken,
      directorId: fakeData.id(),
      data: { email, firstName, lastName },
    }).expect(401);
  });

  it('should fail because accessToken is director token', async () => {
    const { email, firstName, lastName } = fakeData.director();

    await updateDirector(app, {
      accessToken: directorAccessToken,
      directorId: director.id,
      data: { email, firstName, lastName },
    }).expect(401);
  });

  it('should fail because email is missing', async () => {
    const { firstName, lastName } = fakeData.director();

    await updateDirector(app, {
      accessToken,
      directorId: director.id,
      data: { firstName, lastName },
    }).expect(400);
  });

  it('should fail because firstName is missing', async () => {
    const { email, lastName } = fakeData.director();

    await updateDirector(app, {
      accessToken,
      directorId: director.id,
      data: { email, lastName },
    }).expect(400);
  });

  it('should fail because lastName is missing', async () => {
    const { email, firstName } = fakeData.director();

    await updateDirector(app, {
      accessToken,
      directorId: director.id,
      data: { email, firstName },
    }).expect(400);
  });

  it('should fail because email is empty', async () => {
    const { firstName, lastName } = fakeData.director();

    await updateDirector(app, {
      accessToken,
      directorId: director.id,
      data: { email: '', firstName, lastName },
    }).expect(400);
  });

  it('should fail because firstName is empty', async () => {
    const { email, lastName } = fakeData.director();

    await updateDirector(app, {
      accessToken,
      directorId: director.id,
      data: { email, firstName: '', lastName },
    }).expect(400);
  });

  it('should fail because lastName is empty', async () => {
    const { email, firstName } = fakeData.director();

    await updateDirector(app, {
      accessToken,
      directorId: director.id,
      data: { email, firstName, lastName: '' },
    }).expect(400);
  });

  it('should fail because email has wrong type', async () => {
    const { email, firstName, lastName } = fakeData.director();

    await updateDirector(app, {
      accessToken,
      directorId: director.id,
      data: { email: 123, firstName, lastName },
    }).expect(400);
  });

  it('should fail because firstName has wrong type', async () => {
    const { email, lastName } = fakeData.director();

    await updateDirector(app, {
      accessToken,
      directorId: director.id,
      data: { email, firstName: true, lastName },
    }).expect(400);
  });

  it('should fail because lastName has wrong type', async () => {
    const { email, firstName } = fakeData.director();

    await updateDirector(app, {
      accessToken,
      directorId: director.id,
      data: { email, firstName, lastName: {} },
    }).expect(400);
  });

  it('should not update password', async () => {
    const { email, firstName, lastName } = fakeData.director();

    const password = 'new-password-1234';

    await updateDirector(app, {
      accessToken,
      directorId: director.id,
      data: { email, firstName, lastName, password },
    }).expect(200);

    loginDirector(app, email, password).expect(401);
  });

  it('should not update id', async () => {
    const { email, firstName, lastName } = fakeData.director();

    const id = fakeData.id();

    await updateDirector(app, {
      accessToken,
      directorId: director.id,
      data: { email, firstName, lastName, id },
    }).expect(200);

    const updatedDirector = await getDirectorById(app, directorAccessToken);

    expect(updatedDirector.id).toBe(director.id);
    expect(updatedDirector.email).toBe(email);
  });
});
