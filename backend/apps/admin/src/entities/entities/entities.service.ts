import { Inject, Injectable } from '@nestjs/common';
import { EntitiesRepository } from './entities.repository';
import { CreateEntityDto } from './dtos/CreateEntityDto';
import { StudyRelatedDataAccessor } from '@shared/modules/records/StudyRelatedDataAccessor';

@Injectable()
export class EntitiesService implements StudyRelatedDataAccessor {
  constructor(
    @Inject(EntitiesRepository)
    private entitiesRepository: EntitiesRepository,
  ) {}

  getRelatedByStudy(studyId: string, id: string) {
    return this.entitiesRepository.getRelatedByStudy(studyId, id);
  }

  async create(studyId: string, { name }: CreateEntityDto) {
    const entity = await this.entitiesRepository.create({ name, studyId });
    return entity.id;
  }

  async setName(entityId: string, name: string) {
    return await this.entitiesRepository.update(entityId, {
      name,
    });
  }

  async delete(entityId: string) {
    return await this.entitiesRepository.hardDelete(entityId);
  }

  async getAll(studyId: string) {
    return this.entitiesRepository.getAll(studyId);
  }

  async getById(entityId: string) {
    return this.entitiesRepository.getById(entityId);
  }
}
