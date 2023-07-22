import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entity } from '../../entities/entity.entity';
import { Repository } from 'typeorm';
import { CreateEntityDto } from './dtos/CreateEntityDto';
import { UpdateEntityDto } from './dtos/UpdateEntityDto';

@Injectable()
export class EntitiesService {
  constructor(
    @InjectRepository(Entity)
    private entitiesRepository: Repository<Entity>,
  ) {}

  async create(studyId: string, { name }: CreateEntityDto) {
    const entity = new Entity();
    entity.name = name;
    entity.studyId = studyId;

    await this.entitiesRepository.insert(entity);

    return entity.id;
  }

  async update(entityId: string, { name }: UpdateEntityDto) {
    return this.entitiesRepository.update(entityId, { name });
  }

  async delete(entityId: string) {
    return this.entitiesRepository.delete(entityId);
  }

  getAll(studyId: string) {
    return this.entitiesRepository.find({
      where: {
        studyId,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async getById(entityId: string) {
    return this.entitiesRepository.findOne({
      where: {
        id: entityId,
      },
      relations: {
        fields: true,
      },
      select: {
        id: true,
        name: true,
        fields: {
          id: true,
          name: true,
          type: true,
        },
      },
    });
  }
}
