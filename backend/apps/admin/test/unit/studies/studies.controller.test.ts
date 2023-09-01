import { faker } from '@faker-js/faker';
import { TestBed } from '@automock/jest';
import { Group } from '@entities';
import { GroupsService } from '@admin/groups/groups.service';
import { StudiesController } from '@admin/studies/studies/controllers/studies.commands';
import { StudiesService } from '@admin/studies/studies/studies.service';
import { StudiesRepository } from '@admin/studies/studies.repository';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import fakeData from '@test/fakeData';
import { Study } from '@entities';

describe('StudiesController', () => {
  let controller: StudiesController;
  let service: jest.Mocked<StudiesService>;

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(StudiesController)
      .mock(StudiesService)
      .using({})
      .mock(StudiesRepository)
      .using({})
      .mock(StudyGuard)
      .using({})
      .compile();

    controller = unit;
    service = unitRef.get(StudiesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new study', async () => {
    const directorId = faker.string.uuid();

    const body = {
      name: faker.string.alphanumeric({ length: { min: 5, max: 15 } }),
    };

    const id = faker.string.uuid();

    service.create.mockResolvedValueOnce(id);

    const result = await controller.create(directorId, body);

    expect(service.create).toBeCalledWith(directorId, body);

    expect(result).toEqual(id);
  });

  it('should get all studies by director', async () => {
    const directorId = faker.string.uuid();
    const studies = [
      {
        ...fakeData.study(),
        id: faker.string.uuid(),
        role: 'admin',
      },
      {
        ...fakeData.study(),
        id: faker.string.uuid(),
        role: 'admin',
      },
    ];

    service.getByDirector.mockResolvedValueOnce(studies);

    const result = await controller.getAll(directorId);

    expect(service.getByDirector).toBeCalledWith(directorId);
    expect(result).toEqual(studies);
  });

  it('should update a study', async () => {
    const studyId = faker.string.uuid();

    const body = fakeData.study();

    service.changeName.mockResolvedValueOnce(1);

    const result = await controller.update(studyId, body);

    expect(service.changeName).toBeCalledWith(studyId, body);
    expect(result).toEqual(1);
  });

  it('should delete a study', async () => {
    const studyId = faker.string.uuid();

    service.delete.mockResolvedValueOnce(1);

    const result = await controller.delete(studyId);

    expect(service.delete).toBeCalledWith(studyId);
    expect(result).toEqual(1);
  });
});
