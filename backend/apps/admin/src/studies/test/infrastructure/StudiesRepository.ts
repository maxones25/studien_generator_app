import { TypeOrmRepository } from '@admin/studies/shared/TypeOrmRepo';
import { BaseStudy, Study } from '@entities';
import {
  CreateStudyDto,
  IStudiesRepository,
} from '../domain/repositories/IStudiesRepository';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Study as StudyDto } from '../domain/models/Study';

export class StudiesRepository
  extends TypeOrmRepository<BaseStudy, Study>
  implements IStudiesRepository
{
  constructor(
    @InjectEntityManager()
    em: EntityManager,
  ) {
    super(Study, em);
  }
  async getStudies(): Promise<StudyDto[]> {
    const items = await this.db.find({ withDeleted: true });
    return items.map(({ id, name }) => ({ id, name }));
  }

  async createStudy(data: CreateStudyDto): Promise<string> {
    const study = await this.create(data);
    return study.id;
  }
}
