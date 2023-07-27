import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, EntityManager, Repository } from 'typeorm';
import { FormEntity } from '@entities/form-entity.entity';
import { CreateFormEntityDto } from './dtos/CreateFormEntityDto';
import { FormComponent } from '@entities/form-component.entity';

@Injectable()
export class FormEntitiesService {
  constructor(
    @InjectRepository(FormEntity)
    private formEntitiesRepository: Repository<FormEntity>,
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

  async getAll(formId: string) {
    const items = await this.formEntitiesRepository.find({
      where: {
        formId,
      },
      relations: {
        entity: {
          fields: true,
        },
      },
      select: {
        entity: {
          id: true,
          name: true,
          fields: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
    });

    return items.map(({ entity }) => entity);
  }
}
