import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { TestBed } from '@automock/jest';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { StudiesRepository } from '@admin/studies/studies.repository';

describe('StudyGuard', () => {
  let guard: StudyGuard;
  let repo: jest.Mocked<StudiesRepository>;

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(StudyGuard)
      .mock(StudiesRepository)
      .using({ findOne: jest.fn() })
      .compile();

    guard = unit;
    repo = unitRef.get<StudiesRepository>(StudiesRepository);
  });

  it('should return true when no studyId is provided', async () => {
    const studyId = faker.string.uuid();

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ params: {} }), // no groupId provided
      }),
    };

    const result = await guard.canActivate(context as ExecutionContext);
    expect(result).toBeTruthy();
  });

  it('should throw UnauthorizedException when study is not found', async () => {
    const studyId = faker.string.uuid();

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ params: { studyId } }),
      }),
    };

    // Mock the GroupsRepository findOne method to return undefined
    repo.findOne.mockResolvedValueOnce(undefined);

    await expect(
      guard.canActivate(context as ExecutionContext),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should return true when study is found', async () => {
    const studyId = faker.string.uuid();

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ params: { studyId } }),
      }),
    };

    // Mock the GroupsRepository findOne method to return a group
    repo.findOne.mockResolvedValueOnce({
      id: studyId,
    } as any);

    const result = await guard.canActivate(context as ExecutionContext);
    expect(result).toBeTruthy();
  });
});
