import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import {
  CreateFormComponentDto,
  FormFieldDto,
} from './dtos/CreateFormComponentDto';

import { FormComponent } from '../../../../entities/form-component.entity';
import { EntityField } from '../../../../entities/entity-field.entity';
import { ComponentTypesService } from '../../../componentTypes/component-types.service';
import { ComponentType } from '../../../../enums/component-type.enum';
import { FormField } from '../../../../entities/form-field.entity';

@Injectable()
export class FormComponentsService {
  constructor(
    @InjectRepository(FormComponent)
    private formComponentsRepository: Repository<FormComponent>,
    @InjectEntityManager()
    private entityManager: EntityManager,
    @Inject(ComponentTypesService)
    private componentTypesService: ComponentTypesService,
  ) {}

  async create(pageId: string, { type, formFields }: CreateFormComponentDto) {
    if (!(await this.AreForFieldTypesValid(type, formFields)))
      throw new BadRequestException('Component Type invalid');

    const pages = await this.formComponentsRepository.find({
      where: { pageId },
    });

    return this.entityManager.transaction(async (entityManager) => {
      const formComponentsRepo = await entityManager.getRepository(
        FormComponent,
      );

      const formComponent = new FormComponent();

      formComponent.pageId = pageId;
      formComponent.number = pages.length + 1;
      formComponent.type = type;

      await formComponentsRepo.insert(formComponent);

      const formFieldsRepo = await entityManager.getRepository(FormField);

      for (const { entityFieldId } of formFields) {
        const formField = new FormField();

        formField.entityFieldId = entityFieldId;
        formField.formComponentId = formComponent.id;

        await formFieldsRepo.insert(formField);
      }

      return formComponent.id;
    });
  }

  async getAll(pageId: string) {
    return this.formComponentsRepository.find({
      where: { pageId },
      select: {
        id: true,
        type: true,
        formFields: {
          entityFieldId: true,
        },
      },
      relations: {
        formFields: true,
      },
      order: {
        number: 'ASC',
      },
    });
  }

  async delete(id: string) {
    return this.entityManager.transaction(async (entityManager) => {
      const formComponentsRepo = await entityManager.getRepository(
        FormComponent,
      );

      const formComponent = await formComponentsRepo.findOneOrFail({
        where: { id },
      });

      const deleteResult = await formComponentsRepo.delete(id);

      const formComponents = await formComponentsRepo.find({
        where: { pageId: formComponent.pageId },
        order: { number: 'ASC' },
      });

      await formComponentsRepo.save(
        formComponents.map((c, i) => ({ ...c, number: i + 1 })),
      );

      return deleteResult;
    });
  }

  private async AreForFieldTypesValid(
    type: ComponentType,
    formFields: FormFieldDto[],
  ) {
    const entityFieldsRepo = await this.entityManager.getRepository(
      EntityField,
    );

    const entityFields = await entityFieldsRepo.find({
      where: formFields.map(({ entityFieldId }) => ({ id: entityFieldId })),
    });

    for (const entityField of entityFields) {
      if (
        !this.componentTypesService.isValidForEntityType(entityField.type, type)
      ) {
        return false;
      }
    }

    return true;
  }
}
