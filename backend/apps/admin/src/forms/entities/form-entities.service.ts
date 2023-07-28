import { Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { DeleteResult, EntityManager } from 'typeorm';
import { FormEntity } from '@entities/form-entity.entity';
import { CreateFormEntityDto } from './dtos/CreateFormEntityDto';
import { FormComponent } from '@entities/form-component.entity';
import { FormEntitiesRepository } from './form-entities.repository';
import { UpdateFormEntityDto } from './dtos/UpdateFormEntityDto';

@Injectable()
export class FormEntitiesService {
  constructor(
    @Inject(FormEntitiesRepository)
    private formEntitiesRepository: FormEntitiesRepository,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  async create(formId: string, { entityId, name }: CreateFormEntityDto) {
    const formEntity = new FormEntity();

    formEntity.entityId = entityId;
    formEntity.formId = formId;
    formEntity.name = name;

    await this.formEntitiesRepository.insert(formEntity);

    return formEntity.id;
  }

  async getAll(formId: string) {
    return this.formEntitiesRepository.getAll(formId);
  }

  async update(id: string, { name }: UpdateFormEntityDto) {
    const { affected } = await this.formEntitiesRepository.update(id, { name });
    return affected;
  }

  async remove(id: string) {
    const { affected } = await this.formEntitiesRepository.delete(id);
    return affected;
  }
}
