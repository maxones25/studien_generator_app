import { Inject, Injectable } from '@nestjs/common';
import { EntitiesRepository } from './entities.repository';
import { FormsRepository } from '@admin/forms/forms.repository';
import { CreateEntityDto } from './dtos/CreateEntityDto';
import { UpdateEntityDto } from './dtos/UpdateEntityDto';
import { StudyRelatedDataAccessor } from '@shared/modules/records/StudyRelatedDataAccessor';

@Injectable()
export class EntitiesService implements StudyRelatedDataAccessor {
  constructor(
    @Inject(EntitiesRepository)
    private entitiesRepository: EntitiesRepository,
    @Inject(FormsRepository)
    private formsRepository: FormsRepository,
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
    return await this.entitiesRepository.delete(entityId);
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
      const entity = formEntities[0];
      return {
        ...form,
        entity,
      };
    });
  }
}
