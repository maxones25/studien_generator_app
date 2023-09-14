import { AuthService } from '@admin/auth/auth.service';
import { DirectorsRepository } from '@admin/directors/repositories/directors.repository';
import { TestBed } from '@automock/jest';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from '@shared/modules/password/password.service';
import fakeData from '@test/fakeData';
import { sign as signJwt, verify as verifyJwt } from 'jsonwebtoken';

describe('AuthService', () => {
  let service: AuthService;
  let repo: jest.Mocked<DirectorsRepository>;
  let jwtService: jest.Mocked<JwtService>;
  let passwordService: jest.Mocked<PasswordService>;
  let configService: jest.Mocked<ConfigService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(AuthService)
      .mock(DirectorsRepository)
      .using({})
      .mock(JwtService)
      .using({})
      .mock(PasswordService)
      .using({})
      .mock(ConfigService)
      .using({})
      .compile();

    service = unit;
    repo = unitRef.get(DirectorsRepository);
    jwtService = unitRef.get(JwtService);
    passwordService = unitRef.get(PasswordService);
    configService = unitRef.get(ConfigService);
  });

  it('should fail because email not found', async () => {
    const director = fakeData.director();

    const body = {
      email: director.email,
      password: director.password,
    };

    repo.getByEmail.mockResolvedValueOnce(null);

    await expect(service.checkCredentials(body)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should fail because password wrong', async () => {
    const director = fakeData.director();

    const body = {
      email: director.email,
      password: director.password,
    };

    repo.getByEmail.mockResolvedValueOnce({
      password: fakeData.director().password,
    } as any);

    await expect(service.checkCredentials(body)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should login director successfully', async () => {
    const director = fakeData.director();

    const directorId = fakeData.id();

    const body = {
      email: director.email,
      password: director.password,
    };

    repo.getByEmail.mockResolvedValueOnce({
      id: directorId,
      password: director.password,
    } as any);

    passwordService.compare.mockResolvedValueOnce(true);

    jwtService.signAsync.mockImplementation(async (data) => {
      return await signJwt(data, 'secret');
    });

    const { accessToken } = await service.checkCredentials(body);

    const payload: any = await verifyJwt(accessToken, 'secret');

    expect(payload.directorId).toBe(directorId);
  });

  it('should fail because activation password is wrong', async () => {
    const body = {
      ...fakeData.director(),
      activationPassword: '1234',
    };

    configService.get.mockReturnValueOnce('the password');

    await expect(service.create(body)).rejects.toThrow(UnauthorizedException);
  });

  it('should sign up director successfully', async () => {
    const body = {
      ...fakeData.director(),
      activationPassword: '1234',
    };

    const id = fakeData.id();

    configService.get.mockReturnValueOnce('1234');

    repo.insert.mockImplementation((data: any) => {
      data.id = id;
      return undefined as any;
    });

    await expect(service.create(body)).resolves.toBe(id);
  });
});
