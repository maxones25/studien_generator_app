import { TestBed } from '@automock/jest';
import { faker } from '@faker-js/faker';
import { StudiesRepository } from '@admin/modules/studies/studies.repository';
import { StudiesService } from '@admin/modules/studies/studies.service';
import fakeData from '@test/fakeData';
import { CreateStudyTransaction } from '@admin/modules/studies/transactions/create-study.transaction';

describe('StudiesService', () => {
  let service: StudiesService;
  let repo: jest.Mocked<StudiesRepository>;
  let createTransaction: jest.Mocked<CreateStudyTransaction>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(StudiesService)
      .mock(StudiesRepository)
      .using({})
      .mock(CreateStudyTransaction)
      .using({})
      .compile();

    service = unit;
    repo = unitRef.get(StudiesRepository);
    createTransaction = unitRef.get(CreateStudyTransaction);
  });

  it('should create a new study', async () => {
    const directorId = faker.string.uuid();
    const body = fakeData.study();

    const id = faker.string.uuid();

    createTransaction.run.mockResolvedValueOnce(id);

    const studyId = await service.create(directorId, body);

    expect(studyId).toEqual(id);
    expect(createTransaction.run).toHaveBeenCalledWith({
      directorId,
      data: body,
    });
  });

  it('should get studies by director', async () => {
    const directorId = faker.string.uuid();
    const studies = [
      { id: faker.string.uuid(), role: 'admin', ...fakeData.study() },
    ];

    repo.getByDirector.mockResolvedValueOnce(studies);

    const result = await service.getByDirector(directorId);

    expect(result).toEqual(studies);
    expect(repo.getByDirector).toHaveBeenCalledWith(directorId);
  });

  // it('should update a group', async () => {
  //   const groupId = faker.string.uuid();
  //   const updateDto: UpdateGroupDto = { name: 'UpdatedGroup' };

  //   repo.update.mockResolvedValue({ affected: 1 } as UpdateResult);

  //   const affected = await service.update(groupId, updateDto);

  //   expect(affected).toBe(1);
  //   expect(repo.update).toHaveBeenCalledWith(groupId, { name: updateDto.name });
  // });

  // it('should delete a group', async () => {
  //   const groupId = faker.string.uuid();

  //   repo.delete.mockResolvedValue({ affected: 1 } as DeleteResult);

  //   const affected = await service.delete(groupId);

  //   expect(affected).toBe(1);
  //   expect(repo.delete).toHaveBeenCalledWith(groupId);
  // });
});
