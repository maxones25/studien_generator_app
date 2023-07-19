import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import {
  CreateFormComponentDto,
  FormFieldDto,
} from './dtos/CreateFormComponentDto';
import { FormComponent } from '../../../../entities/form-component.entity';
import { ComponentsService } from '../../../components/components.service';
import { ComponentType } from '../../../../enums/component-type.enum';
import { CreateFormComponentTransaction } from './transactions/CreateFormComponentTransaction';

@Injectable()
export class FormComponentsService {
  constructor(
    @InjectRepository(FormComponent)
    private formComponentsRepository: Repository<FormComponent>,
    @InjectEntityManager()
    private entityManager: EntityManager,
    @Inject(ComponentsService)
    private componentsService: ComponentsService,
  ) {}

  async create(pageId: string, data: CreateFormComponentDto) {
    const { formFields, type } = data;

    if (!(await this.AreForFieldTypesValid(type, formFields)))
      throw new BadRequestException(
        `component type ${type} invalid for entity fields`,
      );

    const number = await this.getNextNumber(pageId);

    return new CreateFormComponentTransaction(this.entityManager).run({
      pageId,
      number,
      data,
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
    const entityFieldsIds = formFields.map(
      ({ entityFieldId }) => entityFieldId,
    );

    return await this.componentsService.areEntityFieldsValid(type, entityFieldsIds)
  }

  private async getNextNumber(pageId: string) {
    const pages = await this.formComponentsRepository.find({
      where: { pageId },
    });
    return pages.length + 1;
  }
}
