import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { TestBed } from '@automock/jest';
import { GroupGuard } from '@admin/groups/infrastructure/http/guards/group.guard';
import { GroupsRepository } from '@admin/groups/repositories/groups.repository';

describe('GroupGuard', () => {
  let guard: GroupGuard;
  let repo: jest.Mocked<GroupsRepository>;

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(GroupGuard)
      .mock(GroupsRepository)
      .using({ findOne: jest.fn() })
      .compile();

    guard = unit;
    repo = unitRef.get<GroupsRepository>(GroupsRepository);
  });

  it('should throw UnauthorizedException when no studyId is provided', async () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ params: {} }), // no studyId and groupId provided
      }),
    };

    await expect(
      guard.canActivate(context as ExecutionContext),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should return true when no groupId is provided', async () => {
    const studyId = faker.string.uuid();

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ params: { studyId } }), // no groupId provided
      }),
    };

    const result = await guard.canActivate(context as ExecutionContext);
    expect(result).toBeTruthy();
  });

  it('should throw UnauthorizedException when group is not found', async () => {
    const studyId = faker.string.uuid();
    const groupId = faker.string.uuid();

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ params: { studyId, groupId } }),
      }),
    };

    // Mock the GroupsRepository findOne method to return undefined
    repo.findOne.mockResolvedValueOnce(undefined);

    await expect(
      guard.canActivate(context as ExecutionContext),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should return true when group is found', async () => {
    const studyId = faker.string.uuid();
    const groupId = faker.string.uuid();

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ params: { studyId, groupId } }),
      }),
    };

    // Mock the GroupsRepository findOne method to return a group
    repo.findOne.mockResolvedValueOnce({
      id: groupId,
      studyId,
    } as any);

    const result = await guard.canActivate(context as ExecutionContext);
    expect(result).toBeTruthy();
  });
});
