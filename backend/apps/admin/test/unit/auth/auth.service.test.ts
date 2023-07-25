import { AuthService } from '@admin/auth/auth.service';
import { DirectorsRepository } from '@admin/directors/directors.repository';
import { TestBed } from '@automock/jest';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from '@shared/modules/password/password.service';
import fakeData from '@test/fakeData';
import { sign as signJwt, verify as verifyJwt } from 'jsonwebtoken';

describe('AuthService', () => {
  let service: AuthService;
  let repo: jest.Mocked<DirectorsRepository>;
  let jwtService: jest.Mocked<JwtService>;
  let passwordService: jest.Mocked<PasswordService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(AuthService)
      .mock(DirectorsRepository)
      .using({})
      .mock(JwtService)
      .using({})
      .mock(PasswordService)
      .using({})
      .compile();

    service = unit;
    repo = unitRef.get(DirectorsRepository);
    jwtService = unitRef.get(JwtService);
    passwordService = unitRef.get(PasswordService);
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
});
