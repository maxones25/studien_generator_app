import { Test, TestingModule } from '@nestjs/testing';
import { GroupsController } from '../../../../src/modules/groups/groups.controller';
import { GroupsService } from '../../../../src/modules/groups/groups.service';
import { faker } from '@faker-js/faker';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from '../../../../src/entities/group.entity';

describe('GroupsController', () => {
  let controller: GroupsController;
  let service: GroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([
          Group
        ]),
      ],
      controllers: [GroupsController],
      providers: [GroupsService],
    }).compile();

    controller = module.get<GroupsController>(GroupsController);
    service = module.get<GroupsService>(GroupsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new group', async () => {
      const studyId = faker.string.uuid();

      const createGroupDto = {
        name: 'Test group',
      };

      const serviceSpy = jest
        .spyOn(service, 'create')
        .mockImplementation(async () => faker.string.uuid());

      const result = await controller.create(studyId, createGroupDto);

      expect(serviceSpy).toHaveBeenCalledWith(studyId, createGroupDto);
      expect(typeof result).toEqual('string');
    });
  });
});
