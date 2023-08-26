import { Inject, Injectable } from '@nestjs/common';
import { EntitiesRepository } from '../repositories/entities.repository';
import { StudyRelatedDataAccessor } from '@shared/modules/records/StudyRelatedDataAccessor';

@Injectable()
export class EntitiesService implements StudyRelatedDataAccessor {
  constructor(
    @Inject(EntitiesRepository)
    private entitiesRepository: EntitiesRepository,
  ) {}

  getById(entityId: string) {
    return this.entitiesRepository.getById(entityId);
  }

  getRelatedByStudy(studyId: string, id: string): Promise<any> {
    return this.entitiesRepository.getRelatedByStudy(studyId, id);
  }

  async add(formId: string, entityId: string, name: string) {
    const entity = await this.entitiesRepository.create({
      entityId,
      formId,
      name,
    });
    return entity.id;
  }

  async getByForm(formId: string) {
    return this.entitiesRepository.getByForm(formId);
  }

  getByFormAndName(formId: string, name: string) {
    return this.entitiesRepository.getByFormAndName(formId, name);
  }

  async changeName(id: string, name: string) {
    return this.entitiesRepository.update(id, { name });
  }

  async remove(id: string) {
    return this.entitiesRepository.delete(id);
  }
}
