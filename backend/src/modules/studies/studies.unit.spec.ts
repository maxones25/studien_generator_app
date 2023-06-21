import { Test, TestingModule } from '@nestjs/testing';
import { StudiesService } from './studies.service';
import { Repository } from 'typeorm';
import { Study } from '../../entities/study.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('StudiesService', () => {
  let service: StudiesService;
  let studiesRepository: Repository<Study>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({

      providers: [ StudiesService, {
        provide: getRepositoryToken(Study),
        useClass: Repository, 
        },
      ],
    }).compile();

    service = module.get<StudiesService>(StudiesService);
    studiesRepository = module.get<Repository<Study>>(getRepositoryToken(Study));
  });

  it('should call findOne', async () => {
    const mockStudy: Study = { id: 1, name: 'John Doe'};
    jest.spyOn(studiesRepository, 'findOne').mockImplementation(() => Promise.resolve(mockStudy));

    const result = await service.findOne(1);
    expect(result).toEqual(mockStudy);
  });

  it('should call findAll', async () => {
    const mockStudies: Study[] = [{ id: 1, name: 'John Doe'}];
    jest.spyOn(studiesRepository, 'find').mockImplementation(() => Promise.resolve(mockStudies));

    const result = await service.findAll();
    expect(result).toEqual(mockStudies);
  });

  it('should call remove', async () => {
    jest.spyOn(studiesRepository, 'delete').mockImplementation(() => Promise.resolve({raw: true, affected: 1}));

    await service.remove(1);
    expect(studiesRepository.delete).toHaveBeenCalledWith(1)
  });
});