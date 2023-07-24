import { GroupsController } from '@modules/groups/groups.controller';
import { GroupsService } from '@modules/groups/groups.service';
import { faker } from '@faker-js/faker';
import { GroupGuard } from '@modules/groups/guards/group.guard';
import { GroupsRepository } from '@modules/groups/groups.repository';
import { TestBed } from '@automock/jest';
import { Group } from '@entities/group.entity';

describe('GroupsController', () => {
  let controller: GroupsController;
  let service: jest.Mocked<GroupsService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(GroupsController)
      .mock(GroupsService)
      .using({})
      .mock(GroupsRepository)
      .using({})
      .mock(GroupGuard)
      .using({})
      .compile();

    controller = unit;
    service = unitRef.get(GroupsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new group', async () => {
    const studyId = faker.string.uuid();

    const createGroupDto = {
      name: faker.string.alphanumeric({ length: { min: 5, max: 15 } }),
    };

    const id = faker.string.uuid();

    service.create.mockResolvedValueOnce(id);

    const result = await controller.create(studyId, createGroupDto);

    expect(service.create).toBeCalledWith(studyId, createGroupDto);

    expect(result).toEqual(id);
  });

  it('should get all groups by studyId', async () => {
    const studyId = faker.string.uuid();
    const groups = [
      {
        id: faker.string.uuid(),
        name: faker.string.alphanumeric({ length: { min: 5, max: 15 } }),
      },
      {
        id: faker.string.uuid(),
        name: faker.string.alphanumeric({ length: { min: 5, max: 15 } }),
      },
    ];

    service.getByStudy.mockResolvedValueOnce(groups as Group[]);

    const result = await controller.getAll(studyId);

    expect(service.getByStudy).toBeCalledWith(studyId);
    expect(result).toEqual(groups);
  });

  it('should update a group', async () => {
    const groupId = faker.string.uuid();

    const updateGroupDto = {
      name: faker.string.alphanumeric({ length: { min: 5, max: 15 } }),
    };

    service.update.mockResolvedValueOnce(1);

    const result = await controller.update(groupId, updateGroupDto);

    expect(service.update).toBeCalledWith(groupId, updateGroupDto);
    expect(result).toEqual(1);
  });

  it('should delete a group', async () => {
    const groupId = faker.string.uuid();

    service.delete.mockResolvedValueOnce(1);

    const result = await controller.delete(groupId);

    expect(service.delete).toBeCalledWith(groupId);
    expect(result).toEqual(1);
  });
});
