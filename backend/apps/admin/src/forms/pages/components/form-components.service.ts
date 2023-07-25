import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { CreateFormComponentDto } from './dtos/CreateFormComponentDto';
import { FormComponent } from '@entities/form-component.entity';
import { CreateFormComponentTransaction } from './transactions/CreateFormComponentTransaction';
import { ComponentsService } from '@admin/components/components.service';

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
    await this.validateFormComponent(data);

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
      relations: {
        formFields: true,
        attributes: true,
      },
      select: {
        id: true,
        type: true,
        formFields: {
          entityFieldId: true,
        },
        attributes: {
          key: true,
          value: true,
        },
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

  private async validateFormComponent({
    type,
    formFields,
    attributes,
  }: CreateFormComponentDto) {
    const entityFieldsIds = formFields.map(
      ({ entityFieldId }) => entityFieldId,
    );

    await this.componentsService.validateFormComponent(
      type,
      entityFieldsIds,
      attributes,
    );
  }

  private async getNextNumber(pageId: string) {
    const pages = await this.formComponentsRepository.find({
      where: { pageId },
    });
    return pages.length + 1;
  }
}
