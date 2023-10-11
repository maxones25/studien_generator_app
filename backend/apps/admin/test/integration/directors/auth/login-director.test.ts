import { AppModule } from '@admin/app.module';
import fakeData from '@test/fakeData';
import { JwtService } from '@nestjs/jwt';
import request from 'supertest';
import { SignupDirectorDto } from '@admin/directors/infrastructure/http';
import { createDirector, loginDirector } from '@test/admin/director';
import { IApp, createApp, getEnvironmentVariable } from '@test/app';

describe('login director', () => {
  let app: IApp;
  let directorId: string;
  let director: SignupDirectorDto;

  beforeAll(async () => {
    app = await createApp(AppModule);

    const data = fakeData.director();

    director = {
      ...data,
      activationPassword: getEnvironmentVariable(app, 'ACTIVATION_PASSWORD'),
    };

    const createdDirector = await createDirector(app, data);

    directorId = createdDirector.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should login directors successfully', async () => {
    const email = director.email;
    const password = director.password;
    return loginDirector(app, email, password)
      .expect(200)
      .then((res) => {
        expect(typeof res.body.accessToken).toEqual('string');
        const jwtService = app.get(JwtService);
        const payload = jwtService.verify(res.body.accessToken);
        expect(payload.directorId).toBe(directorId);
      });
  });

  it('should fail because email is empty', async () => {
    const email = '';
    const password = director.password;
    return loginDirector(app, email, password).expect(400);
  });

  it('should fail because email is not a string', async () => {
    const email = 123;
    const password = director.password;
    return loginDirector(app, email, password).expect(400);
  });

  it('should fail because password is empty', async () => {
    const email = director.email;
    const password = '';
    return loginDirector(app, email, password).expect(400);
  });

  it('should fail because password is not a string', async () => {
    const email = director.email;
    const password = true;
    return loginDirector(app, email, password).expect(400);
  });

  it('should fail because email is missing', async () => {
    const email = undefined;
    const password = director.password;
    return loginDirector(app, email, password).expect(400);
  });

  it('should fail because password is missing', async () => {
    const email = director.email;
    const password = undefined;
    return loginDirector(app, email, password).expect(400);
  });

  it('should fail because email does not exist', async () => {
    const email = fakeData.director().email;
    const password = director.password;
    return loginDirector(app, email, password).expect(401);
  });

  it('should fail because password is wrong', async () => {
    const email = director.email;
    const password = fakeData.director().password;
    return loginDirector(app, email, password).expect(401);
  });
});
