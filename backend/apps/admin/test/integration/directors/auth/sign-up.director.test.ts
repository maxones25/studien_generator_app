import request from 'supertest';
import fakeData from '@test/fakeData';
import { AppModule } from '@admin/app.module';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { IApp, createApp, getEnvironmentVariable } from '@test/app';

describe('signUp director', () => {
  let app: IApp;
  let activationPassword: string;

  beforeAll(async () => {
    app = await createApp(AppModule);
    activationPassword = await getEnvironmentVariable(
      app,
      'ACTIVATION_PASSWORD',
    );
  });

  it('should create a new director successfully', async () => {
    return request(app.getHttpServer())
      .post('/auth/signUp')
      .send({
        ...fakeData.director(),
        activationPassword,
      })
      .expect(200)
      .then((res) => {
        expect(validateUUID(res.text)).toBeTruthy();
      });
  });

  it('should fail because email already exists', async () => {
    const director = fakeData.director();

    await request(app.getHttpServer())
      .post('/auth/signUp')
      .send({
        ...director,
        activationPassword,
      })
      .expect(200);

    return request(app.getHttpServer())
      .post('/auth/signUp')
      .send({
        ...director,
        activationPassword,
      })
      .expect(400);
  });

  it('should fail because email is not valid', async () => {
    return request(app.getHttpServer())
      .post('/auth/signUp')
      .send({
        ...fakeData.director(),
        activationPassword,
        email: 'invalidemail',
      })
      .expect(400);
  });

  it('should fail because firstName is missing', async () => {
    return request(app.getHttpServer())
      .post('/auth/signUp')
      .send({
        ...fakeData.director(),
        activationPassword,
        firstName: undefined,
      })
      .expect(400);
  });

  it('should fail because lastName is missing', async () => {
    return request(app.getHttpServer())
      .post('/auth/signUp')
      .send({
        ...fakeData.director(),
        activationPassword,
        lastName: undefined,
      })
      .expect(400);
  });

  it('should fail because password is missing', async () => {
    return request(app.getHttpServer())
      .post('/auth/signUp')
      .send({
        ...fakeData.director(),
        activationPassword,
        password: undefined,
      })
      .expect(400);
  });

  it('should fail because activationPassword is missing', async () => {
    return request(app.getHttpServer())
      .post('/auth/signUp')
      .send({
        ...fakeData.director(),
        activationPassword: undefined,
      })
      .expect(400);
  });

  it('should fail because activationPassword is incorrect', async () => {
    return request(app.getHttpServer())
      .post('/auth/signUp')
      .send({
        ...fakeData.director(),
        activationPassword: 'wrong-password',
      })
      .expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
