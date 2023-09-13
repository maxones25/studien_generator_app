import { AppModule } from '@admin/app.module';
import fakeData from '@test/fakeData';
import { JwtService } from '@nestjs/jwt';
import request from 'supertest';
import { SignupDirectorDto } from '@admin/directors/dtos/SignupDirectorDto';
import { createDirector } from '@test/director/signUpDirector';
import { IApp, createApp } from '@test/app/createApp';
import { getEnvironmentVariable } from '@test/app/getEnvironmentVariable';

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

  it('should login directors successfully', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: director.email,
        password: director.password,
      })
      .expect(200)
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
