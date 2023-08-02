import { Inject, Injectable } from '@nestjs/common';
import { Entity } from '@entities/entity.entity';
import { CreateEntityDto } from './dtos/CreateEntityDto';
import { UpdateEntityDto } from './dtos/UpdateEntityDto';
import { EntitiesRepository } from './entities.repository';
import { FormsRepository } from '@admin/forms/forms.repository';

@Injectable()
export class EntitiesService {
  constructor(
    @Inject(EntitiesRepository)
    private entitiesRepository: EntitiesRepository,
    @Inject(FormsRepository)
    private formsRepository: FormsRepository,
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

  async getForms(entityId: string) {
    const forms = await this.formsRepository.find({
      where: { formEntities: { entityId } },
      relations: {
        formEntities: true,
      },
      select: { id: true, name: true, formEntities: { id: true, name: true } },
    });

    return forms.map(({ formEntities, ...form }) => {
      const entity = formEntities[0]
      return {
        ...form,
        entity,
      };
    });
  }
}
