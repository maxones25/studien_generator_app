import { Injectable, Inject } from '@nestjs/common';
import { CreateStudyDto } from './dtos/createStudyDto';
import { UpdateStudyDto } from './dtos/updateStudyDto';
import { CreateStudyTransaction } from './transactions/create-study.transaction';
import { StudiesRepository } from './studies.repository';

@Injectable()
export class StudiesService {
  constructor(
    @Inject(StudiesRepository)
    private studiesRepository: StudiesRepository,
    @Inject(CreateStudyTransaction)
    private createStudyTransaction: CreateStudyTransaction,
  ) {}

  async create(directorId: string, data: CreateStudyDto) {
    return this.createStudyTransaction.run({
      directorId,
      data,
    });
  }

  async update(id: string, { name }: UpdateStudyDto) {
    const { affected } = await this.studiesRepository.update(id, { name });
    return affected;
  }

  async getByDirector(directorId: string) {
    return await this.studiesRepository.getByDirector(directorId);
  }

  async getOneByDirector(studyId: string, directorId: string) {
    return this.studiesRepository.getOneByDirector(studyId, directorId);
  }

  async delete(studyId: string) {
    const { affected } = await this.studiesRepository.delete(studyId);
    return affected;
  }
}
