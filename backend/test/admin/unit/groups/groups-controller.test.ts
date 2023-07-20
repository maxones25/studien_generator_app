import { Test, TestingModule } from '@nestjs/testing';
import { GroupsController } from '../../../../src/modules/groups/groups.controller';
import { GroupsService } from '../../../../src/modules/groups/groups.service';
import { faker } from '@faker-js/faker';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CreateGroupDto } from '../../../../src/modules/groups/dtos/CreateGroupDto';

describe('GroupsController', () => {
  let controller: GroupsController;
  let service: GroupsService;
  let validationPipe: ValidationPipe;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupsController],
      providers: [
        {
          provide: GroupsService,
          useValue: {
            create: jest.fn().mockImplementation(() => {
              return faker.string.uuid();
            }),
            getByStudy: jest.fn().mockResolvedValue([]),
            update: jest.fn().mockResolvedValue({}),
            delete: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<GroupsController>(GroupsController);
    service = module.get<GroupsService>(GroupsService);

    validationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    });
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

      const serviceSpy = jest.spyOn(service, 'create');

      const result = await controller.create(studyId, createGroupDto);

      expect(serviceSpy).toHaveBeenCalledWith(studyId, createGroupDto);
      expect(typeof result).toEqual('string');
    });
  });
});
