import { TestBed } from '@automock/jest';
import { Group } from '@entities';
import { DeleteResult, UpdateResult } from 'typeorm';
import { faker } from '@faker-js/faker';
import { GroupsService } from '@admin/groups/application/groups.service';
import { GroupsRepository } from '@admin/groups/repositories/groups.repository';
import { CreateGroupDto } from '@admin/groups/dtos/CreateGroupDto';
import { UpdateGroupDto } from '@admin/groups/dtos/UpdateGroupDto';

describe('GroupsService', () => {
  let service: GroupsService;
  let repo: jest.Mocked<GroupsRepository>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(GroupsService)
      .mock(GroupsRepository)
      .using({})
      .compile();

    service = unit;
    repo = unitRef.get(GroupsRepository);
  });

  it('should create a new group', async () => {
    const studyId = faker.string.uuid();
    const createDto: CreateGroupDto = { name: 'Group1' };

    const id = faker.string.uuid();

    repo.insert.mockImplementationOnce((data: Group) => {
      data.id = id;
      return undefined;
    });

    const groupId = await service.create(studyId, createDto);

    expect(groupId).toEqual(id);
    expect(repo.insert).toHaveBeenCalledWith(
      expect.objectContaining({ name: createDto.name, studyId }),
    );
  });

  it('should get groups by study', async () => {
    const studyId = faker.string.uuid();
    const groups = [{ id: 'group1', name: 'Group1', studyId }];

    repo.getByStudy.mockResolvedValue(groups as Group[]);

    const result = await service.getByStudy(studyId);

    expect(result).toEqual(groups);
    expect(repo.getByStudy).toHaveBeenCalledWith(studyId);
  });

  it('should update a group', async () => {
    const groupId = faker.string.uuid();
    const updateDto: UpdateGroupDto = { name: 'UpdatedGroup' };

    repo.update.mockResolvedValue({ affected: 1 } as UpdateResult);

    const affected = await service.changeName(groupId, updateDto);

    expect(affected).toBe(1);
    expect(repo.update).toHaveBeenCalledWith(groupId, { name: updateDto.name });
  });

  it('should delete a group', async () => {
    const groupId = faker.string.uuid();

    repo.delete.mockResolvedValue({ affected: 1 } as DeleteResult);

    const affected = await service.delete(groupId);

    expect(affected).toBe(1);
    expect(repo.delete).toHaveBeenCalledWith(groupId);
  });
});
