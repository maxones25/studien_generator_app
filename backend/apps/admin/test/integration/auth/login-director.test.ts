import {
  createApp,
  createDirector,
  getDirectorAccessToken,
  getEnv,
} from '@test/utils';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@admin/app.module';
import { SignupDirectorDto } from '@admin/auth/dtos/SignupDirectorDto';
import fakeData from '@test/fakeData';
import { JwtService } from '@nestjs/jwt';
import * as request from 'supertest';
import { faker } from '@faker-js/faker';

describe('login director', () => {
  let app: INestApplication;
  let directorId: string;
  let director: SignupDirectorDto;

  beforeAll(async () => {
    app = await createApp(AppModule);

    const activationPassword = await getEnv(app, 'ACTIVATION_PASSWORD');

    director = { ...fakeData.director(), activationPassword };

    directorId = await createDirector(app, director);
  });

  it('should login directors successfully', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: director.email,
        password: director.password,
      })
      .expect(201)
      .then((res) => {
        expect(typeof res.body.accessToken).toEqual('string');
        const jwtService = app.get(JwtService);
        const payload = jwtService.verify(res.body.accessToken);
        expect(payload.directorId).toBe(directorId);
      });
  });

  it('should fail because email is empty', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: '',
        password: director.password,
      })
      .expect(400);
  });

  it('should fail because email is not a string', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 123,
        password: director.password,
      })
      .expect(400);
  });

  it('should fail because password is empty', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: director.email,
        password: '',
      })
      .expect(400);
  });

  it('should fail because password is not a string', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: director.email,
        password: true,
      })
      .expect(400);
  });

  it('should fail because email is missing', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        password: director.password,
      })
      .expect(400);
  });

  it('should fail because password is missing', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: director.email,
      })
      .expect(400);
  });

  it('should fail because password is missing', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: director.email,
      })
      .expect(400);
  });

  it('should fail because email does not exist', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: fakeData.director().email,
        password: director.password,
      })
      .expect(401);
  });

  it('should fail because password is wrong', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: director.email,
        password: fakeData.director().password,
      })
      .expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
