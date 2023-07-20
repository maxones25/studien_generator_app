import { Test, TestingModule } from '@nestjs/testing';
import { GroupsService } from '../../../../src/modules/groups/groups.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Group } from '../../../../src/entities/group.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

describe('GroupsService', () => {
  let service: GroupsService;
  let mockRepository: Repository<Group>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupsService,
        {
          provide: getRepositoryToken(Group),
          useValue: {
            insert: jest.fn().mockImplementation((data: any) => {
              data.id = faker.string.uuid();
            }),
            find: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            delete: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<GroupsService>(GroupsService);
    mockRepository = module.get<Repository<Group>>(getRepositoryToken(Group));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new group', async () => {
      const studyId = faker.string.uuid();

      const createGroupDto = {
        name: faker.commerce.productName(),
      };

      const repoSpy = jest.spyOn(mockRepository, 'insert');

      const result = await service.create(studyId, createGroupDto);

      expect(repoSpy).toHaveBeenCalledTimes(1);
      const group = repoSpy.mock.lastCall[0] as Group;
      expect(group.name).toEqual(createGroupDto.name);

      expect(typeof result).toBe('string');
    });

  });
});
