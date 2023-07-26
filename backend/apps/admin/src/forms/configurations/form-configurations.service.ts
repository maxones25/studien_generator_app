import { Inject, Injectable } from '@nestjs/common';
import { FormConfiguration } from '@entities/form-configuration.entity';
import { CreateFormConfigurationDto } from './dtos/CreateFormConfigurationDto';
import { FormConfigurationsRepository } from './form-configurations.repository';

@Injectable()
export class FormConfigurationsService {
  constructor(
    @Inject(FormConfigurationsRepository)
    private formConfigurations: FormConfigurationsRepository,
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

  async getAll(formId: string) {
    return this.formConfigurations.getByForm(formId);
  }
}
