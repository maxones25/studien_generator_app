import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { FormConfiguration } from '../../../entities/form-configuration.entity';
import { CreateFormConfigurationDto } from './dtos/CreateFormConfigurationDto';

@Injectable()
export class FormConfigurationsService {
  constructor(
    @InjectRepository(FormConfiguration)
    private formConfigurations: Repository<FormConfiguration>,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  async create(
    studyId: string,
    formId: string,
    { groupId, type, isActive }: CreateFormConfigurationDto,
  ) {
    const formConfiguration = new FormConfiguration();

    formConfiguration.studyId = studyId;
    formConfiguration.formId = formId;
    formConfiguration.groupId = groupId;
    formConfiguration.isActive = isActive;
    formConfiguration.type = type;

    await this.formConfigurations.insert(formConfiguration);

    return formConfiguration.id;
  }

  async getAll(studyId: string, formId: string) {
    return this.formConfigurations.find({
      where: {
        formId,
        studyId,
      },
      relations: {
        group: true,
        form: true,
      },
      select: {
        id: true,
        isActive: true,
        type: true,
        group: {
          id: true,
          name: true,
        },
        form: {
          id: true,
          name: true,
        },
      },
    });
  }
}
