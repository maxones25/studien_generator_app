import { AuthController } from '@admin/auth/auth.controller';
import { AuthService } from '@admin/auth/auth.service';
import { TestBed } from '@automock/jest';
import { UnauthorizedException } from '@nestjs/common';
import fakeData from '@test/fakeData';
import { sign as signJwt, verify as verifyJwt } from 'jsonwebtoken';

describe('AuthController', () => {
  let controller: AuthController;
  let service: jest.Mocked<AuthService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(AuthController)
      .mock(AuthService)
      .using({})
      .compile();

    controller = unit;
    service = unitRef.get(AuthService);
  });

  it('should login director successfully', async () => {
    const director = fakeData.director();

    const body = {
      email: director.email,
      password: director.password,
    };

    const directorId = fakeData.id();

    const accessToken = await signJwt(
      {
        directorId,
      },
      'secret',
    );

    service.checkCredentials.mockResolvedValueOnce({ accessToken });

    const result = await controller.loginDirector(body);

    expect(result).toStrictEqual({ accessToken });

    const payload: any = await verifyJwt(result.accessToken, 'secret');

    expect(payload.directorId).toBe(directorId);
  });

  it('should fail because credentials invalid', async () => {
    const director = fakeData.director();

    const body = {
      email: director.email,
      password: director.password,
    };

    service.checkCredentials.mockImplementationOnce(() => {
      throw new UnauthorizedException();
    });

    await expect(controller.loginDirector(body)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should sign up director successfully', async () => {
    const body: any = fakeData.director();

    body.activationPassword = '1234';

    const id = fakeData.id();

    service.create.mockResolvedValueOnce(id);

    expect(await controller.addDirector(body)).toBe(id);
  });

  it('should fail because director data invalid', async () => {
    const body: any = fakeData.director();

    body.activationPassword = '1234';

    service.create.mockImplementationOnce(() => {
      throw new UnauthorizedException();
    });

    await expect(controller.addDirector(body)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
