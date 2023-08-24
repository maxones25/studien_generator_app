import { UnauthorizedException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { TestBed } from '@automock/jest';
import { AuthGuard } from '@admin/directors/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let service: jest.Mocked<JwtService>;

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(AuthGuard)
      .mock(JwtService)
      .using({})
      .compile();

    guard = unit;
    service = unitRef.get<JwtService>(JwtService);
  });

  it('should pass if route is /auth', async () => {
    const request: any = {
      route: {
        path: '/auth',
      },
    };

    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    };

    await expect(guard.canActivate(context as any)).toBeTruthy();
  });

  it('should fail because authorization header missing', async () => {
    const request: any = {
      route: {
        path: '/studies',
      },
    };

    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    };

    await expect(guard.canActivate(context as any)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should fail because authorization header is not a string', async () => {
    const request: any = {
      headers: {
        authorization: null,
      },
      route: {
        path: '/studies',
      },
    };

    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    };

    context.switchToHttp();

    await expect(guard.canActivate(context as any)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should fail because authorization header is not a bearer token', async () => {
    const request: any = {
      headers: {
        authorization: faker.string.alphanumeric(10),
      },
      route: {
        path: '/studies',
      },
    };

    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    };

    context.switchToHttp();

    await expect(guard.canActivate(context as any)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should fail because token is empty', async () => {
    const request: any = {
      headers: {
        authorization: 'Bearer ',
      },
      route: {
        path: '/studies',
      },
    };

    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    };

    context.switchToHttp();

    await expect(guard.canActivate(context as any)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should fail because token is invalid', async () => {
    const request: any = {
      route: {
        path: '/studies',
      },
      headers: {
        authorization: 'Bearer ' + faker.string.alphanumeric(20),
      },
    };

    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    };

    service.verifyAsync.mockImplementation(() => {
      throw new Error();
    });

    await expect(guard.canActivate(context as any)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should pass if accessToken is valid', async () => {
    const directorId = faker.string.uuid();

    const request: any = {
      route: {
        path: '/studies',
      },
      headers: {
        authorization: 'Bearer ' + faker.string.alphanumeric(20),
      },
    };

    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    };

    service.verifyAsync.mockResolvedValue({ directorId });

    expect(await guard.canActivate(context as any)).toBeTruthy();
    expect(request?.payload).toEqual({ directorId });
  });

  // it('should return true when no groupId is provided', async () => {
  //   const studyId = faker.string.uuid();

  //   const context = {
  //     switchToHttp: () => ({
  //       getRequest: () => ({ params: { studyId } }), // no groupId provided
  //     }),
  //   };

  //   const result = await guard.canActivate(context as ExecutionContext);
  //   expect(result).toBeTruthy();
  // });

  // it('should throw UnauthorizedException when group is not found', async () => {
  //   const studyId = faker.string.uuid();
  //   const groupId = faker.string.uuid();

  //   const context = {
  //     switchToHttp: () => ({
  //       getRequest: () => ({ params: { studyId, groupId } }),
  //     }),
  //   };

  //   // Mock the GroupsRepository findOne method to return undefined
  //   repo.findOne.mockResolvedValueOnce(undefined);

  //   await expect(
  //     guard.canActivate(context as ExecutionContext),
  //   ).rejects.toThrow(UnauthorizedException);
  // });

  // it('should return true when group is found', async () => {
  //   const studyId = faker.string.uuid();
  //   const groupId = faker.string.uuid();

  //   const context = {
  //     switchToHttp: () => ({
  //       getRequest: () => ({ params: { studyId, groupId } }),
  //     }),
  //   };

  //   // Mock the GroupsRepository findOne method to return a group
  //   repo.findOne.mockResolvedValueOnce({
  //     id: groupId,
  //     studyId,
  //   } as any);

  //   const result = await guard.canActivate(context as ExecutionContext);
  //   expect(result).toBeTruthy();
  // });
});
