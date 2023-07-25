import { Inject, Injectable } from '@nestjs/common';
import { Entity } from '@entities/entity.entity';
import { CreateEntityDto } from './dtos/CreateEntityDto';
import { UpdateEntityDto } from './dtos/UpdateEntityDto';
import { EntitiesRepository } from './entities.repository';

@Injectable()
export class EntitiesService {
  constructor(
    @Inject(EntitiesRepository)
    private entitiesRepository: EntitiesRepository,
  ) {}

  async create(studyId: string, { name }: CreateEntityDto) {
    const entity = new Entity();
    entity.name = name;
    entity.studyId = studyId;

    await this.entitiesRepository.insert(entity);

    return entity.id;
  }

  async update(entityId: string, { name }: UpdateEntityDto) {
    const { affected } = await this.entitiesRepository.update(entityId, {
      name,
    });
    return affected;
  }

  async delete(entityId: string) {
    const { affected } = await this.entitiesRepository.delete(entityId);
    return affected;
  }

  getAll(studyId: string) {
    return this.entitiesRepository.getAll(studyId);
  }

  async getById(entityId: string) {
    return this.entitiesRepository.getById(entityId);
  }
}
