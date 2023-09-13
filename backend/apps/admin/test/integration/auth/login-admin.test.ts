import { AppModule } from '@admin/app.module';
import { JwtService } from '@nestjs/jwt';
import { IApp, createApp } from '@test/app/createApp';
import { loginAdmin } from '@test/auth/loginAdmin';

describe('Login Admin', () => {
  let app: IApp;

  beforeAll(async () => {
    app = await createApp(AppModule);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should login admin', () => {
    return loginAdmin(app, { withPassword: true })
      .expect(200)
      .then((res) => {
        const accessToken = res.text;
        expect(typeof accessToken).toBeTruthy();
        const jwtService = app.get(JwtService);
        const payload = jwtService.verify(accessToken);
        expect(payload.topic).toBe('Admin');
        expect(payload.directorId).toBeUndefined();
      });
  });

  it('should fail because activation password is wrong', () => {
    return loginAdmin(app, { activationPassword: '098765432-wrong' }).expect(
      401,
    );
  });

  it('should fail because activation password is missing', () => {
    return loginAdmin(app, {}).expect(400);
  });

  it('should fail because activation password is empty', () => {
    return loginAdmin(app, { activationPassword: '' }).expect(400);
  });
});
