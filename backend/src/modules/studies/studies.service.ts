import { Injectable, Inject } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateStudyDto } from './dtos/createStudyDto';
import { UpdateStudyDto } from './dtos/updateStudyDto';
import { CreateStudyTransaction } from './transactions/create-study.transaction';
import { StudiesRepository } from './studies.repository';

@Injectable()
export class StudiesService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    @Inject(StudiesRepository)
    private studiesRepository: StudiesRepository,
  ) {}

  async create(data: CreateStudyDto, directorId: string) {
    return new CreateStudyTransaction(this.entityManager).run({
      directorId,
      data,
    });
  }

  update(id: string, { name }: UpdateStudyDto) {
    return this.studiesRepository.update(id, { name });
  }

  async getByDirector(directorId: string) {
    return await this.studiesRepository.getByDirector(directorId);
  }

  async findOne(studyId: string, directorId: string) {
    return this.studiesRepository.getOneByDirector(studyId, directorId);
  }

  async delete(studyId: string) {
    return this.studiesRepository.delete(studyId);
  }
}
