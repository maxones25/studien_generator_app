import { Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { DeleteResult, EntityManager } from 'typeorm';
import { FormEntity } from '@entities/form-entity.entity';
import { CreateFormEntityDto } from './dtos/CreateFormEntityDto';
import { FormComponent } from '@entities/form-component.entity';
import { FormEntitiesRepository } from './form-entities.repository';

@Injectable()
export class FormEntitiesService {
  constructor(
    @Inject(FormEntitiesRepository)
    private formEntitiesRepository: FormEntitiesRepository,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  async add(formId: string, { entityId, name }: CreateFormEntityDto) {
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

  async remove(formId: string, id: string) {
    const formEntitiy = await this.formEntitiesRepository.findOneOrFail({
      where: { id },
    });

    const entityId = formEntitiy.entityId;

    return this.entityManager.transaction<DeleteResult>(
      async (entityManager) => {
        const formEntitiesRepository = await entityManager.getRepository(
          FormEntity,
        );

        const formComponentsRepository = await entityManager.getRepository(
          FormComponent,
        );

        const result = await formEntitiesRepository.delete(id);

        const formComponents = await formComponentsRepository.find({
          where: {
            page: {
              formId,
            },
            formFields: {
              entityField: {
                entityId,
              },
            },
          },
        });

        await formComponentsRepository.remove(formComponents);

        return result;
      },
    );
  }
}
